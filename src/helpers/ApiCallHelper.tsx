import axios from 'axios';
import Country from '../components/Country';
import Station from '../components/Station';

const axiosInstance = axios.create({
    baseURL: 'https://int-dev2.tram.softwire-lner-dev.co.uk/v1',
    headers: {
        'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
    },
});

export const getCountries = (): Promise<Country[]> => {
    return axiosInstance.get('/countries')
        .then(response => {
            const countries: Country[] = response.data.countries;
            return countries;
        });
};

export const getStations = (): Promise<Station[]> => {
    return axiosInstance.get('/stations')
        .then(response => {
            const stations: Station[] = response.data.stations;
            return stations;
        });
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