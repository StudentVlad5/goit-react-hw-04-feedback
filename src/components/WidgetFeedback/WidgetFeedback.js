import {useState} from "react";
import NotificationMessage from '../NoFeedbackMassage/NoFeedbackMassage';
import AddButtons from '../AddButtons/AddButtons';
import Statistics from "components/Statistics/Statistics";
import propTypes from 'prop-types';
import css from "./WidgetFeedback.module.css";

function WidgetFeedback () {
 
const [widgetFeedback, setWidgetFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
});
let [sumOfVoice, setSumOfVoice] = useState(0);
let countOfButton = Object.keys(widgetFeedback);

const totalFeedback = (event) =>{
    let eventName = event.target.name;
    setSumOfVoice(sumOfVoice  => sumOfVoice + 1);
    setWidgetFeedback(widgetFeedback => ({...widgetFeedback, [eventName]: widgetFeedback[eventName] + 1}));
    }

return (
    <div className={css.widgetFeedbackContainer}>
        <AddButtons countOfButton={countOfButton} TotalFeedback = {totalFeedback}/>
        {sumOfVoice>0 && <Statistics  countOfButton={countOfButton}  totalCount={sumOfVoice} widgetFeedback={widgetFeedback}/>}
        {!sumOfVoice && <NotificationMessage/>}          
    </div>
)}

export default WidgetFeedback;


WidgetFeedback.propTypes = {
    widgetFeedback: propTypes.shape({
        good: propTypes.number,
        neutral: propTypes.number,
        bad: propTypes.number,
    }),
    sumOfVoice : propTypes.number
  }