# react-datetime-slider-picker

React datetime picker component

## Overview

This component received a motif from [input-moment](https://github.com/wangzuo/input-moment)

The design is from https://dribbble.com/shots/1439965-Due-Date-and-Time-Picker.

![screenshot](https://user-images.githubusercontent.com/30774607/48204754-ec69bc80-e3ad-11e8-8542-a1e04e824fdb.png)

## Installation

```
npm install react-datetime-slider-picker
```

## Example

1. 
```
npm run example
```

2. Connect to localhost:8080

## Usage

```
import React from 'react';
import Picker from 'react-datetime-slider-picker';

export default class App extends React.Component {
  onSave = (date, time) => {
    console.log({date: date, time: time});
  }
  
  render() {
    return (
      <div>
        <Picker onSave={(date, time) => this.onSave(date,time) enableSecond />}
      </div>
    );
  }
}
```
## Props

| Props  |  Type  |    Default    | Description |
| ------ | ------ |------------- | ----------- |
| onSave | Function(date, time) | console.log | Callback date and time data when Save button is clicked |
| enableSecond | Boolean | false | Enable 'Seconds' slider in timepicker |
| language | String | en | Display language (en, ko supported) |

## Response Data

### Date

```
date: {
  year: 2018, month: 11, date: 28, week: 4, day: 3
}
```
- year: year value
    - Year of 2018: 2018
- month: month of year
    - Janurary: 1, December: 12
- date: date of month
    - 1st: 1, 31st: 31
- week: week of month
    - 1st of every month: 1, 8th of every month: 2, 2018-12-25: 4

### Time

```
time: {
  hour: 22, minute: 44, second: 34
}
```

- hour: value of hours (0 ~ 23)
- minute: value of minutes (0 ~ 59)
- second : value of second (0 ~ 59)

If 'enableSecond' props is undefined or 'false', Picker don't give 'second' value.

## License

This component is released under the MIT License.
