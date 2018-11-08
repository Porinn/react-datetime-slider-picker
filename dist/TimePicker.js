import _inheritsLoose from '@babel/runtime/helpers/inheritsLoose';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React from 'react';
import { Slider } from '@material-ui/lab';
import Language from '../public/Language.js';
import '../public/TimePicker.css';

var TimePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TimePicker, _React$Component);

  function TimePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "formatting", function (value) {
      return value >= 10 ? value : "0" + value;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function () {
      if (_this.props.enableSecond !== undefined && _this.props.enableSecond) {
        _this.props.onChange({
          hour: _this.state.currentHour,
          minute: _this.state.currentMinute,
          second: _this.state.currentSecond
        });
      } else {
        _this.props.onChange({
          hour: _this.state.currentHour,
          minute: _this.state.currentMinute
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangeHour", function (event, value) {
      _this.setState({
        currentHour: value
      }, function () {
        _this.onChange();
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangeMinute", function (event, value) {
      _this.setState({
        currentMinute: value
      }, function () {
        _this.onChange();
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangeSecond", function (event, value) {
      _this.setState({
        currentSecond: value
      }, function () {
        _this.onChange();
      });
    });

    _this.state = {
      currentHour: _this.props.defaultValue.hour,
      currentMinute: _this.props.defaultValue.minute,
      currentSecond: _this.props.defaultValue.second
    };
    return _this;
  }

  var _proto = TimePicker.prototype;

  _proto.render = function render() {
    var language = this.props.language === 'ko' ? Language['ko'] : Language['en'];
    return React.createElement("div", {
      className: "picker-timepicker"
    }, React.createElement("div", {
      className: "timepicker-header"
    }, React.createElement("div", {
      className: "header-displaytime"
    }, this.formatting(this.state.currentHour) + " : " + this.formatting(this.state.currentMinute) + "\n                        " + (this.props.enableSecond !== undefined && this.props.enableSecond ? " : " + this.formatting(this.state.currentSecond) : ''))), React.createElement("div", {
      className: "timepicker-slider"
    }, React.createElement("div", {
      className: "slider-hourslider"
    }, React.createElement("div", {
      className: "slider-label"
    }, language.hours), React.createElement(Slider, {
      max: 23,
      step: 1,
      onChange: this.onChangeHour,
      value: this.state.currentHour,
      classes: {
        track: 'track',
        trackBefore: 'trackbefore',
        trackAfter: 'trackafter',
        thumb: 'thumb'
      }
    })), React.createElement("div", {
      className: "slider-minuteslider"
    }, React.createElement("div", {
      className: "slider-label"
    }, language.minutes), React.createElement(Slider, {
      max: 59,
      step: 1,
      onChange: this.onChangeMinute,
      value: this.state.currentMinute,
      classes: {
        track: 'track',
        trackBefore: 'trackbefore',
        trackAfter: 'trackafter',
        thumb: 'thumb'
      }
    })), this.props.enableSecond !== undefined && this.props.enableSecond ? React.createElement("div", {
      className: "slider-secondslider"
    }, React.createElement("div", {
      className: "slider-label"
    }, language.seconds), React.createElement(Slider, {
      max: 59,
      step: 1,
      onChange: this.onChangeSecond,
      value: this.state.currentSecond,
      classes: {
        track: 'track',
        trackBefore: 'trackbefore',
        trackAfter: 'trackafter',
        thumb: 'thumb'
      }
    })) : ''));
  };

  return TimePicker;
}(React.Component);

export default TimePicker;
