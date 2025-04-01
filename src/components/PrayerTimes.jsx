import React, { useEffect, useState } from 'react';


const PrayerTimes = ({ prayerTimes }) => { //Receive prayerTimes as a prop

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        function getIftarTime() {
            const now = new Date();
            const maghribTimeStr = prayerTimes?.Maghrib;

            if (!maghribTimeStr) return null

            const [hours, minutes] = maghribTimeStr.split(':');
            const dinnerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

            //if dinner time passed, set it to tomorrow
            if (now > dinnerTime) {
                dinnerTime.setDate(dinnerTime.getDate() + 1);
            }

            const leftTime = dinnerTime.getTime() - now.getTime(); // time in miliseconds
            return leftTime;
        }

        // Run this effect whenevet prayerTimes changes
        if (prayerTimes && prayerTimes.Maghrib) {
            const iftarTime = getIftarTime();
            setTimeLeft(iftarTime);

            const intervalId = setInterval(() => {
                const updatedIftarTime = getIftarTime();
                setTimeLeft(updatedIftarTime)
            }, 1000);
            
            return () => clearInterval(intervalId);
        } else {
            setTimeLeft(null); //reset it.
            return () => {}; // empty function
        }
    }, [prayerTimes]); // depend on prayerTimes



    // formated time
    const formatedTime = (milliseconds) => {
        if (milliseconds === null ) return "Loading...";
        if (milliseconds <= 0) return "Iftar Time !"
        const totalSecons = Math.floor(milliseconds / 1000);
        const seconds = Math.floor(totalSecons % 60)
        const minutes = Math.floor((totalSecons / 60) % 60)
        const hours = Math.floor((totalSecons / 60 / 60) % 60)

        return ` ${hours.toString().padStart(2, '0')}:
                 ${minutes.toString().padStart(2, '0')}:
                 ${seconds.toString().padStart(2, '0')} 
                `;
    }

    const formatTime = (time) => {
        if (!time) return '--:--'
        const [hour, minute] = time.split(':');
        return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    };




    return (
        <div className='flex flex-col items-center mt-6'>


            <h1 style={{ fontSize: "2rem" }} className='font-bold'>How long until iftar ?</h1>

            <h3 className='text-5xl mt-4 border-green-500 border-b-2'> {formatedTime(timeLeft)} </h3>

            <div className='mt-10'>
                <ul className='min-w-90 bg-green-500 rounded-2xl p-2'>
                    <li className='p-0.5 border-b-1 flex flex-row justify-between'>
                        <span>Fajr: </span> <span>{formatTime(prayerTimes?.Fajr)}</span>  
                    </li>
                    <li className='p-0.5 border-b-1 flex flex-row justify-between'> 
                        <span>Sunrise: </span>  <span>{formatTime(prayerTimes?.Sunrise)}</span>   
                    </li>
                    <li className='p-0.5 border-b-1 flex flex-row justify-between'>
                         <span>Dhuhr: </span><span></span>  {formatTime(prayerTimes?.Dhuhr)}
                    </li>
                    <li className='p-0.5 border-b-1 flex flex-row justify-between'>
                        <span>Asr: </span><span></span> {formatTime(prayerTimes?.Asr)} 
                    </li>
                    <li className='p-0.5 border-b-1 flex flex-row justify-between'>
                        <span>Maghrib: </span><span></span> {formatTime(prayerTimes?.Maghrib)} 
                    </li>
                    <li className='p-0.5 border-b-1 flex flex-row justify-between'>
                        <span>Isha: </span><span></span><span></span> {formatTime(prayerTimes?.Isha)} 
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default PrayerTimes;
