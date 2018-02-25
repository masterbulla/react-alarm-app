import React from 'react';

import Header from './header.jsx';
import Alarm from './alarm.jsx';

import './app-style.scss';

const App = () => (
    <div
        className = { 'app' }
    >
        <Header />
        <Alarm />
    </div>
);

export default App;
