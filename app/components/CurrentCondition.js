import React from 'react';
import PropTypes  from 'prop-types';

export default class CurrentCondition extends React.Component{
    getFormattedTime(dt){
        const date = (dt===undefined) ? new Date() : new Date(dt * 1000);
        return date.toTimeString().substring(0,5);
    }

    getCurrentDate(){
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const now = new Date();
        return months [ now.getUTCMonth() ] + " " + now.getUTCDate() ;
    }

    formatDescription(text){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    
    render(){
        const forecast = this.props.forecast;

        return(
            <div className='current-condition'>
               
                <h2>Weather in {forecast.name}, {forecast.sys.country}</h2>

                <div className='current-temperature'>
                    <img src={'https://openweathermap.org/img/w/' + 
                        forecast.weather[0].icon + '.png'}/>
                    <p>{Math.floor(forecast.main.temp)} °{this.props.unit}</p>
                </div>

                <p> {this.formatDescription(forecast.weather[0].description)} </p>
                <p> {this.getFormattedTime()} {this.getCurrentDate()}</p>
                <table className='current-conditions-details'>
                    <tbody>
                         <tr>
                            <td>Low</td>
                            <td>{forecast.main.temp_min}°{this.props.unit}</td>
                        </tr>
                        <tr>
                            <td>High</td>
                            <td>{forecast.main.temp_max}°{this.props.unit}</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{forecast.main.humidity}%</td>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td>{forecast.main.pressure} hpa</td>
                        </tr>
                        <tr>
                            <td>Sunrise</td>
                            <td>{this.getFormattedTime(forecast.sys.sunrise)}</td>
                        </tr>
                        <tr>
                            <td>Sunset</td>
                            <td>{this.getFormattedTime(forecast.sys.sunset)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

CurrentCondition.propTypes = {
    forecast: PropTypes.object.isRequired,
    unit:PropTypes.string.isRequired
};