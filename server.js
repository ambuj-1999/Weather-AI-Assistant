import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/weather/:city", async (req, res) => {
    try {
        const city = req.params.city;

        const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=yes`;

        const response = await fetch(url);

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Unable to fetch weather"
            });
        }

        const data = await response.json();

        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Server Error"
        });
    }
});


app.post("/ask-ai", async (req, res) => {

    const { weather } = req.body;

    try {

        const data = await ai.interactions.create({
            model: "gemini-3.6-flash",
            input: `Give clothing and travel advice for this weather. Return the output in JSON format with a clothing key and a travel key, and keep the response concise and clear in both keys. Weather details:
            ${weather}
            `
        });

        res.json(data);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "AI Error"
        });

    }

});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});