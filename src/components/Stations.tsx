import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStations } from '../helpers/ApiCallHelper';
import Station from './Station';

const Stations: React.FC = () => {

    const [allStations, setAllStations] = useState<Station[]>([]);
    const [stationId, setStationId] = useState<number>(1);

    useEffect(() => {
        getStations()
            .then(response => setAllStations(response.data.stations))
            .catch((err) => console.log(err))
            .finally(() => console.log('finally'));
    }, []);

    console.log('hello world');

    return (
        <div>
            <label>SELECT A STATION
                <select value = { stationId } onChange = { (event) => setStationId(Number(event.target.value)) }>
                    {
                        allStations.map((station) => (
                            <option key = { station.id } value = { station.id }> {station.name}, {station.id} </option>
                        ))
                    }
                </select>
            </label>
            <p>{stationId}</p>
            <Link to = { `/stations/${stationId}` }> Go! </Link>
        </div>
    );
};

export default Stations;
