const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');

const app = express();
 
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://vedikabhusari23:23ved%2312ka%40%2A4@zomato.ur9q0.mongodb.net/Zomato?retryWrites=true&w=majority&appName=Zomato')

const StudentSchema = new mongoose.Schema({
    name:String,
    marks:Number
})

const Student = mongoose.model('Student',StudentSchema);

app.get('/',(req,res) => {
    res.send('Welcome to api connection');
})

app.get('/students',async(req,res) =>{
    const students = await Student.find();
    res.send(students);
})

app.get('/students/:name',async(req,res) =>{
    const {name} = req.params;
    const students = await Student.find({name});
    res.send(students);
})

app.post('/students',async(req,res) =>{
    const { name, marks} = req.body;
    const student = new Student({name, marks});
    await student.save();
    res.send(student);
})

app.delete('/delete',async(req,res) =>{
    const {name} = req.params;
    const Student = await new Student.findOneAndDelete({ name });
})

app.delete('/delete-students',async(req,res) =>{
    const {name} = req.params;
    const Student = await new Student.DeleteMany({ marks:{$ls:marks} });
})

app.listen(3000,() =>{
    console.log(`Server is running on http://localhost:3000`)
})