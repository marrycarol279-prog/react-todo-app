import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()

app.listen(5000,() => console.log("hello"))

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected"))
.catch((e)=> console.log(e))

const todoSchema = new mongoose.Schema({
    task : String ,
    status : Boolean
})

const Todo = mongoose.model("Todo",todoSchema)  



app.get("/",function (req,res){
    res.send("HELLO")
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
    .catch((e) => res.status(500).send(e))
})

// app.delete("/todos")

