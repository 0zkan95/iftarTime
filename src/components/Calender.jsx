import React from 'react'
import { daysOfRamadan } from '../lib/data'

function Calender() {
    const day = new Date().getDate();
    return (
        <div className='mx-8 w-[40%] items-center text-center'>
            <h2 className='text-3xl font-inter mb-4 '>Hijri Calander</h2>
            <ul className='m-auto'>
                {daysOfRamadan.map((item, i) => (
                    <li 
                        key={i}
                        className={i + 1 === day ? 'bg-blue-300 rounded-2xl' : 'bg-transparent' }    
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Calender
