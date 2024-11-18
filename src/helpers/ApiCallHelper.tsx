/* eslint-disable @typescript-eslint/no-inferrable-types */

import axios from 'axios';
import Country from '../components/Country';
import { Journey } from '../components/Fare';
import Station from '../components/Station';

const axiosInstance = axios.create({
    baseURL: 'https://int-dev2.tram.softwire-lner-dev.co.uk/v1',
    headers: {
        'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
    },
});

export const getCountries = async (): Promise<Country[]> => {
    const response = await axiosInstance.get('/countries');
    const countries: Country[] = response.data.countries;
    return countries;
};

export const getStations = async (): Promise<Station[]> => {
    const response = await axiosInstance.get('/stations');
    const stations: Station[] = response.data.stations;
    return stations;
};

export const getCountryById = async (queryId: number): Promise<Country> => {
    const countries = await getCountries();
    const foundCountry = countries.find((country: Country) => country.id === queryId);
    if (!foundCountry) {
        throw new Error(`Country with ID ${queryId} not found`);
    }
    return foundCountry;
};

export const getStationById = async (queryId: number): Promise<Station> => {
    const stations = await getStations();
    const foundStation = stations.find((station: Station) => station.id === queryId);
    if (!foundStation) {
        throw new Error(`Station with ID ${queryId} not found`);
    }
    return foundStation;
};

export const getJourneys = async (originStation: string, destinationStation: string, outboundDateTime: Date, numberOfChildren: number, numberOfAdults: number): Promise<Journey[]> => {
    if (numberOfChildren < 0 || numberOfAdults < 0) {
        throw new Error('Passengers amount cannot be negative');
    }
    if (numberOfChildren + numberOfAdults === 0) {
        throw new Error('At least one passenger is required');
    }

    try{
        const response = await axiosInstance.get('/fares', {
            params: {
                originStation: originStation,
                destinationStation: destinationStation,
                outboundDateTime: outboundDateTime,
                numberOfChildren: numberOfChildren,
                numberOfAdults: numberOfAdults,
            },
        });

        if (!Array.isArray(response.data?.outboundJourneys)) {
            throw new Error('Invalid API response format');
        }

        const journeys: Journey[] = response.data.outboundJourneys;
        return journeys;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Failed to fetch journeys: ${error.response?.data?.message || error.message}`);
        }
        throw error;
    }
};