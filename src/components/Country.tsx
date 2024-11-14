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
            .then(response => {
                const apiCountry = response.data.countries.filter((c: Country) => c.id === Number(id));
                if (apiCountry) {
                    setCountry(apiCountry);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => console.log('countries printed'));
    }, []);

    return (
        <div>
            {
                country !== undefined &&
                <p> Country: country.id </p>
            }
        </div>
    );
};

export default Country;
