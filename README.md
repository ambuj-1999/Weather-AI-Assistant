# 🌤️ AI-Powered Weather Assistant

A modern, responsive, and beautiful weather application that not only shows real-time weather data but also leverages **Google Gemini AI** (`gemini-3.6-flash`) to provide personalized clothing and travel recommendations tailored to the current weather condition of any city.

---

## ✨ Features

- **Real-Time Weather Data:** Fetches current temperature, condition, local date, local time, and weather icons for any city worldwide using the WeatherAPI.
- **AI Weather Assistant:** Integrates Gemini AI to analyze current weather conditions and provide:
  - 👕 **Clothing Advice:** Weather-smart recommendations on what to wear.
  - 🚗 **Travel Advice:** Practical suggestions for travel and outdoor activities.
- **Premium Aesthetics:** Features a sleek dark-mode glassmorphic interface with vibrant gradients, custom typography (Roboto), and smooth micro-interactions.
- **Responsive Layout:** Optimized for all screen sizes, from mobile devices to desktop monitors.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5 (Semantic Structure), Custom CSS3 (Layouts, Gradients, Glassmorphism), and Vanilla JavaScript (DOM Manipulation, Fetch API).
- **Backend:** Node.js & Express.js.
- **AI Integration:** Google Gen AI SDK (`@google/genai` utilizing the `gemini-3.6-flash` model).
- **API Provider:** [WeatherAPI](https://www.weatherapi.com/) for real-time meteorological data.

---

## 📂 Project Structure

```text
weather-app/
├── public/
│   ├── index.html     # Main user interface structure
│   ├── styles.css     # Premium styling, animations, and responsiveness
│   └── script.js      # Frontend API integration & dynamic DOM updates
├── server.js          # Express.js backend & API routing
├── package.json       # Dependencies & Node metadata
└── .env               # Environment configuration (API keys)
```

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- An API Key from [WeatherAPI](https://www.weatherapi.com/)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

---

## 🚀 Installation & Setup

1. **Clone the Repository & Navigate to Project Directory:**
   ```bash
   cd weather-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   PORT=3000
   WEATHER_API_KEY=your_weatherapi_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the Application:**
   Run the backend Express server:
   ```bash
   node server.js
   ```

5. **Access the App:**
   Open your browser and navigate to `http://localhost:3000`.

---

## 🔌 API Endpoints

The Express server (`server.js`) exposes the following backend routes:

### 1. Fetch Weather
* **Route:** `GET /weather/:city`
* **Description:** Retrieves real-time weather details for the requested city.
* **Response:** JSON payload from WeatherAPI.

### 2. Request AI Advice
* **Route:** `POST /ask-ai`
* **Description:** Sends current weather details to Gemini to generate clothing and travel advice.
* **Payload:** `{ "weather": "Current weather description..." }`
* **Response:**
  ```json
  {
    "clothing": "Clothing recommendations...",
    "travel": "Travel recommendations..."
  }
  ```

---

## 📝 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it.
