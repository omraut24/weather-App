const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// app.get("/", (req, res) => {
//     res.render("index");
// })

app.post("/", async(req, res) => {
    let location = await req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
    const response = await fetch(url);
    const weatherData = await response.json();
    const temp = Math.floor(weatherData.main.temp);
    const disc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    res.write(`<h1>The current weather in ${location} is ${disc} </h1>`);
    res.write(`<h1>The current temperature is ${temp} degree celcius </h1>`);
    res.write(`<img src='${imageUrl}'>`)
})


app.listen(3000, () => {
    console.log("server is running.. ");
})