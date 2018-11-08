import React from 'react';

import { Tabs, Tab, Button } from '@material-ui/core';
import { CheckCircleOutline, Today, AccessTime } from '@material-ui/icons';
import Calendar from './Calendar';
import TimePicker from './TimePicker';

import Language from '../public/Language';

import '../public/Picker.css';

const moment = require('moment');

export default class Picker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 0,
            date: {
                year: moment().year(),
                month: moment().month()+1,
                date: moment().date(),
                week: Math.floor((moment().date()-1)/7)+1,
                day: moment().day()
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
        if (this.props.onSave !== undefined) {
            this.props.onSave(this.state.date, this.state.time);
        } else {
            console.log({date: this.state.date, time: this.state.time});
        }
    }

    render() {
        const language = (this.props.language === 'ko') ? Language['ko'] : Language['en'];

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
                        <Tab label={language.date} icon={<Today />} classes={{selected: 'selected'}}/>
                        <Tab label={language.time} icon={<AccessTime />} classes={{selected: 'selected'}}/>
                    </Tabs>
                </div>
                <div className='picker-form'>
                    {(this.state.tab === 0) ? <Calendar language={this.props.language} defaultValue={this.state.date} onChange={(time) => this.onValueChange(true, time)} /> : <TimePicker language={this.props.language} enableSecond={(this.props.enableSecond !== undefined) ? this.props.enableSecond : false} defaultValue={this.state.time} onChange={(date) => this.onValueChange(false, date)}/>}
                </div>
                <div className='picker-footer'>
                    <div onClick={() => this.onSave()}><Button fullWidth><CheckCircleOutline />{language.save}</Button></div>
                </div>
            </div>
        );
    }
}