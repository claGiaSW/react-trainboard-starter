import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import { Journey } from '../components/Fare';
import Station from '../components/Station';
import { getJourneys, getStations } from '../helpers/ApiCallHelper';

const Fares: React.FC = () => {

    const [allJourneys, setAllJourneys] = useState<Journey[]>([]);
    const [allStations, setAllStations] = useState<Station[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [originStation, setOriginStation] = useState<string>();
    const [destinationStation, setDestinationStation] = useState<string>();
    const [outboundDateTime, setOutboundDateTime] = useState<Date>(new Date());
    const [numberOfChildren, setNumberOfChildren] = useState<number>(0);
    const [numberOfAdults, setNumberOfAdults] = useState<number>(0);

    useEffect(() => {
        getStations()
            .then(response => {
                setAllStations(response);
            })
            .catch((err) => {
                setError('Failed to fetch stations. Please try again later.');
                console.error('API Error:', err);
            });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        setIsLoading(true);

        e.preventDefault();

        getJourneys(originStation || allStations[0].name, destinationStation || allStations[0].name, outboundDateTime, numberOfChildren, numberOfAdults)
            .then(response => {
                setAllJourneys(response);
                setError(null);
            })
            .catch((err) => {
                setError('Failed to fetch journeys. Please try again later.');
                console.error('API Error:', err);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <main className = "container">
            <div className = "header">Your Journey</div>
            <div className = 'container-form'>
                <form onSubmit = { handleSubmit }>
                    <div className = "form-input">
                        <label htmlFor = "stationSelect" className = "label">
                    Choose your station of departure:
                        </label>
                        <select
                            id = "originStationSelect"
                            aria-required = "true"
                            aria-label = "Origin station select"
                            value = { originStation }
                            onChange = { (event) => setOriginStation(event.target.value) }
                        >
                            {allStations.map((station) => (
                                <option key = { station.id } value = { station.crs }>
                                    {station.crs} - {station.name} 
                                </option>
                            ))}
                        </select>       
                    </div>
                    <div className = "form-input">
                        <label htmlFor = "stationSelect" className = "label">
                    Choose your destination:
                        </label>
                        <select
                            id = "destinationStationSelect"
                            aria-required = "true"
                            aria-label = "Destination station select"
                            value = { destinationStation }
                            onChange = { (event) => setDestinationStation(event.target.value) }
                        >
                            {allStations.map((station) => (
                                <option key = { station.id } value = { station.crs }>
                                    {station.crs} - {station.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className = "form-input">
                        <label htmlFor = "adults">ADULTS: </label>
                        <input type = "number" id = "adults" name = "adults" min = "0" max = "100"
                            value = { numberOfAdults }
                            onChange = { (event) => setNumberOfAdults(Number(event.target.value)) }
                            className = 'passengers'/>

                        <label htmlFor = "children">CHILDREN: </label>
                        <input type = "number" id = "children" name = "children" min = "0" max = "100"
                            value = { numberOfChildren }
                            onChange = { (event) => setNumberOfChildren(Number(event.target.value)) }
                            className = 'passengers'/>
                    </div>
                    <div className = "form-input">
                        <label htmlFor = "date">Date of departure: </label>
                        <DatePicker selected = { outboundDateTime } onChange = { (date) => date && setOutboundDateTime(date) } showIcon />
                    </div>
                    <div>
                        <input type = 'submit' value = 'SHOW FARES' />
                    </div>
                </form>
            </div>
            
            {isLoading && <div role = "status">Loading journeys...</div>}
            {error && <div role = "alert" className = "error-message">{error}</div>}
            {!isLoading && !error && (
                <ol className = "journeys-list" aria-label = "List of journeys">
                    {
                        allJourneys.map((journey) => (
                            <li key = { journey.journeyId } className = "journey-item">
                                <p>
                                    Departure: {journey.departureTime}
                                </p>
                                <p>
                                    Arrival: {journey.arrivalTime}
                                </p>
                                <ul>
                                    Tickets: {journey.tickets.map(ticket => (
                                        <li key = { ticket.fareId } className = "ticket-item">
                                            <p>{ticket.name}</p>
                                            <p>Price: {ticket.priceInPennies / 100}£</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))
                    }
                </ol>
            )}
        </main>
    );
};

export default Fares;