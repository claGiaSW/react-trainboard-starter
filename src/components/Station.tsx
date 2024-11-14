import React from 'react';
import { useParams } from 'react-router-dom';

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
    return (
        <div>
            Station {id}!
        </div>
    );
};

export default Station;