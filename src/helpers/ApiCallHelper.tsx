import axios from 'axios';

export const getCountries = () =>
{
    return axios.get('https://int-dev2.tram.softwire-lner-dev.co.uk/v1/countries/', {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });
};

export const getStations = () => {
    return axios.get('https://mobile-api-softwire2.lner.co.uk/v1/stations', {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });
};
