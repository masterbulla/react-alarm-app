import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import _remove from 'lodash/remove';
import _noop from 'lodash/noop';
import _map from 'lodash/map';

import './clock-style.scss';

let timeouts = [];
let intervals = [];
let temp;

const Clock = ( { alarm, order, updater, data, total } ) => {
    let delay = moment ().set ( { 'hour': alarm.h, 'minute': alarm.m, 'second': 0 } ).diff ( moment () );
    if ( delay <= 0 ) {
        delay = moment ().set ( { 'hour': alarm.h, 'minute': alarm.m, 'second': 0, 'day': moment ().day () + 1 } ).diff ( moment () );
    }
    if ( alarm.a ) {
        temp = setTimeout ( () => {
            alert ( 'ALARM' );
            temp = setInterval ( () =>
                alert ( 'ALARM' ), 86400000 );
            const customKey = order;
            intervals.push ( { [customKey]: temp } );
        }, delay );
        timeouts.push ( temp );
        while ( total < timeouts.length ) {
            clearTimeout ( timeouts.shift () );
        }
    } else if ( !( alarm.sun || alarm.mon || alarm.tue || alarm.wed || alarm.thu || alarm.fri || alarm.sat ) ) {
        temp = setTimeout ( () => {
            alert ( 'ALARM' );
            temp = data;
            temp.splice ( order, 1 );
            localStorage.activeAlarms = JSON.stringify ( temp );
            updater ( temp );
        }, delay );
        timeouts.push ( temp );
        while ( total < timeouts.length ) {
            clearTimeout ( timeouts.shift () );
        }
    } else {
        if ( alarm.sun ) {
            alarmSetter ( 0, alarm, total );
        }
        if ( alarm.mon ) {
            alarmSetter ( 1, alarm, total );
        }
        if ( alarm.tue ) {
            alarmSetter ( 2, alarm, total );
        }
        if ( alarm.wed ) {
            alarmSetter ( 3, alarm, total );
        }
        if ( alarm.thu ) {
            alarmSetter ( 4, alarm, total );
        }
        if ( alarm.fri ) {
            alarmSetter ( 5, alarm, total );
        }
        if ( alarm.sat ) {
            alarmSetter ( 6, alarm, total );
        }
    }
	
    return (
        <div
            className = { 'clock' }
        >
            <span>
                { alarm.h + ':' + alarm.m + dayDisplay ( alarm ) }
            </span>
            <span
                onClick = { () =>
                    alarmRemover ( order, data, updater )
                }
            >
                { 'Remove' }
            </span>
        </div>
    );
};

const dayDisplay = alarm => {
    let day = '';
    if ( alarm.a ) {
        day += ' All';
    }
    if ( alarm.sun ) {
        day += ' Sun';
    }
    if ( alarm.mon ) {
        day += ' Mon';
    }
    if ( alarm.tue ) {
        day += ' Tue';
    }
    if ( alarm.wed ) {
        day += ' Wed';
    }
    if ( alarm.thu ) {
        day += ' Thu';
    }
    if ( alarm.fri ) {
        day += ' Fri';
    }
    if ( alarm.sat ) {
        day += ' Sat';
    }
    return day;
};

const alarmSetter = ( i, alarm, total ) => {
    let delay;
    if ( moment ().day () === i ) {
        delay = moment ().set ( { 'hour': alarm.h, 'minute': alarm.m, 'second': 0 } ).diff ( moment () );
        if ( alarm > 0 ) {
            temp = setTimeout ( () => {
                alert ( 'ALARM' );
                temp = setInterval ( () =>
                    alert ( 'ALARM' ), 7*86400000 );
                const customKey = i;
                intervals.push ( {[customKey]: temp} );
            }, delay );
            timeouts.push ( temp );
            while ( total < timeouts.length ) {
                clearTimeout ( timeouts.shift () );
            }
        } else {
            delay = moment ().set ( { 'hour': alarm.h, 'minute': alarm.m, 'second': 0, 'day': i + 7 } ).diff ( moment () );
            temp = setTimeout ( () => {
                alert ( 'ALARM' );
                temp = setInterval ( () =>
                    alert ( 'ALARM' ), 7*86400000);
                const customKey = i;
                intervals.push ( { [customKey]: temp } );
            }, delay );
            timeouts.push ( temp );
            while ( total < timeouts.length ) {
                clearTimeout ( timeouts.shift () );
            }
        }
    } else {
        delay = moment ().set ( { 'hour': alarm.h, 'minute': alarm.m, 'second': 0, 'day': moment ().day () + ( i + 7 - moment ().day () ) } ).diff ( moment () );
        temp = setTimeout ( () => {
            alert ( 'ALARM' );
            temp = setInterval ( () =>
                alert ( 'ALARM' ), 7*86400000);
            const customKey = i;
            intervals.push ( { [customKey]: temp } );
        }, delay );
        timeouts.push ( temp );
        while ( total < timeouts.length ) {
            clearTimeout ( timeouts.shift() );
        }
    }
};

const alarmRemover = ( order, data, updater ) => {
    let interval = _remove ( intervals, interval => {
        return _map ( interval, ( value, key ) => {
            return Number ( key ) === order;
        });
    });
    if ( interval ) {
        clearInterval ( interval );
    }
    clearTimeout ( timeouts.splice ( order, 1 ) );
    temp = data;
    temp.splice ( order, 1 );
    localStorage.activeAlarms = JSON.stringify ( temp );
    updater ( temp );
};

Clock.propTypes = {
    alarm: PropTypes.shape().isRequired,
    order: PropTypes.number.isRequired,
    updater: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired
};

Clock.defaultProps = {
    alarm: {},
    order: 0,
    updater: _noop,
    data: [],
    total: 0
};

export default Clock;