import React from 'react';

import { Tabs, Tab, Button } from '@material-ui/core';
import { CheckCircleOutline, Today, AccessTime } from '@material-ui/icons';
import Calendar from './Calendar';
import TimePicker from './TimePicker';

import './Picker.css';

const moment = require('moment');

export default class Picker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 0,
            date: {
                year: moment().year(),
                month: moment().month()+1,
                date: moment().date()
            },
            time: {
                hour: moment().hour(),
                minute: moment().minute(),
                second: moment().second()
            }
        }

        this.onTabChange = this.onTabChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    onTabChange = (value) => {
        this.setState({tab: value});
    }

    onValueChange = (isDate, value) => {
        if (isDate) {
            this.setState({date: value});
        } else {
            this.setState({time: value});
        }
    }

    onSave = () => {
        console.log(this.state.date);
        console.log(this.state.time);
    }

    render() {
        return (
            <div className='picker'>
                <div className='picker-tab'>
                    <Tabs 
                        value={this.state.tab}
                        onChange={(event, value) => this.onTabChange(value)}
                        fullWidth
                        textColor='inherit'
                        classes={{indicator: 'picker-tab-indicator'}}
                    >
                        <Tab label='Date' icon={<Today />} classes={{selected: 'selected'}}/>
                        <Tab label='Time' icon={<AccessTime />} classes={{selected: 'selected'}}/>
                    </Tabs>
                </div>
                <div className='picker-form'>
                    {(this.state.tab === 0) ? <Calendar defaultValue={this.state.date} onChange={(time) => this.onValueChange(true, time)} /> : <TimePicker enableSecond={(this.props.enableSecond !== undefined) ? this.props.enableSecond : true} defaultValue={this.state.time} onChange={(date) => this.onValueChange(false, date)}/>}
                </div>
                <div className='picker-footer'>
                    <Button onKeyDown={() => this.onSave} fullWidth><CheckCircleOutline />Save</Button>
                </div>
            </div>
        );
    }
}