import { useState } from 'react'
import './App.css'

import Calender from './components/calender';
import PrayerTimes from './components/PrayerTimes';
import LocalTime from './components/LocalTime';
import Input from './components/input';



function App() {
  const [timeZone, setTimeZone] = useState();  // Time Zone state
  const [prayerTimes, setPrayerTimes] = useState({
    Fajr: '',
    Sunrise: '',
    Dhuhr: '',
    Asr: '',
    Magrib: '',
    Isha: '',
  }); //Prayer Times state
  const [date, setDate] = useState({});

  return (
    <>
      <h1 className='text-center text-4xl mt-8 mb-8'>2025 Ramadan</h1>
      <div className='flex flex-row items-start justify-center'>
        <Calender />
        <div className='ml-2'>
          <Input 
            setTimeZone={setTimeZone} 
            setDate={setDate}
            setPrayerTimes={setPrayerTimes}
          />
          <LocalTime timeZone={timeZone} />
          <PrayerTimes prayerTimes={prayerTimes}/>
        </div>
      </div>
    </>
  )
}

export default App
