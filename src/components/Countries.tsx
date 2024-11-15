import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCountries } from '../helpers/ApiCallHelper';
import Country from './Country';

const Countries: React.FC = () => {
    const [allCountries, setAllCountries] = useState<Country[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);

        getCountries()
            .then(response => {
                setAllCountries(response);
                setError(null);
            })
            .catch((err) => {
                setError('Failed to fetch countries. Please try again later.');
                console.error('API Error:', err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <main className = "container">
            <h1>Countries</h1>
            {isLoading && <div role = "status">Loading countries...</div>}
            {error && <div role = "alert" className = "error-message">{error}</div>}
            {!isLoading && !error && (
                <ul className = "countries-list" aria-label = "List of countries">
                    {
                        allCountries.map((country) => (
                            <li key = { country.id } className = "country-item">
                                <Link to = { `/countries/${country.id}` } className = "country-link">
                                    {country.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            )}
        </main>
    );
};

export default Countries;
