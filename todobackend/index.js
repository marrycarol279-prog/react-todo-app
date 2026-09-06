import express from 'express'
import cors from 'cors' 
import mongoose from 'mongoose'
import 'dotenv/config'
import util from 'util'
import bcrypt from 'bcrypt'

const app = express()

app.listen(5000,() => console.log("hello"))

app.use(express.json())

app.use(cors())   

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected"))
.catch((e) => console.log(util.inspect(e, { depth: null })))

const todoSchema = new mongoose.Schema({
    task : String ,
    status : Boolean
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
    }
})

app.post("/login",async (req,res) => {
    try{
        const user = await User.findOne({"username" : req.body.username});
        if(user != null && user != undefined){
            if(await bcrypt.compare(req.body.password,user.password)){
                res.send('data matched')
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
    }
})

app.post("/todos",(req,res) => {
    let data = req.body.task
    const todo = new Todo({ task: data })
    todo.save()
    .then((e) => res.send(e))
    .catch((e) => res.status(500).send(e))
})

app.get("/todos",(req,res) => {
    Todo.find()
    .then((data) => res.send(data))
    .catch((e) => res.status(500).send(e))
}) 

app.put("/todos/:id",(req,res) => {
    const key = req.params.id
    const data = req.body
    Todo.findByIdAndUpdate(key,{$set : data})
    .then((e) => res.send(e))
    .catch((e) => {console.log(e);res.status(500).send(e)})
})

app.delete("/todos/:id",(req,res) => {
    const key = req.params.id 
    Todo.findByIdAndDelete(key)
    .then((e) => res.send({msg:"Task Deleted",task : e}))
    .catch((e) =>{console.log(e); res.status(500).send(e)})
})


