import React, { useState } from "react";
import './HomePage.css';
import Logo from '../pictures/Ziptivity.png'
import { CheckCircle } from '@mui/icons-material'
import {IconButton, TextField } from "@mui/material";
import { fetchWeatherData} from "../backend/backend";
import Loading from '../gif/SpeedPin.gif'
import { Fade } from "react-reveal";

function HomePage(props) {
    const[input,setInput]=useState(props.input)
    const[paragraph,setParagraph]=useState("")
    const[loading, setLoading]= useState(false);
    const[click, setClick]= useState(0);


    const handleOnClick= async () =>{
        setLoading(true);
        setClick(1);
        const result = await fetchWeatherData(input,'us');
        console.log(result); 
        setParagraph(result);
        setLoading(false);
        setClick(0);
    }
    const renderFormattedParagraph = () => {
        // Split the paragraph into lines
        const lines = paragraph.split('\n');

        // Map over lines and insert <br /> tags between them
        return lines.map((line, index) => 
            <span key={index}>
                {line}
                {index !== lines.length - 1 && <br />}
            </span>
        );
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
                Enter your zip code to find activites in your area given current weather conditions!
            </p>
        </div>
        {loading ? (
            <div className='loadingimage'>
                <img
                        src={Loading}
                        alt='Loading...'
                />
            </div>
        )
        :
        click===0 && loading===false
        ?
        (
            <>
                <Fade>
                <div className='text-field-container'>
                    <TextField
                            label="Zip Code"
                       a     id="outlined-start-adornment"
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
                    <div className="act-result-container">
                        <p className="fade-in" id="act-result-text">    
                            {renderFormattedParagraph()}
                        </p>
                    </div>  
                </Fade>
            </>
        )
            :
            null
        }
    </div>
  )
}

export default HomePage
