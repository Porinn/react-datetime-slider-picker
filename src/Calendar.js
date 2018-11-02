import React from 'react';

import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import Language from './Language';

import './Calendar.css';

const lang = Language['en'];
const moment = require('moment');

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.goPrevmonth = this.goPrevMonth.bind(this);
        this.goNextmonth = this.goNextMonth.bind(this);

        this.state = {
            currentYear: 2018,
            currentMonth: 11,
            currentDay: 2
        }
    }

    goPrevMonth = () => {
        if (this.state.currentMonth > 1) {
            this.setState({
                currentMonth: this.state.currentMonth - 1
            });
        } else {
            this.setState({
                currentYear: this.state.currentYear - 1,
                currentMonth: 12
            });
        }
    }

    goNextMonth = () => {
        if (this.state.currentMonth < 12) {
            this.setState({
                currentMonth: this.state.currentMonth + 1
            });
        } else {
            this.setState({
                currentYear: this.state.currentYear + 1,
                currentMonth: 1
            });
        }
    }

    render() {
        const weeks = lang.shortWeeks;

        return (
            <div className='picker-calendar'>
                <div className='picker-calendar-header'>
                    <div className='picker-calendar-header-prevmonth'><IconButton onClick={() => this.goPrevMonth()}><ChevronLeft /></IconButton></div>
                    <div className='picker-calendar-header-title'>{moment({year: this.state.currentYear, month: this.state.currentMonth-1}).format('MMMM YYYY')}</div>
                    <div className='picker-calendar-header-nextmonth'><IconButton onClick={() => this.goNextMonth()}><ChevronRight /></IconButton></div>
                </div>
                <table className='picker-calendar-calendar'>
                    <thead>
                        <th>
                            {weeks.map(item => {return <td key={item}>{item}</td>})}
                        </th>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        );
    }
}