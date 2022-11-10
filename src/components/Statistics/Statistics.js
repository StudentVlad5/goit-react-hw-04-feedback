import nextId from "react-id-generator";
import propTypes from 'prop-types';
import css from './Statistics.module.css';

const Statistics =({countOfButton, widgetFeedback, totalCount})=>{
    return (
        <><div className={css.statisticContainer}>Statistics : 
            {countOfButton.map(item => 
            <span className={css.statValue} key={nextId()}>{item[0].toUpperCase()+item.slice(1,item.length)} : {widgetFeedback[item]}</span>)      
            }        
         </div>
         <div className={css.countFeedbackContainer}>`Total Voices: {totalCount}</div>
         <div className={css.countFeedbackContainer}>Positive Feedback: {Math.round((((widgetFeedback.good + widgetFeedback.neutral / 2)/totalCount)).toFixed(2)*100)}%</div>
         </>
    )
}


export default Statistics;

Statistics.propTypes = {
    countOfButton: propTypes.arrayOf(
        propTypes.string),
    widgetFeedback: propTypes.object,
    totalCount: propTypes.number
  }