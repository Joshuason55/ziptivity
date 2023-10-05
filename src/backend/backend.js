import OpenAI from "openai";
var currentDate = new Date()
var currentTime = currentDate.getHours() + ":" + currentDate.getMinutes()


const apiWeather ={
    key: '9edb0ff4557f604c2feb4ba21ac1b771',
    base: "https://api.openweathermap.org/data/2.5/"
};

const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

export async function fetchChatGPT(zipCode, temperature, condition) {
    try{
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": `The time is ${currentTime} in the city ${zipCode}. Given that it is ${temperature} degrees Fahrenheit and ${condition}, give me 5 activities that I can do near me given the current time, weather, and location.`}],
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