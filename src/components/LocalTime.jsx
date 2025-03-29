import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { days, months } from "../lib/data";
import { useState, useEffect } from 'react';

const LocalTime = () => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const options = {
        hour12 : false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center m-8'>
                <p className='flex text-center justify-center items-center'> <CiLocationOn size={30} /> Location: </p>
                <input type="text" className='border-blue-400 border-2 rounded-2xl' />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-6xl mb-4'> {currentTime.toLocaleTimeString(undefined, options)}</h2>
                <p className='mb-8'>
                    {months[month]} {day},  {year}
                </p>
            </div>
        </div>
    )
}

export default LocalTime
