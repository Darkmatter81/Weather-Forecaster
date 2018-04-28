import React from 'react';
import PropTypes from 'prop-types';
import UnitSwitcher from './UnitSwitcher';
import CurrentCondition from './CurrentCondition';
import DailyForecast from './DailyForecast';

export default class Outlook extends React.Component{
    render(){
        return (
            <div className='row justify-content-center'>
                <div className='col-12 col-sm-8 col-md-4'>
                    <CurrentCondition
                        forecast={this.props.current} unit={this.props.unit}/>
                </div>

                <div className='col-12 col-sm-10 col-md-8'>
                    <DailyForecast
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