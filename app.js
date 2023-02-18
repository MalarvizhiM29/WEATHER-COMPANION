const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/",(req,res)=>{
    console.log(req.body.cityname);
    const keyid = "523e1a43c4f5ffd6b165cbab9b88d0ec";
    const query = req.body.cityname;
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + keyid + "&q=" + query + "&units=" + units;

    https.get(url,(response)=>{
        console.log(response.statusCode);

        response.on("data",(data)=>{
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description;
            
            res.write("<p>The weather Description: " + weatherdescription + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius.<h1>");
            res.send();
        })
    });

})


app.listen(3000,()=>{
    console.log("Server running!..");
})

// const icon = weatherdata.weather[0].icon;
// const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
 // res.write("<img src=" + imageurl + ">" + "</img>");