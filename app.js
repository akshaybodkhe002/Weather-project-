const { response } = require("express");
const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=f943984d70b830a37d5a24e4482567d3&q=" + query+ "&units=metric"

    http.get(url, function (response) {
        console.log(response.statusCode);


        response.on("data", function (data) {
            const weatherData = JSON.parse(data);

            const weatherDes = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


            // res.send(weatherDes);
            res.write("<p>Weather description is " + weatherDes + "</p>");
            res.write("<h1>Temprature at "+query+" is " + temp + " degree celcius.</h1>");
            res.write("<img src=" + imageurl + ">");
            res.send();
        })
    })
})





app.listen(3000, function () {
    console.log("Server is runnning on port 3000");
})