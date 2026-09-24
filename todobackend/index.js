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
    username : String, 
    password : String, 
})

const Todo = mongoose.model("Todo",todoSchema)  

const User = mongoose.model("User",userSchema)

app.get("/",function (req,res){
    res.send("HELLO")
})

app.post("/signup",async (req,res) => { 
    try{
        let username = req.body.username; 
        let password = req.body.password;
        const hashedPassword = await bcrypt.hash(password,10); 
        await User.create({
            'username' : username,
            'password' : hashedPassword,
        })
        res.send('success')
    } catch(error){
        console.log(error);
        res.status(500).send("Server error")
    }
})

app.post("/login",async (req,res) => {
    try{
        const user = await User.findOne({"username" : req.body.username});
        if(user != null && user != undefined){
            if(await bcrypt.compare(req.body.password,user.password)){
                const token = jwt.sign({id : user._id}, process.env.JWT_KEY, {expiresIn:"24h"})
                res.send({Token : token ,msg : "data matched !!"})
            }       
            else{
                res.send('Wrong Password !!')
            }
        }
        else{
            res.send('data not found')
        }
    } catch(error){
        console.log(error);
        res.status(500).send("Server error")
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