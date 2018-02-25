import React from 'react';

import Clock from './clock.jsx';

import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';

import './activeAlarms-style.scss';

const ActiveAlarms = ( { data, updater } ) => {
    if ( !_isEmpty ( data ) ) {
        let total = 0;
        _forEach ( data, alarm => {
            if ( alarm.a ) {
                total += 1;
            }
            if ( alarm.sun ) {
                total += 1;
            }
            if ( alarm.mon ) {
                total += 1;
            }
            if ( alarm.tue ) {
                total += 1;
            }
            if ( alarm.wed ) {
                total += 1;
            }
            if ( alarm.thu ) {
                total += 1;
            }
            if ( alarm.fri ) {
                total += 1;
            }
            if ( alarm.sat ) {
                total += 1;
            }
            if ( !( alarm.a || alarm.sun || alarm.mon || alarm.tue || alarm.wed || alarm.thu || alarm.fri || alarm.sat ) ) {
                total += 1;
            }
        });
		
        return (
            <div
                className = { 'activeAlarms' }
            >
                <h2>
                    { 'Active Alarms' }
                </h2>
                { _map ( data, ( alarm, i ) => (
                    <Clock
                        key = { i }
                        order = { i }
                        alarm = { alarm }
                        updater = { updater }
                        data = { data }
                        total = { total }
                    />
                ))}
            </div>
        );
    }
    return false;
};

export default ActiveAlarms;