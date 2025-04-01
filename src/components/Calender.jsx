import React from 'react'
import { daysOfRamadan } from '../lib/data'

function Calender() {
    const day = new Date().getDate();
    return (
        <div className='mx-4 w-[35%] items-center text-center'>
            <h2 className='text-3xl font-inter mb-4 '>Hijri Calander</h2>
            <ul className='m-4 w-60'>
                {daysOfRamadan.map((item, i) => (
                    <li 
                        key={i}
                        className={i + 1 === day ? 'bg-green-500 rounded-2xl' : 'bg-transparent' }    
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Calender
