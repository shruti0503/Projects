import express from 'express'
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import cookieParser from 'cookie-parser'
import cors from  'cors'

const app=express()
app.use(cors());
app.use(express.json())
app.use(cookieParser)

app.use("/api/posts",postRoutes)
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)


app.listen(8000,()=>{
    console.log("connected")
})