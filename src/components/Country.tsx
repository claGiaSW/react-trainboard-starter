import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCountries } from '../helpers/ApiCallHelper';

interface Country {
    id: number;
    code: string;
    name: string;
}

const Country: React.FC = () => {
    const { id } = useParams();

    const [country, setCountry] = useState<Country>();

    useEffect(() => {
        getCountries()
            .then(response => setCountry(response.data.countries.find((c: Country) => c.id === Number(id))))
            .catch((err) => console.log(err))
            .finally(() => console.log('countries printed'));
    }, []);

    return (
        <div>
            <p>Country:</p>
            {
                country !== undefined &&
                <p> {country.name} {country.id} </p>
            }
        </div>
    );
};

export default Country;
