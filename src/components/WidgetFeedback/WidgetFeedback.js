import React, {Component} from "react";
import propTypes from 'prop-types';
import nextId from "react-id-generator";
import Notiflix from 'notiflix';
import NotificationMessage from '../NoFeedbackMassage/NoFeedbackMassage'
import css from "./WidgetFeedback.module.css";


class WidgetFeedback extends Component {
    constructor() {
        super();
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0,
          };
          nextId(); 
    }
checkBgrColor = (item) => {
        if(item === 'good'){return 'green'}
        else if(item === 'neutral'){return 'tomato'}
        else if(item === 'bad'){return 'black'}
        else {return 'red'}
    }

addButtons = () => {
    let countOfButton = Object.keys(this.state);
    return countOfButton.map(item => 
   <button key={nextId()} name = {item} className = {css.pressBtn} style={{
    backgroundColor: this.checkBgrColor(item),
   }} onClick={(event)=>{this.FeedbackCounter(event);this.cloneTotalFeedback(event); this.countFeedback(this.clone)}} >{item[0].toUpperCase()+item.slice(1,item.length)}</button>);  
}

statistics = () => {
    let countOfButton = Object.keys(this.state);
    return  countOfButton.map(item =>   
    <span className={css.statValue}style={{fontSize : "24px"}} key={nextId()}>{item[0].toUpperCase()+item.slice(1,item.length)} : {this.state[item]}</span>);  
}

cloneTotalFeedback = (event) =>{
     let eventName = event.target.name;
     this.clone = {};
     for (let key in this.state) {
        this.clone[key] = this.state[key];
      }
        if(eventName === 'good'){ this.clone.good = this.clone.good + 1}
        else if (eventName === 'neutral'){this.clone.neutral = this.clone.neutral + 1}
        else if (eventName === 'bad'){this.clone.bad = this.clone.bad + 1};
    return this.clone
}

countFeedback = () =>{
    this.sumOfVoice = 0;
    for (let key in this.clone) {
        this.sumOfVoice += this.clone[key];
      }
let  totalCount = `Total Voices: `+ this.sumOfVoice;
 return <div className={css.countFeedbackContainer}>{totalCount}</div>
}

countPositiveFeedbackPercentage = () =>{
    if(this.sumOfVoice>0)
    return <div className={css.countFeedbackContainer}>Positive Feedback: {Math.round(this.state.good/this.sumOfVoice*100)}%</div>
}

FeedbackCounter = (event) =>{
    let eventName = event.target.name;
    if(eventName === 'good'){
        Notiflix.Notify.success('So happy your high rating');
        return this.setState((prevStay)=>{
        return {good : prevStay.good + 1}})}
    else if (eventName === 'neutral'){
        Notiflix.Notify.warning('Promise to get better');
        return this.setState((prevStay)=>{
        return {neutral : prevStay.neutral + 1}})}   
    else if (eventName === 'bad'){
        Notiflix.Notify.failure('We apologize for the inconvenience')
        return this.setState((prevStay)=>{
        return {bad : prevStay.bad + 1}})};
    }

render()
{return (
    <div className={css.widgetFeedbackContainer} key={this.htmlId}>
        <div className={css.countContainer}>
            Please leave feedback: <div className={css.btnContainer}> {this.addButtons()}</div>
        </div>
        <div className={css.statisticContainer}> Statistics:  {this.statistics()}</div> 
        {!this.sumOfVoice && <NotificationMessage/>}          
        {this.sumOfVoice>0 && this.countFeedback()} 
        {this.countPositiveFeedbackPercentage()}
    </div>
)}
}

export default WidgetFeedback;

WidgetFeedback.propTypes = {
    state: propTypes.arrayOf(
        propTypes.number
    )
  }