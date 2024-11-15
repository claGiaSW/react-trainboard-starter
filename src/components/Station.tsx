import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { getStationById } from '../helpers/ApiCallHelper';

interface Station {
    id: number;
    name: string;
    displayName?: string;
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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('No station ID provided');
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);

        getStationById( Number(id) )
            .then(response => setStation(response))
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, [id]);

    return (
        <div className = "container">
            <div className = "header">Station Information</div>
            {
                isLoading && <div role = "alert" aria-busy = "true">Loading...</div>
            }
            {
                error && <div role = "alert" className = "error">{error}</div>
            }
            {
                station && (
                    <div className = "element-info">
                        <span className = "label">Name:</span>
                        <span className = "value">{station.name}</span>

                        <span className = "label">ID:</span>
                        <span className = "value">{station.id}</span>
                    </div>
                )
            }
        </div>
    );
};

export default Station;