import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Countries from './components/Countries';
import Country from './components/Country';
import Station from './components/Station';
import Stations from './components/Stations';
import Fares from './pages/Fares';

const App = () => (
    <BrowserRouter>
        <div className = "App">
            <Routes>
                <Route path = "/stations">
                    <Route path = ":id" element = { <Station /> } />
                    <Route index element = { <Stations /> } />
                </Route>
                <Route path = "/countries">
                    <Route path = ":id" element = { <Country /> } />
                    <Route index element = { <Countries /> } />
                </Route>
                <Route path = "/fares">
                    <Route index element = { <Fares /> } />
                </Route>
            </Routes>
            <footer>
                <div>
                    <Link to = "/stations">Stations</Link>
                </div>
                <div>
                    <Link to = "/countries">Countries</Link>
                </div>
                <div>
                    <Link to = "/fares">Fares</Link>
                </div>
            </footer>
        </div>
    </BrowserRouter>
);

export default App;
