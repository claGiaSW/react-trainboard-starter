import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryById } from '../helpers/ApiCallHelper';

interface Country {
    id: number;
    code: string;
    name: string;
}

const Country: React.FC = () => {
    const { id } = useParams();

    const [country, setCountry] = useState<Country>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('No country ID provided');
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);

        getCountryById(Number(id))
            .then(response => setCountry(response))
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, [id]);

    return (
        <section aria-label = "Country Details">
            <h1>Country Details</h1>
            {
                isLoading && <div role = "alert" aria-busy = "true">Loading...</div>
            }
            {
                error && <div role = "alert" className = "error">{error}</div>
            }
            {country && (
                <article>
                    <h2>{country.name}</h2>
                    <dl>
                        <dt>ID:</dt>
                        <dd>{country.id}</dd>
                        <dt>Code:</dt>
                        <dd>{country.code}</dd>
                    </dl>
                </article>
            )}
        </section>
    );
};

export default Country;
