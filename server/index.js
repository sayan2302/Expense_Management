import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import allRoutes from './routes.js'

const app = express()
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());
const mongoURI = "mongodb+srv://sayanpramanick:afYxTzznf9zpcShx@expensemanagementcluste.08es3.mongodb.net/"
mongoose.connect(mongoURI)
    .then(() => console.log("Connected to mongoDB!"))
    .catch(err => console.error("Connection failed mongoDB:", err))
app.use("/", allRoutes)


//listening to PORT 
app.listen(port, () => { console.log(`server running on http://localhost:${port}`) })