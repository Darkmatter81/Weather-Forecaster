import React from 'react';
import PropTypes from 'prop-types';
import UnitSwitcher from './UnitSwitcher';
import CurrentCondition from './CurrentCondition';
import DailyForecast from './DailyForecast';


export default class Outlook extends React.Component{
    render(){
        return (
            <div className='weather-outlook'>
                <div className='row'>
                    <CurrentCondition className='column'
                        forecast={this.props.current} unit={this.props.unit}/>
                    <DailyForecast className='column'
                        forecast={this.props.daily} unit={this.props.unit}/>
                </div>
            </div>
        );
    }
}

Outlook.propTypes = {
    current:PropTypes.object.isRequired,
    daily:PropTypes.object.isRequired,
    unit:PropTypes.string.isRequired
};