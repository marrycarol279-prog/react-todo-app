import express from 'express'
import cors from 'cors' 
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import util from 'util'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

app.listen(process.env.PORT || 5000, () => console.log("hello"))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected"))
.catch((e) => console.log(util.inspect(e, { depth: null })))

const todoSchema = new mongoose.Schema({
    task : String ,
    status : Boolean,
    userId : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const userSchema = new mongoose.Schema({ 
    username : { type: String, required: true, unique: true, trim: true, lowercase: true }, 
    password : { type: String, required: true }, 
    email : { type: String, required: true, unique: true, trim: true, lowercase: true }, 
})

const Todo = mongoose.model("Todo",todoSchema)  

const User = mongoose.model("User",userSchema)

app.get("/",function (req,res){
    res.send("HELLO")
})

app.post("/signup",async (req,res) => { 
    try{
        const username = req.body.username?.trim();
        const password = req.body.password;
        const email = req.body.email?.trim();

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Please fill in all fields.' })
        }

        const normalizedUsername = username.toLowerCase();
        const normalizedEmail = email.toLowerCase();

        const existingUser = await User.findOne({
            $or: [
                { username: normalizedUsername },
                { email: normalizedEmail }
            ]
        })

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' })
        }

        const hashedPassword = await bcrypt.hash(password,10); 
        await User.create({
            username: normalizedUsername,
            password: hashedPassword,
            email: normalizedEmail,
        })

        res.status(201).json({ message: 'Signup successful. Please log in.' })
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error' })
    }
})

app.post("/login",async (req,res) => {
    try{
        const username = req.body.username?.trim();
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please enter username and password.' })
        }

        const normalizedUsername = username.toLowerCase();
        const user = await User.findOne({ username: normalizedUsername })

        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Wrong password.' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '24h' })
        res.json({ Token: token, message: 'Login successful.' })
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error' })
    }
})

app.use("/todos",(req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ msg: "Authorization token required" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        req.userId = decoded.id
        next()        
    } catch (error) {
        res.status(401).send(error)
    }

})

app.post("/todos",(req,res) => {
    let data = req.body.task
    const todo = new Todo({ task: data, userId: req.userId })
    todo.save()
    .then((e) => res.send(e))
    .catch((e) => res.status(500).send(e))
})

app.get("/todos",(req,res) => {
    Todo.find({ userId: req.userId })
    .then((data) => res.send(data))
    .catch((e) => res.status(500).send(e))
}) 

app.put("/todos/:id",(req,res) => {
    const key = req.params.id
    const updates = {}
    if (req.body.task !== undefined) updates.task = req.body.task
    if (req.body.status !== undefined) updates.status = req.body.status
    Todo.findOneAndUpdate({ _id: key, userId: req.userId },{$set : updates},{ new: true })
    .then((e) => res.send(e))
    .catch((e) => {console.log(e);res.status(500).send(e)})
})

app.delete("/todos/:id",(req,res) => {
    const key = req.params.id 
    Todo.findOneAndDelete({ _id: key, userId: req.userId })
    .then((e) => res.send({msg:"Task Deleted",task : e}))
    .catch((e) =>{console.log(e); res.status(500).send(e)})
})

export default app;