import _inheritsLoose from '@babel/runtime/helpers/inheritsLoose';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React from 'react';
import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import Language from '../public/Language.js';
import '../public/Calendar.css';

var moment = require('moment');

var Calendar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Calendar, _React$Component);

  function Calendar(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function () {
      _this.props.onChange({
        year: _this.state.currentYear,
        month: _this.state.currentMonth,
        date: _this.state.currentDate,
        week: _this.state.currentWeek,
        day: _this.state.currentDay
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDateCellsArray", function () {
      var dateCells = [];

      var daysInLastMonth = _this.getDaysInLastMonth(_this.state.currentYear, _this.state.currentMonth);

      var daysInThisMonth = _this.getDaysInThisMonth(_this.state.currentYear, _this.state.currentMonth);

      var firstDate = daysInLastMonth - _this.getDayOfFirstDate(_this.state.currentYear, _this.state.currentMonth) + 1;

      for (var date = firstDate; date <= daysInLastMonth; date++) {
        dateCells.push({
          date: date,
          type: 'prev'
        });
      }

      for (var _date = 1; _date <= daysInThisMonth; _date++) {
        dateCells.push({
          date: _date,
          type: 'present'
        });
      } // 42 = 7(days of week) + 6(weeks)


      var nextDaysLength = 42 - dateCells.length;

      for (var _date2 = 1; _date2 <= nextDaysLength; _date2++) {
        dateCells.push({
          date: _date2,
          type: 'next'
        });
      }

      return dateCells;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDayOfFirstDate", function (year, month) {
      return moment({
        year: year,
        month: month - 1,
        date: 1
      }).day();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDaysInThisMonth", function (year, month) {
      return moment({
        year: year,
        month: month - 1
      }).daysInMonth();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDaysInLastMonth", function (year, month) {
      if (month > 1) {
        return moment({
          year: year,
          month: month - 2
        }).daysInMonth();
      } else {
        return moment({
          year: year - 1,
          month: 11
        }).daysInMonth();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "goPrevMonth", function () {
      if (_this.state.currentMonth > 1) {
        _this.setState({
          currentMonth: _this.state.currentMonth - 1,
          selectedIndex: null
        });
      } else {
        _this.setState({
          currentYear: _this.state.currentYear - 1,
          currentMonth: 12,
          selectedIndex: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "goNextMonth", function () {
      if (_this.state.currentMonth < 12) {
        _this.setState({
          currentMonth: _this.state.currentMonth + 1,
          selectedIndex: null
        });
      } else {
        _this.setState({
          currentYear: _this.state.currentYear + 1,
          currentMonth: 1,
          selectedIndex: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectDateCell", function (index, type, date) {
      if (type === 'present') {
        _this.setState({
          selectedIndex: index,
          currentDate: date,
          currentWeek: Math.floor((date - 1) / 7) + 1,
          currentDay: moment({
            year: _this.state.currentYear,
            month: _this.state.currentMonth - 1,
            date: date
          }).day()
        }, function () {
          return _this.onChange();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "DateCells", function (props) {
      var dateCellsOfWeek = props.array.slice(7 * props.week, 7 * (props.week + 1));
      return React.createElement("div", {
        className: "calendar-weekrow"
      }, dateCellsOfWeek.map(function (item, index) {
        return React.createElement("div", {
          key: index,
          className: "calendar-cell calendar-" + item.type + "date " + (_this.state.selectedIndex === props.week * 7 + index ? 'selected' : ''),
          onClick: function onClick() {
            return _this.selectDateCell(props.week * 7 + index, item.type, item.date);
          }
        }, item.date);
      }));
    });

    _this.state = {
      currentYear: _this.props.defaultValue.year,
      currentMonth: _this.props.defaultValue.month,
      currentDate: _this.props.defaultValue.date,
      currentWeek: _this.props.defaultValue.week,
      currentDay: _this.props.defaultValue.day,
      selectedIndex: null
    };
    _this.goPrevmonth = _this.goPrevMonth.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.goNextmonth = _this.goNextMonth.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Calendar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.setState({
      selectedIndex: this.getDayOfFirstDate(this.state.currentYear, this.state.currentMonth) + this.state.currentDate - 1
    }, function () {
      _this2.onChange();
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    var language = this.props.language === 'ko' ? Language['ko'] : Language['en'];
    var dateCellsArray = this.getDateCellsArray();
    return React.createElement("div", {
      className: "picker-calendar"
    }, React.createElement("div", {
      className: "calendar-header"
    }, React.createElement("div", {
      className: "header-prevmonth"
    }, React.createElement(IconButton, {
      color: "inherit",
      onClick: function onClick() {
        return _this3.goPrevMonth();
      }
    }, React.createElement(ChevronLeft, null))), React.createElement("div", {
      className: "header-title"
    }, language.language === 'en' ? moment({
      year: this.state.currentYear,
      month: this.state.currentMonth - 1
    }).format('MMMM YYYY') : "" + this.state.currentYear + language.year + " " + this.state.currentMonth + language.month), React.createElement("div", {
      className: "header-nextmonth"
    }, React.createElement(IconButton, {
      color: "inherit",
      onClick: function onClick() {
        return _this3.goNextMonth();
      }
    }, React.createElement(ChevronRight, null)))), React.createElement("div", {
      className: "calendar-calendar"
    }, React.createElement("div", {
      className: "calendar-calendar_header"
    }, language.shortWeeks.map(function (item) {
      return React.createElement("div", {
        key: item,
        className: "calendar-dayrow calendar-cell"
      }, item);
    })), React.createElement("div", {
      className: "calendar-calendar_content"
    }, React.createElement(this.DateCells, {
      week: 0,
      array: dateCellsArray
    }), React.createElement(this.DateCells, {
      week: 1,
      array: dateCellsArray
    }), React.createElement(this.DateCells, {
      week: 2,
      array: dateCellsArray
    }), React.createElement(this.DateCells, {
      week: 3,
      array: dateCellsArray
    }), React.createElement(this.DateCells, {
      week: 4,
      array: dateCellsArray
    }), React.createElement(this.DateCells, {
      week: 5,
      array: dateCellsArray
    }))));
  };

  return Calendar;
}(React.Component);

export default Calendar;
