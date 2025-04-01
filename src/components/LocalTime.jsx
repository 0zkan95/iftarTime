import React from 'react'
import { useState, useEffect } from 'react';
import moment from 'moment-timezone';


const LocalTime = ({ timeZone }) => {
    
    const [localTime, setLocalTime] = useState(null);
    const [localDate, setLocalDate] = useState(null);

    useEffect(() => {
        const updateTime = () => {
            if (timeZone) {
                const now = moment.tz(timeZone);

                setLocalTime(now.format('HH:mm:ss')); // time format
                setLocalDate(now.format('ddd, MMM DD, YYYY')); //date format
            }
        };

        updateTime();

        const intervalId = setInterval(updateTime, 1000) //updated every second

        return () => clearInterval(intervalId); //clear interval on unmount
    }, [timeZone]);


    return (
        <div>
            <div className='flex flex-col justify-center items-center mt-4'>
                <h2 className='text-5xl mb-4'> 
                    {localTime ? localTime : 'Loading...'}
                </h2>
                <p className='mb-8'>
                    {localDate ? localDate : ''}
                </p>
            </div>

        </div>
    )
}

export default LocalTime
