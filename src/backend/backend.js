import OpenAI from "openai";
import {apiWeather, openai} from "../api_key/apikey"


function formatAMPM(date){
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export async function fetchChatGPT(zipCode, temperature, condition) {
    try{
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": `The time is ${formatAMPM(new Date())} in the city ${zipCode}. Given that it is ${temperature} degrees Fahrenheit and ${condition}, give me 5 activities that I can do near me given the current time, weather, and location. Please list the weather, time in 12 hour format and the zipcode in the first sentence, not in the list of activities.`}],

        });
        console.log(chatCompletion.choices[0].message.content);
        return chatCompletion.choices[0].message.content

    } catch (error) {
        if (error instanceof OpenAI.APIError) {
          console.error(error.status);
          console.error(error.message);
          console.error(error.code);
          console.error(error.type);
        } else {
          // Non-API error
          console.log(error);
        }
    }
}

export async function fetchWeatherData(zipCode, countrycode) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countrycode}&units=imperial&appid=${apiWeather.key}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        const result = await fetchChatGPT(zipCode, data.main.temp, data.weather[0].description)
        return result

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error.message);
    }
}