import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { getStations } from '../helpers/ApiCallHelper';
import Station from './Station';

const Stations: React.FC = () => {

    const [allStations, setAllStations] = useState<Station[]>([]);
    const [stationId, setStationId] = useState<number>(3);

    useEffect(() => {
        getStations()
            .then(response => setAllStations(response.data.stations))
            .catch((err) => console.log(err))
            .finally(() => console.log('finally'));
    }, []);

    console.log('hello world');

    return (
        <div className = "container">
            <div className = "header">Select a Station</div>
            <label htmlFor = "stationSelect" className = "label">
            Choose a station:
            </label>
            <select
                id = "stationSelect"
                value = { stationId }
                onChange = { (event) => setStationId(Number(event.target.value)) }
            >
                {
                    allStations.map((station) => (
                        <option key = { station.id } value = { station.id }>
                            {station.name}, ID: {station.id}
                        </option>
                    ))
                }
            </select>
            <div className = "link-container" style = { { marginTop: '1rem' } }>
                <Link to = { `/stations/${stationId}` } className = "link">
                Go!
                </Link>
            </div>
        </div>
    );
};

export default Stations;
