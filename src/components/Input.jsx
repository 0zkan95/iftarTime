import React, { useEffect, useRef, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { BiSearchAlt } from 'react-icons/bi';
import axios from "axios";
import { toast } from 'react-toastify';

const ALADHAN_API_URL = 'https://api.aladhan.com/v1/timingsByCity';
const BIGDATACLOUD_BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
const localityLanguage = 'en';

const DEFAULT_LATITUDE = '39.9333635';
const DEFAULT_LONGITUDE = '32.8597419';
const DEFAULT_TIMEZONE = 'Europe/Istanbul';
const DEFAULT_CITY = "Ankara";
const DEFAULT_COUNTRY = "Turkey";


export default function Input({ setDate, setPrayerTimes, setTimeZone }) {
    const [searchInput, setSearchInput] = useState("");
    const inputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [locationName, setLocationName] = useState({ city: DEFAULT_CITY, country: DEFAULT_COUNTRY });
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        searchLocationName();
    }, []);

    function handleInput(e) {
        const inputValue = e.target.value;
        setSearchInput(inputValue)

        if (inputRef.current) {
            const firstLetter = inputValue[0];
            const inputLength = inputValue.length;

            if (inputLength === 1) {
                inputRef.current.classList.toggle('inputLTR', (
                    65 <= firstLetter.charCodeAt(0) &&
                    122 >= firstLetter.charCodeAt(0)
                ));
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim() === "") return;

        setIsLoading(true);
        searchForLocation(searchInput);
    };

    const searchForLocation = async (locationString) => {
        try {

            setTimeZone(DEFAULT_TIMEZONE); //initial value

            const [city, country] = locationString.split(",").map(item => item.trim()); //

            const response = await axios.get(ALADHAN_API_URL, {
                params: {
                    city: city || locationString, // Use the entire string as the city if no comma
                    country: country || city || locationString, // If country is missing, fall back to city or entire
                },
            });

            const data = response.data.data;
            console.log("Aladhan API Response: ", data);

            if (!data) {
                throw new Error("No data found for this location.");
            }

            const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data.timings;
            setPrayerTimes({ Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha });

            const { latitude, longitude } = data.meta.method.location;
            await searchLocationName(latitude, longitude);
            const { timezone } = data.meta;
            setTimeZone(timezone);

        } catch (error) {
            console.error("Error fetching prayer times: ", error);
            setIsError(true);
            toast.error(`Failed to fetch prayer times for ${city}. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    };



    const searchLocationName = async (
        latitude = DEFAULT_LATITUDE, 
        longitude = DEFAULT_LONGITUDE, 
        timezone = DEFAULT_TIMEZONE,
    ) => {
        try {
            const response = await axios.get(BIGDATACLOUD_BASE_URL, {
                params: {
                    latitude,
                    longitude,
                    localityLanguage,
                    timezone,
                },
            });

            console.log("BigDataCloud API Response:", response.data)
            if (response.data) {
                setLocationName({ city: response.data.city, country: response.data.countryName });
                return { city: response.data.city, country: response.data.countryName }
            } else {
                setLocationName({ city: DEFAULT_CITY, country: DEFAULT_COUNTRY });
                return { city: DEFAULT_CITY, country: DEFAULT_COUNTRY };
            }

        } catch (error) {
            console.error("Error fetching location name: ", error);
            setLocationName({
                city: DEFAULT_CITY,
                country: DEFAULT_COUNTRY,
                timezone,
            });
        } finally {
            setIsLoading(false);
            setIsError(false);
        }
    };


    return (
        <div className="flex flex-col justify-center items-center relative max-w-sm w-full mx-auto">

            <form onSubmit={handleSubmit} className="relative flex flex-row items-center">
                <input
                    type="text"
                    ref={inputRef}
                    onChange={handleInput}
                    value={searchInput}
                    placeholder="city, country"
                    name="search"
                    className="rounded-md ring-2 ml-8 border-2 px-2 inputRTL w-[80%] text-xl text-primary-800 border-green-500"
                />
                <button type="submit" className="absolute inset-y-0 right-2 items-center cursor-pointer">
                    <BiSearchAlt className="w-5 h-5 fill-black" aria-label="Search" />
                </button>
            </form>
            <p className='flex text-center justify-center items-center mt-4'>
                <CiLocationOn size={30} color="green"/> Location: {locationName?.city} {locationName?.country}
            </p>
        </div>
    )
}
