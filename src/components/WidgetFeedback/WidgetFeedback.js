import {useState} from "react";
import nextId from "react-id-generator";
import Notiflix from 'notiflix';
import NotificationMessage from '../NoFeedbackMassage/NoFeedbackMassage'
import css from "./WidgetFeedback.module.css";

function WidgetFeedback () {
 
const [widgetFeedback, setWidgetFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
});
let [sumOfVoice, setSumOfVoice] = useState(0);


function checkBgrColor  (item) {
        if(item === 'good'){return 'green'}
        else if(item === 'neutral'){return 'tomato'}
        else if(item === 'bad'){return 'black'}
        else {return 'red'}
    }

function statistics () { 
    return(
    Object.keys(widgetFeedback).map((key)=>
     <span className={css.statValue}style={{fontSize : "24px"}} key={key}>{key[0].toUpperCase()+key.slice(1,key.length)} : {widgetFeedback[key]}</span>
))}

function countPositiveFeedbackPercentage  () {
    if(sumOfVoice>0)
    return (<div>
    <div className={css.countFeedbackContainer}>Total Voices: + {sumOfVoice}</div>
    <div className={css.countFeedbackContainer}>Positive Feedback: {Math.round(widgetFeedback.good/sumOfVoice*100)}%</div>
    </div>)
}

function FeedbackCounter (event) {
    let eventName = event.target.name;    
    if(eventName === 'good'){
     Notiflix.Notify.success('So happy your high rating');
     setWidgetFeedback(widgetFeedback => ({...widgetFeedback,'good': widgetFeedback.good +1}));
    }
    else if (eventName === 'neutral'){
        Notiflix.Notify.warning('Promise to get better');
        setWidgetFeedback(widgetFeedback => ({...widgetFeedback, 'neutral': widgetFeedback.neutral +1}));
    }
    else if (eventName === 'bad'){
        Notiflix.Notify.failure('We apologize for the inconvenience')
        setWidgetFeedback(widgetFeedback => ({...widgetFeedback, 'bad': widgetFeedback.bad +1}))
    }
    setSumOfVoice(sumOfVoice  => sumOfVoice + 1);
}

function addButtons () { return (
    Object.keys(widgetFeedback).map((key)=>
    <button key={nextId()} name = {key} className = {css.pressBtn} style={{
    backgroundColor: checkBgrColor(key),
   }} onClick={(event)=>{FeedbackCounter(event)}}>{key[0].toUpperCase()+key.slice(1,key.length)}</button>)  
)}

return (
    <div className={css.widgetFeedbackContainer}>
        <div className={css.countContainer}>
            Please leave feedback: <div className={css.btnContainer}> {addButtons()}</div>
        </div>
        <div className={css.statisticContainer}> Statistics:  {statistics()}</div> 
        {sumOfVoice === 0 && <NotificationMessage/>}          
        {countPositiveFeedbackPercentage()}
    </div>
)}

export default WidgetFeedback;

