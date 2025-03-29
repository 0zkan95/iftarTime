import { useState } from 'react'
import './App.css'

import Calender from './components/calender';
import Timing from './components/Timing';
import LocalTime from './components/LocalTime';



function App() {


  return (
    <>
      <h1 className='text-center text-4xl mt-8'>2025 Ramadan</h1>
      <div className='flex flex-row m-8'>
        <Calender />
        <div>
          <LocalTime />
          <Timing />
        </div>
      </div>
    </>
  )
}

export default App
