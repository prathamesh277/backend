const express=require('express');
const path=require('path');
const app=express();
const hbs=require('hbs')
require('./db/conn');
const Register= require('./models/registers')
const port = process.env.PORT || 3000;

const static_path=path.join(__dirname,'../public')
const template_path=path.join(__dirname,'../templates/views')
const partials_path=path.join(__dirname,'../templates/partials')
app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partials_path)

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render("login")
})

app.get('/register',(req,res)=>{
    res.render("register")

})
app.get('/flogin',(req,res)=>{
    res.render("flogin")

})
app.post('/flogin',async(req,res)=>{
    try {
        const email =req.body.email;
        const name =req.body.name;
        const password =req.body.password;
        const useremail= await Register.findOne({email:email});
        if(useremail.password===password){
            res.status(201).render('index');
        }
        else
        {
            res.send("Incorrect password")
        }
    } catch (error) {
        res.status(400).send("OOPS!! invalid Email")
    }
})

app.post('/login',async(req,res)=>{
    try {
        const email =req.body.email;
        const name =req.body.name;
        const password =req.body.password;
        const useremail= await Register.findOne({email:email});
        if(useremail.password===password){
            res.status(201).render('index');
        }
        else
        {
            res.send("Incorrect password")
        }
    } catch (error) {
        res.status(400).send("OOPS!! invalid Email")
    }
})

app.post('/register',async(req,res)=>{
    
    try {
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;

        if(password===cpassword){
            const userids= new Register({
                email:req.body.email,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
                name:req.body.name,
                gender:req.body.gender,
                id:req.body.id,
                phone:req.body.phone
            })
            const registerd= await userids.save();
            res.status(201).render('login');
        }else{
            res.send("password Are not matching")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})
app.listen(port,()=>{
    console.log('serve started')
})