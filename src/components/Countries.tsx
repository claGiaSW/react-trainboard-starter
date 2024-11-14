import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCountries } from '../helpers/ApiCallHelper';
import Country from './Country';

const Countries: React.FC = () =>
{
    const [allCountries, setAllCountries] = useState<Country[]>([]);

    useEffect(() => {
        getCountries()
            .then( response => setAllCountries(response.data.countries))
            .catch((err) => console.log(err))
            .finally(() => console.log('countries printed'));
    }, []);

    return (
        <div>
            <ul>Countries are:
                {
                    allCountries.map( ( country ) => (
                        <li key = { country.id }><Link to = { `/countries/${country.id}` }>{ country.name }</Link></li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Countries;
