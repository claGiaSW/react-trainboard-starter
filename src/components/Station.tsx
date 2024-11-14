import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStations } from '../helpers/ApiCallHelper';

interface Station {
    id: number;
    name: string;
    aliases: string[];
    crs: string;
    nlc: string;
    latitude: number;
    longitude: number;
    isGroupStation: boolean;
    isSilverSeekStation: boolean;
}

const Station: React.FC = () => {
    const { id } = useParams();
    
    const [station, setStation] = useState<Station>();

    useEffect(() => {
        getStations()
            .then(response => setStation(response.data.stations.filter((s: Station) => s.id === Number(id))[0]))
            .catch((err) => console.log(err))
            .finally(() => console.log('countries printed'));
    }, []);

    return (
        <div>
            <p> Station: </p>
            {
                station !== undefined &&
                <p>{station.name} {station.id} </p>
            }
        </div>
    );
};

export default Station;