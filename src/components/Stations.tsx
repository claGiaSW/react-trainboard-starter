import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { getStations } from '../helpers/ApiCallHelper';
import Station from './Station';

const Stations: React.FC = () => {

    const [allStations, setAllStations] = useState<Station[]>([]);
    const [stationId, setStationId] = useState<number>(3);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);

        getStations()
            .then(response => {
                setAllStations(response);
                setError(null);
            })
            .catch((err) => {
                setError('Failed to fetch stations. Please try again later.');
                console.error('API Error:', err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <main className = "container">
            <div className = "header">Select a Station</div>
            {isLoading && <div role = "status">Loading stations...</div>}
            {error && <div role = "alert" className = "error-message">{error}</div>}
            {!isLoading && !error && (
                <>
                    <label htmlFor = "stationSelect" className = "label">
                    Choose a station:
                    </label><select
                        id = "stationSelect"
                        value = { stationId }
                        onChange = { (event) => setStationId(Number(event.target.value)) }
                    >
                        {allStations.map((station) => (
                            <option key = { station.id } value = { station.id }>
                                {station.name}, ID: {station.id}
                            </option>
                        ))}
                    </select><div className = "link-container" style = { { marginTop: '1rem' } }>
                        <Link to = { `/stations/${stationId}` } className = "link">
                            Go!
                        </Link>
                    </div>
                </>
            )}
        </main>
    );
};

export default Stations;
