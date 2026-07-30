const temparaturField = document.querySelector(".temp");
const cityField = document.querySelector(".city");
const timeField = document.querySelector(".localtime");
const conditionField = document.querySelector(".condition");
const conditionIcon = document.querySelector(".weather-icon");
const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm");
const localDate = document.querySelector(".localdate");
const localTime = document.querySelector(".localtime");
const assistantButton = document.querySelector("#assistantButton");
const assistantOutput = document.querySelector("#assistantOutput");

async function fetchWeatherData(city) {
  try {
    // const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
    const response = await fetch(`/weather/${city}`);
    // console.log(response)
    const data = await response.json();
    console.log("Fetched data ", data);
    updateDom(data);
  } catch (error) {
    console.log(error.message);
    alert("error fetching data");
  }
}
fetchWeatherData("Mumbai");
function updateDom(data) {
  const { current, location } = data;
  const [date, time] = location.localtime.split(" ");
  temparaturField.textContent = current.temp_c;
  cityField.textContent = location.name;
  conditionField.textContent = current.condition.text;
  conditionIcon.src = current.condition.icon;
  localDate.textContent = date;
  localTime.textContent = time;
}

async function getAdvice(weather) {
  if (assistantOutput) {
    assistantOutput.innerHTML = `Thinking of a polished suggestion...
    <div id="clothing"></div>
    <div id="travel"></div>`;
  }

  try {
    const response = await fetch("/ask-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weather,
      }),
    });

    const data = await response.json();
    const result =
      data?.steps?.[1]?.content?.[0]?.text ||
      "I could not generate a tip right now.";
    const advice = JSON.parse(result);
    // if (assistantOutput) {
    //   assistantOutput.innerHTML = `<h2>Have a safe and happy journey....</h2>`;
    // }
    const clothing = document.querySelector("#clothing");
    const travel = document.querySelector("#travel");
    if (clothing && travel) {
      clothing.innerHTML = `
        <h3>👕 Clothing Advice</h3>
        <p>${advice.clothing}</p>`;
      travel.innerHTML = `
        <h3>🚗 Travel Advice</h3>
        <p>${advice.travel}</p>`;
    }
    console.log(advice);
    console.log(typeof advice);
    console.log(advice.clothing);
  } catch (error) {
    console.log(error.message);
    if (assistantOutput) {
      assistantOutput.textContent =
        "The assistant is unavailable right now. Please try again.";
    }
  }
}

if (assistantButton) {
  assistantButton.addEventListener("click", function () {
    const weatherSummary = `
Temperature: ${temparaturField?.textContent ?? "unknown"}°C
Condition: ${conditionField?.textContent ?? "unknown"}
City: ${cityField?.textContent ?? "unknown"}
`;
    getAdvice(weatherSummary);
  });
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = searchInput.value.trim();
  if (city == "") {
    alert("Please provide input.");
    return;
  }
  fetchWeatherData(city);
  searchInput.value = "";
});
