import React, { useState } from "react";
import './HomePage.css';
import Logo from '../pictures/Ziptivity.png'
import { CheckCircle } from '@mui/icons-material'
import {IconButton, TextField } from "@mui/material";
// import OpenAI from "openai";

function HomePage(props) {
    const[input,setInput]=useState(props.input)

    const apiWeather ={
        key: '9edb0ff4557f604c2feb4ba21ac1b771',
        base: "https://api.openweathermap.org/data/2.5/"
    }    
    // const openai = new OpenAI({
    //     apiKey: "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"
    // });

    async function fetchWeatherDataAndChatGPT(zipCode, countrycode) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countrycode}&units=imperial&appid=${apiWeather.key}`);
            
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            console.log(data);
            
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error.message);
        }

        // chatGPT
        // try {
        //     const response = await openai.chat.completions.create({
        //         model: "gpt-3.5-turbo",
        //         messages: [{"role": "user", "content": "Hello!"}],
        //       });;
        //     console.log(response);
        // } catch (error) {
        //     console.error("Error fetching engines:", error.message);
        // }
    }


  return (
    <div className="homepage-container">
        <div className="image-container">
            <img
                className="logo-image"
                src={Logo}
                alt="Ziptivity Logo"
            />
        </div>
        <div className="text-container">
            <p id="font1">
                Type your zip code to find activites in your area given current weather conditions!
            </p>
        </div>
        <div className='text-field-container'>
            <TextField
                    label="Zip Code"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '70' }}
                    type='number'
                    onInput={(e)=>{ 
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5)
                    }}
                    onChange={(event)=> setInput(event.target.value)}
                  />
              <IconButton onClick={()=> {fetchWeatherDataAndChatGPT(input,'us')}} //input is the value call api here
                aria-label="Check Button" alignItems='center'>
                <CheckCircle className='checkbox-button' sx={{fontSize:'200%'}} />
              </IconButton>
                
            </div>
    </div>
  )
}

export default HomePage
