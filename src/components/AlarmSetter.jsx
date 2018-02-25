import React from 'react';

import ActiveAlarms from './activeAlarms.jsx';

import _map from 'lodash/map';
import _times from 'lodash/times';
import _isEmpty from 'lodash/isEmpty';

import './alarmSetter-style.scss';

class AlarmSetter extends React.Component {
	
    constructor () {
        super ();
        this.state = {
            data: []
        };
    }

    stateUpdater = data => {
        this.setState ( { data: data } );
    };

    componentDidMount () {
        this.setState ( { data:
            localStorage.activeAlarms
                ?
                JSON.parse ( localStorage.activeAlarms )
                :
                []
        });
    }

    alarmSaver = ( h, m, a, sun, mon, tue, wed, thu, fri, sat ) => {
        if ( h.length <= 2 && m.length <= 2 ) {
            let temp;
            if ( _isEmpty ( this.state.data ) ) {
                temp = [];
                temp.push ( { h, m, a, sun, mon, tue, wed, thu, fri, sat } );
                localStorage.activeAlarms = JSON.stringify ( temp );
                this.setState ( { data: temp } );
            } else {
                temp = this.state.data;
                temp.push ( { h, m, a, sun, mon, tue, wed, thu, fri, sat } );
                localStorage.activeAlarms = JSON.stringify ( temp );
                this.setState ( { data: temp } );
            }
        }
    };

    dayChecker = day => {
        if ( day === 'All' ) {
            this.refs.Sunday.checked = false;
            this.refs.Monday.checked = false;
            this.refs.Tuesday.checked = false;
            this.refs.Wednesday.checked = false;
            this.refs.Thursday.checked = false;
            this.refs.Friday.checked = false;
            this.refs.Saturday.checked = false;
        } else {
            this.refs.All.checked = false;
        }
    };

    alarmSetter = () => {
        this.alarmSaver (
            this.refs.hour.value,
            this.refs.min.value,
            this.refs.All.checked,
            this.refs.Sunday.checked,
            this.refs.Monday.checked,
            this.refs.Tuesday.checked,
            this.refs.Wednesday.checked,
            this.refs.Thursday.checked,
            this.refs.Friday.checked,
            this.refs.Saturday.checked
        );
        this.refs.defaultHour.selected = true;
        this.refs.defaultMin.selected = true;
        this.refs.All.checked = false;
        this.refs.Sunday.checked = false;
        this.refs.Monday.checked = false;
        this.refs.Tuesday.checked = false;
        this.refs.Wednesday.checked = false;
        this.refs.Thursday.checked = false;
        this.refs.Friday.checked = false;
        this.refs.Saturday.checked = false;
    };

    render () {
        const days = ['All', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	
        return (
            <div>
                <div
                    className = { 'time-setter' }
                >
                    <select
                        ref = { 'hour' }
                        defaultValue = { 'Choose Hour' }
                    >
                        <option
                            ref = { 'defaultHour' }
                            hidden
                        >
                            Choose Hour
                        </option>
                        { _times ( 24, i => (
                            <option
                                key = { i }
                                value = { i }
                            >
                                { i }
                            </option>)
                        )}
                    </select>
                    { ':' }
                    <select
                        ref = { 'min' }
                        defaultValue={'Choose Minute'}
                    >
                        <option
                            ref = { 'defaultMin' }
                            hidden
                        >
                            Choose Minute
                        </option>
                        { _times ( 60, i => (
                            <option
                                key = { i }
                                value = { i }
                            >
                                { i }
                            </option>)
                        )}
                    </select>
                </div>
                <div
                    className = { 'days-setter' }
                >
                    { _map ( days, (day, i) => (
                        <span
                            key = { i }
                        >
                            <input
                                type = 'checkbox'
                                id = { day }
                                ref = { day }
                                onClick = { () => this.dayChecker ( day ) }
                            />
                            <label
                                htmlFor = { day }
                            >
                                { day }
                            </label>
                        </span>)
                    )}
                </div>
                <div
                    className = { 'alarm-setter' }
                >
                    <button
                        type = 'button'
                        onClick = { this.alarmSetter }
                    >
                        { 'Set Alarm' }
                    </button>
                </div>
                <ActiveAlarms
                    data = { this.state.data }
                    updater = { this.stateUpdater }
                />
            </div>
        );
    }
}

export default AlarmSetter;