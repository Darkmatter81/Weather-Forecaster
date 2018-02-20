import React from 'react';
import PropTypes from 'prop-types';

export default class DailyForecast extends React.Component{
   
    dateIsToday(date){
        const today = new Date();
        return date.getFullYear() == today.getFullYear() &&
               date.getDay() == today.getDay() &&
               date.getMonth() == today.getMonth();
    }

    getDay(date){
        const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = new Date(date);

        let dateString = days[day.getUTCDay()] + " "+ day.getDate() + " " + months[day.getUTCMonth()];

        if (this.dateIsToday(day)){
            dateString += " - Today";
        }

        return dateString;
    }

    getFormattedTime(dt_txt){
        return dt_txt.split(' ')[1].substring(0,5);
    }
    
    groupDayForecasts(items){
        const dayGroup = {};
        let currentDay = null;

        for (let i=0; i<items.length; i++){
            let day = items[i].dt_txt.split(' ')[0];
            // Create new group for all forecasts within
            // the same day
            if (currentDay !== day){
                currentDay = day;
                dayGroup [day] = new Array();
            }
            
            dayGroup[day].push(items[i]);
        }

        return dayGroup;
    }

    render(){
        const days = this.groupDayForecasts(this.props.forecast.list);

        return(
            <div className='daily-forecast'>
                <h2>Daily hourly forecast for {this.props.forecast.city.name}, {this.props.forecast.city.country}</h2>

                <table className='day-forecast-table'>
                    {Object.keys(days).map((forecastItem)=>{
                        return(
                            <tbody key={forecastItem}>
                                <tr>
                                    <th colSpan='4'>
                                        {this.getDay(forecastItem)}
                                    </th>
                                </tr>

                                {days[forecastItem].map((item)=>{
                                   return(
                                        <tr key={item.dt}>
                                            <td>
                                                <img src={'https://openweathermap.org/img/w/' +
                                                    item.weather[0].icon + '.png'} />
                                            </td>
                                        
                                            <td>
                                                {this.getFormattedTime(item.dt_txt)}
                                            </td>
                                            <td className='forecast-description'>
                                                {item.weather[0].description}
                                            </td>
                                        
                                            <td className='forecast-details'>
                                                <p className='forecast-temp'>{Math.floor(item.main.temp)} °{this.props.unit}</p>
                                                <p> {item.wind.speed}mph  clouds: {item.clouds.all}%  {item.main.pressure} hpa
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })}
                             </tbody>
                        )})}
                </table>
            </div>
        );
    }
}

DailyForecast.propTypes = {
    forecast:PropTypes.object.isRequired,
    unit:PropTypes.string.isRequired
};