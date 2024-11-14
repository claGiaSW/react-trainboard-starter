import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
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
            .then(response => setStation(response.data.stations.find((s: Station) => s.id === Number(id))))
            .catch((err) => console.log(err))
            .finally(() => console.log('countries printed'));
    }, []);

    return (
        <div className = "container">
            <div className = "header">Station Information</div>
            {
                station ? (
                    <div className = "station-info">
                        <span className = "label">Name:</span>
                        <span className = "value">{station.name}</span>

                        <span className = "label">ID:</span>
                        <span className = "value">{station.id}</span>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    );
};

export default Station;