import React, { useEffect, useState } from 'react';
import { PrayerTimes } from "../lib/data";

const Timing = () => {

    const [timeLeft, setTimeLeft] = useState(getIftarTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(getIftarTime())
        }, 1000);

        return () => clearInterval(intervalId)
    }, []);

    function getIftarTime() {
        const now = new Date();
        const dinnerTime = new Date(now);

        dinnerTime.setHours(19);
        dinnerTime.setMinutes(16);
        dinnerTime.setSeconds(0);
        dinnerTime.setMilliseconds(0);

        //if dinner time passed, set it to tomorrow
        if (now > dinnerTime) {
            dinnerTime.setDate(dinnerTime.getDate() + 1);
        }

        const leftTime = dinnerTime.getTime() - now.getTime(); // time in miliseconds
        return leftTime;
    }




    // formated time
    const formatedTime = (milliseconds) => {
        if (milliseconds <= 0) return "Iftar Time !"
        const totalSecons = Math.floor(milliseconds / 1000);
        const seconds = Math.floor(totalSecons  % 60)
        const minutes = Math.floor((totalSecons / 60 ) % 60)
        const hours = Math.floor((totalSecons  / 60 / 60 ) % 60 )

        return ` ${hours.toString().padStart(2, '0')}:
                 ${minutes.toString().padStart(2, '0')}:
                 ${seconds.toString().padStart(2, '0')} `
    }




    return (
        <div className='flex flex-col items-center'>


            <h1 className='text-3x1 font-bold font-inter'>How long until iftar ?</h1>

            <h3 className='text-5xl mt-2'> {formatedTime(timeLeft)} </h3>

            <div className='mt-8'>
                <ul>
                    {PrayerTimes.map((item, index) => (
                        <li key={index}> {item} : 19:16</li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default Timing
