const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config();

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

const User = mongoose.model('User',{
    first_name: String,
    last_name: String,
    email: String,
    avatar: String,
})

app.get('/',(req,res)=>{
    res.json({
        status: 'SUCCESS',
        message: 'Good to go',
    })
})

app.get('/users',async (req,res)=>{
    try{
        const users = await User.find({})
        res.json({
            status: 'SUCCESS',
            data: users
        })
    }
    catch (error){
        res.json({
            status:'FAILED',
            message: 'Something went wrong'
        })
    }
})

app.post('/users',async (req,res)=>{
    try{
        const { first_name, last_name, email, avatar } = req.body
        await User.create({ first_name, last_name, email, avatar })
        res.json({
            status: 'SUCCESS',
            message: 'User created'
        })
    }
    catch (error){
        res.json({
            status:'FAILED',
            message: 'Something went wrong'
        })
    }
})

app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log(`server is running on http://localhost:${process.env.PORT}`))
    .catch((error)=>console.log('error'))
})
