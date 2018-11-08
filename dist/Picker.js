import _inheritsLoose from '@babel/runtime/helpers/inheritsLoose';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React from 'react';
import { Tabs, Tab, Button } from '@material-ui/core';
import { CheckCircleOutline, Today, AccessTime } from '@material-ui/icons';
import Calendar from './Calendar.js';
import TimePicker from './TimePicker.js';
import Language from '../public/Language.js';
import '../public/Picker.css';

var moment = require('moment');

var Picker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Picker, _React$Component);

  function Picker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTabChange", function (value) {
      _this.setState({
        tab: value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onValueChange", function (isDate, value) {
      if (isDate) {
        _this.setState({
          date: value
        });
      } else {
        _this.setState({
          time: value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSave", function () {
      if (_this.props.onSave !== undefined) {
        _this.props.onSave(_this.state.date, _this.state.time);
      } else {
        console.log({
          date: _this.state.date,
          time: _this.state.time
        });
      }
    });

    _this.state = {
      tab: 0,
      date: {
        year: moment().year(),
        month: moment().month() + 1,
        date: moment().date(),
        week: Math.floor((moment().date() - 1) / 7) + 1,
        day: moment().day()
      },
      time: {
        hour: moment().hour(),
        minute: moment().minute(),
        second: moment().second()
      }
    };
    _this.onTabChange = _this.onTabChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onValueChange = _this.onValueChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Picker.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var language = this.props.language === 'ko' ? Language['ko'] : Language['en'];
    return React.createElement("div", {
      className: "picker"
    }, React.createElement("div", {
      className: "picker-tab"
    }, React.createElement(Tabs, {
      value: this.state.tab,
      onChange: function onChange(event, value) {
        return _this2.onTabChange(value);
      },
      fullWidth: true,
      textColor: "inherit",
      classes: {
        indicator: 'picker-tab-indicator'
      }
    }, React.createElement(Tab, {
      label: language.date,
      icon: React.createElement(Today, null),
      classes: {
        selected: 'selected'
      }
    }), React.createElement(Tab, {
      label: language.time,
      icon: React.createElement(AccessTime, null),
      classes: {
        selected: 'selected'
      }
    }))), React.createElement("div", {
      className: "picker-form"
    }, this.state.tab === 0 ? React.createElement(Calendar, {
      language: this.props.language,
      defaultValue: this.state.date,
      onChange: function onChange(time) {
        return _this2.onValueChange(true, time);
      }
    }) : React.createElement(TimePicker, {
      language: this.props.language,
      enableSecond: this.props.enableSecond !== undefined ? this.props.enableSecond : false,
      defaultValue: this.state.time,
      onChange: function onChange(date) {
        return _this2.onValueChange(false, date);
      }
    })), React.createElement("div", {
      className: "picker-footer"
    }, React.createElement("div", {
      onClick: function onClick() {
        return _this2.onSave();
      }
    }, React.createElement(Button, {
      fullWidth: true
    }, React.createElement(CheckCircleOutline, null), language.save))));
  };

  return Picker;
}(React.Component);

export default Picker;
