const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const exp = require("constants");
const upload = multer();
const app = express();
const axios = require("axios")
const cors = require("cors")
const mongoose = require("mongoose")
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const userValidation = require("./routes/userValidation");
const general = require("./routes/general")
const jsonData = require("./json/data.json")
const blogs = require("./routes/blogs")
const comments = require("./routes/comments")

main().catch(e => console.log(e)).then(() => console.log("Database connected !!!"));
async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/refreshT');
}

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended :true}))
app.use(cookieParser());

app.use("/api" ,auth );
app.use("/api" ,userValidation);
app.use("/api" , general)
app.use("/api" , comments)
app.use("/api" , blogs)
app.post("/test" , upload.single('image') ,async(req ,res , next) => {
    try{
      console.log("hott")
        const {data} = await axios.post('http://127.0.0.1:5000/uploadTest' , {
            image : req.file
        } ,  {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        const responseObject = jsonData[data];
        const disease = data;
        res.send({diseaseInfo : {...responseObject , disease : data }})
    }
    catch(e){
        next(e);
    }
})
app.get("/osm" , async(req  , res , next) => {
  try {
    const searchParams = {
      location: { lat: 37.7749, lng: -122.4194 }, // Example location (San Francisco)
      radius: 3000, // Example radius in meters (3km)
    };
    const response = await axios.post(apiUrl, {
      data: `[out:json];
        node(around:${searchParams.radius},${searchParams.location.lat},${searchParams.location.lng})["amenity"="doctors"]["speciality"="dermatology"];
        out;`,
    });

    // Handle the response data as needed
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error finding nearby dermatologists:', error.message);
    next(error);
  }
  
})


app.use((err ,req , res , next) => {
  console.log(err);
  res.send({error : err.message})
})




app.listen(8000, () => {
  console.log("Listening !!");
});
