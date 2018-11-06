import React from 'react';
import { Slider } from '@material-ui/lab';

import './TimePicker.css';

export default class TimePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentHour: this.props.defaultValue.hour,
            currentMinute: this.props.defaultValue.minute,
            currentSecond: this.props.defaultValue.second
        }
    }

    formatting = (value) => {
        return (value >= 10) ? value : `0${value}`;
    }

    onChange = () => {
        if (this.props.enableSecond !== undefined && this.props.enableSecond) {
            this.props.onChange({hour: this.state.currentHour, minute: this.state.currentMinute, second: this.state.currentSecond});
        } else {
            this.props.onChange({hour: this.state.currentHour, minute: this.state.currentMinute});
        }
    }

    onChangeHour = (event, value) => {
        this.setState({currentHour: value}, () => {this.onChange()});
    }

    onChangeMinute = (event, value) => {
        this.setState({currentMinute: value}, () => {this.onChange()});
    }

    onChangeSecond = (event, value) => {
        this.setState({currentSecond: value}, () => {this.onChange()});
    }

    render() {
        return (
            <div className='picker-timepicker'>
                <div className='timepicker-header'>
                    <div className='header-displaytime'>
                        {`${this.formatting(this.state.currentHour)} : ${this.formatting(this.state.currentMinute)}
                        ${(this.props.enableSecond !== undefined&& this.props.enableSecond) ? ` : ${this.formatting(this.state.currentSecond)}` : ''}`}
                    </div>
                </div>
                <div className='timepicker-slider'>
                    <div className='slider-hourslider'>
                        <div className='slider-label'>Hour</div>
                        <Slider
                            max={23}
                            step={1}
                            onChange={this.onChangeHour}
                            value={this.state.currentHour}
                            classes={{track: 'track', trackBefore: 'trackbefore', trackAfter: 'trackafter', thumb: 'thumb'}}
                        />
                    </div>
                    <div className='slider-minuteslider'>
                        <div className='slider-label'>Minute</div>
                        <Slider
                            max={59}
                            step={1}
                            onChange={this.onChangeMinute}
                            value={this.state.currentMinute}
                            classes={{track: 'track', trackBefore: 'trackbefore', trackAfter: 'trackafter', thumb: 'thumb'}}
                        />
                    </div>
                    {(this.props.enableSecond !== undefined && this.props.enableSecond) ?
                    <div className='slider-secondslider'>
                        <div className='slider-label'>Second</div>
                        <Slider
                            max={59}
                            step={1}
                            onChange={this.onChangeSecond}
                            value={this.state.currentSecond}
                            classes={{track: 'track', trackBefore: 'trackbefore', trackAfter: 'trackafter', thumb: 'thumb'}}
                        />
                    </div>
                    : ''}
                </div>
            </div>
        );
    }
}