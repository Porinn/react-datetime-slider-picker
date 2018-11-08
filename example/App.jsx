import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Picker from '../dist/Picker.js';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.onSave = this.onSave.bind(this);
    }

    onSave = (date, time) => {
        this.setState({date: date, time: time}, () => {
            console.log({date, time});
        })
    }

    render() {
        return (
            <div>
                <div id='calendar'>
                    <div>
                        <h3>Normal</h3>
                        <Picker onSave={(date, time) => this.onSave(date, time)} />
                    </div>
                    <div>
                        <h3>enableSecond</h3>
                        <Picker enableSecond onSave={(date, time) => this.onSave(date, time)} />
                    </div>
                    <div>
                        <h3>language='ko'</h3>
                        <Picker language='ko' onSave={(date, time) => this.onSave(date, time)} />
                    </div>
                </div>
                <div id='result'>
                    <div id='date'>{(this.state.date !== undefined) ? `date: ${JSON.stringify(this.state.date)}` : ''}</div>
                    <div id='time'>{(this.state.time !== undefined) ? `time: ${JSON.stringify(this.state.time)}` : ''}</div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('App'));