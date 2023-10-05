import React, { useState } from "react";
import './HomePage.css';
import Logo from '../pictures/Ziptivity.png'
import { CheckCircle } from '@mui/icons-material'
import {IconButton, TextField } from "@mui/material";
import { fetchWeatherData} from "../backend/backend";

function HomePage(props) {
    const[input,setInput]=useState(props.input)
    const[activities,setActivities]=useState("")

    const handleOnClick= async () =>{
        const result = await fetchWeatherData(input,'us');
        setActivities(result);
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
              <IconButton onClick={handleOnClick}>
                <CheckCircle className='checkbox-button' sx={{fontSize:'200%'}} />
              </IconButton>
                
            </div>
            <p id="font1">
                {activities}
            </p>
            
    </div>
  )
}

export default HomePage
