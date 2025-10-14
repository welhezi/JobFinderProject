const express = require('express')
  const app = express() 
  const port = 5000 
  const mongoose = require("mongoose")
  require("dotenv").config()
  const mongo_url = process.env.MONGO_URL
  const cors = require("cors")
  
  // route express
  app.get('/', function(req, res)  { res.send('Hello World!') }) ;


  mongoose.connect(mongo_url,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connection succeeded"))
  .catch(console.error("connection error "))

  app.use(express.json())
  const userRouter = require("./Routes/userRoute")
  const employeeRouter = require("./Routes/EmployeeRoute")
  const jobPostRoutes = require("./Routes/JobPostRoute");

  // Activer CORS
  //app.use(cors());
  app.use(cors({origin: 'http://localhost:3000'}));
  app.use("/user",userRouter)
  app.use("/employee",employeeRouter)
  app.use("/jobpost", jobPostRoutes);

  app.listen(port, function() {
  console.log(`The server is running,’+’please open at http://localhost:${port}`)
 }) 
