import React, { useEffect, useState } from 'react';
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
            <ol>Countries are:
                {
                    allCountries.map( ( country ) => (
                        <li key = { country.id }>{ country.name }</li>
                    ))
                }
            </ol>
        </div>
    );
};

export default Countries;
