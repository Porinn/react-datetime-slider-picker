import React from 'react';

import { Tabs, Tab } from '@material-ui/core';

import Calendar from './Calendar';
import TimePicker from './TimePicker';

import './Picker.css';

export default class Picker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 0
        }

        this.onTabChange = this.onTabChange.bind(this);
    }

    onTabChange = (value) => {
        this.setState({tab: value});
    }

    render() {
        return (
            <div className='picker'>
                <div className='picker-tab'>
                    <Tabs value={this.state.tab} onChange={(event, value) => this.onTabChange(value)} fullWidth>
                        <Tab label='Date' />
                        <Tab label='Time' />
                    </Tabs>
                </div>
                <div className='picker-form'>
                    {(this.state.tab === 1) ? <TimePicker /> : <Calendar />}
                </div>
            </div>
        );
    }
}