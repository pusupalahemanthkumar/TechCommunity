// Importing Required Files And Packages Here.
const express = require("express");
const path= require("path");

const connectDB = require("./config/db");

// Defining Port Number Here.
const PORT = process.env.PORT || 5000;

// Connecting To DataBase Here.
connectDB();

// Initializing The Express App Here.
const app = express();

// Init Middleware.
app.use(express.json({ extended: true }));

// Express Middlewares.
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts",require("./routes/api/post"));
app.use("/api/profile",require("./routes/api/profile"));

// Server static assets in production
if(process.env.NODE_ENV === "production"){
  // set static folder
  app.use(express.static(path.join(__dirname,"client","build")));

  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));

  })

}


// Setting Listen Handler Here.
app.listen(PORT, () => {
  console.log(`Server Started On Port ${PORT}.`);
});
