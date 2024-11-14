import React, { useEffect, useState } from 'react';
import { getStations } from '../helpers/ApiCallHelper';
import Station from './Station';

const Stations: React.FC = () => {

    const [allStations, setAllStations] = useState<Station[]>([]);

    useEffect(() => {
        getStations()
            .then(response => setAllStations(response.data.stations))
            .catch((err) => console.log(err))
            .finally(() => console.log('finally'));
    }, []);

    console.log('hello world');

    return (
        <div>
            <ol>Stations are:
                {
                    allStations.map( ( station ) => (
                        <li key = { station.id }>{ station.name }</li>
                    ))
                }
            </ol>
        </div>
    );
};

export default Stations;
