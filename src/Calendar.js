import React from 'react';

import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import Language from '../public/Language';

import '../public/Calendar.css';

const moment = require('moment');

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentYear: this.props.defaultValue.year,
            currentMonth:  this.props.defaultValue.month,
            currentDate: this.props.defaultValue.date,
            currentWeek: this.props.defaultValue.week,
            currentDay: this.props.defaultValue.day,
            selectedIndex: null
        }

        this.goPrevmonth = this.goPrevMonth.bind(this);
        this.goNextmonth = this.goNextMonth.bind(this);
    }

    componentDidMount() {
        this.setState({
            selectedIndex: this.getDayOfFirstDate(this.state.currentYear, this.state.currentMonth)+this.state.currentDate-1
        }, () => {
            this.onChange();
        });
    }

    onChange = () => {
        this.props.onChange({
            year: this.state.currentYear, 
            month: this.state.currentMonth, 
            date: this.state.currentDate,
            week: this.state.currentWeek,
            day: this.state.currentDay
        });
    }

    getDateCellsArray = () => {
        let dateCells = [];
        const daysInLastMonth = this.getDaysInLastMonth(this.state.currentYear, this.state.currentMonth);
        const daysInThisMonth = this.getDaysInThisMonth(this.state.currentYear, this.state.currentMonth);
        const firstDate = daysInLastMonth - this.getDayOfFirstDate(this.state.currentYear, this.state.currentMonth) + 1;

        for (let date=firstDate; date<=daysInLastMonth; date++) {
            dateCells.push({date: date, type: 'prev'});
        }
        for (let date=1; date<=daysInThisMonth; date++) {
            dateCells.push({date: date, type: 'present'});
        }
        // 42 = 7(days of week) + 6(weeks)
        const nextDaysLength = 42 - dateCells.length;
        for (let date=1; date<=nextDaysLength; date++) {
            dateCells.push({date: date, type: 'next'});
        }

        return dateCells;
    }

    getDayOfFirstDate = (year, month) => {
        return moment({year: year, month: month-1, date: 1}).day();
    }

    getDaysInThisMonth = (year, month) => {
        return moment({year: year, month: month-1}).daysInMonth();
    }

    getDaysInLastMonth = (year, month) => {
        if (month > 1) {
            return moment({year: year, month: month-2}).daysInMonth();
        } else {
            return moment({year: year-1, month: 11}).daysInMonth();
        }
    }

    goPrevMonth = () => {
        if (this.state.currentMonth > 1) {
            this.setState({
                currentMonth: this.state.currentMonth - 1,
                selectedIndex: null
            });
        } else {
            this.setState({
                currentYear: this.state.currentYear - 1,
                currentMonth: 12,
                selectedIndex: null
            });
        }
    }

    goNextMonth = () => {
        if (this.state.currentMonth < 12) {
            this.setState({
                currentMonth: this.state.currentMonth + 1,
                selectedIndex: null
            });
        } else {
            this.setState({
                currentYear: this.state.currentYear + 1,
                currentMonth: 1,
                selectedIndex: null
            });
        }
    }

    selectDateCell = (index, type, date) => {
        if (type === 'present') {
            this.setState({
                selectedIndex: index, 
                currentDate: date,
                currentWeek: Math.floor((date-1)/7)+1,
                currentDay: moment({year: this.state.currentYear, month: this.state.currentMonth-1, date: date}).day()
            }, () => this.onChange());
        }
    }

    DateCells = (props) => {
        const dateCellsOfWeek = props.array.slice((7*props.week), (7*(props.week+1)));
        return (
                <div className='calendar-weekrow'>
                    {dateCellsOfWeek.map((item, index) => {return <div 
                        key={index} 
                        className={`calendar-cell calendar-${item.type}date ${this.state.selectedIndex === ((props.week*7)+index) ? 'selected' : ''}`} 
                        onClick={() => this.selectDateCell((props.week*7)+index, item.type, item.date)}>{item.date}
                    </div>})}
                </div>
            );
    }

    render() {
        const language = (this.props.language === 'ko') ? Language['ko'] : Language['en'];
        const dateCellsArray = this.getDateCellsArray();


        return (
            <div className='picker-calendar'>
                <div className='calendar-header'>
                    <div className='header-prevmonth'><IconButton color='inherit' onClick={() => this.goPrevMonth()}><ChevronLeft /></IconButton></div>
                    <div className='header-title'>{(language.language === 'en') ? moment({year: this.state.currentYear, month: this.state.currentMonth-1}).format('MMMM YYYY') : `${this.state.currentYear}${language.year} ${this.state.currentMonth}${language.month}`}</div>
                    <div className='header-nextmonth'><IconButton color='inherit' onClick={() => this.goNextMonth()}><ChevronRight /></IconButton></div>
                </div>
                <div className='calendar-calendar'>
                    <div className='calendar-calendar_header'>
                        {language.shortWeeks.map(item => {return <div key={item} className='calendar-dayrow calendar-cell'>{item}</div>})}
                    </div>
                    <div className='calendar-calendar_content'>
                        <this.DateCells week={0} array={dateCellsArray} />
                        <this.DateCells week={1} array={dateCellsArray} />
                        <this.DateCells week={2} array={dateCellsArray} />
                        <this.DateCells week={3} array={dateCellsArray} />
                        <this.DateCells week={4} array={dateCellsArray} />
                        <this.DateCells week={5} array={dateCellsArray} />
                    </div>
                </div>
            </div>
        );
    }
}