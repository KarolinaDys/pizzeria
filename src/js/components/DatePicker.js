import { utils } from '../utils';
import { select, settings } from '../settings';
import flatpickr from 'flatpickr';
import BaseWidget from './BaseWidget.js';

class DatePicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date));
    const thisWidget = this;
    thisWidget.dom.input = thisWidget.dom.wrapper.quertySelector(select.widgets.datePicker.input);
    thisWidget.initPlugin();
  }
  initPlugin() {
    const thisWidget = this;
    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);
    flatpickr(thisWidget.dom.input, {
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      disable: [
        function(date) {
          return (date.getDay() === 1 || date.getDay() === 6);
        }
      ],
      locale: {
        firstDayOfWeek: 1
      },
      onChange: function(selectedDates, dateStr) {
        thisWidget.value = dateStr;
        console.log('selecteddates:', selectedDates);
      }
    });
  }
  parseValue(newValue){
    return newValue;
  }
  isValid(){
    return true;
  }
  renderValue(){}  
}
export default DatePicker;