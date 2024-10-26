require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const recipeRoutes = require('./routes/recipes')
const authRoutes = require('./routes/auth')


//express app
const app = express()

//middleware
app.use(express.json())

// routers
app.use('/api/recipes',recipeRoutes)
app.use('/api', authRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listen for req
    app.listen(process.env.PORT,()=>{
    console.log('connected to db & listening on port',process.env.PORT)
})
})
.catch((error)=>{
    console.log(error)
})



