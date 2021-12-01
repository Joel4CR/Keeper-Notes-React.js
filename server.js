const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")

const app=express()


mongoose.connect('mongodb://localhost:27017/notesDB', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.json())
app.use(cors())

const noteSchema= mongoose.Schema(
    {
        title:String,
        content:String
    }
)

const Note=mongoose.model("Note",noteSchema)


app.get("/",(req,res)=>res.status(200).send("Hello Joe"))
app.get("/notes",(req,res)=>{
  
        Note.find((err, data) => {
            if(err) {
            res.status(500).send(err)
            } else {
            res.status(200).send(data)
            }
            })
            })
app.post("/notes",(req,res)=>{
    
     const note=  Note.create({
      title: req.body.title,
      content:req.body.content  
    },(err,data)=>{
        if (err) {
        res.status(500).send(err)
    } 
    else{
        res.status(200).send(data)
        }
})})
app.delete("/notes",(req,res)=>{
    Note.deleteOne({title:req.body.title},(err,data)=>{
        if(err)
        res.status(500).send(err)
        else
        res.status(200).send(data)
    })
})

app.listen(8001,()=>console.log("Server started on port 8001"))