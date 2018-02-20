import React from 'react';
import PropTypes from 'prop-types';
import Outlook from './Outlook';
import * as api from '../utils/api';
import LocationList from './LocationList';
import UnitSwitcher from './UnitSwitcher';
import Loading from './Loading';
import SearchBox from './SearchBox';


export default class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {city: 'London',
                      unit: 'C',
                      current: null,
                      extended: null,
                      loading: false,
                      error: false
                    };

        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.onUnitChanged = this.onUnitChanged.bind(this);
    }

    handleSearchSubmit(city){
        this.setState({city}, this.updateCurrentWeather);
    }

    onUnitChanged(unit){
        this.setState({unit}, this.updateCurrentWeather);
    }

    updateCurrentWeather(){
         this.setState(()=>{
            return {
                 loading: true,
                 error: false,
                 current: null,
                 extended: null
            }
         });
         
        api.getWeatherForecast(this.state.city, this.state.unit)
            .then((response)=>{
                    this.setState(()=>{
                        return {
                            current: response.current,
                            extended: response.extended,
                            loading: false
                       };
                    })
                }
            )
            .catch((error)=>{
                this.setState(()=>{
                    return {error: true, loading:false};
                })
            });
    }

    render(){
        return(
            <div className='container'>
                <div className='content'>
                    <SearchBox onSubmitCity = {this.handleSearchSubmit}/>
                    
                    {this.state.current && this.state.extended &&
                         <UnitSwitcher unit={this.state.unit} onUnitChanged={this.onUnitChanged}/>
                    }
                    {this.state.current && this.state.extended &&
                        <Outlook current={this.state.current} daily={this.state.extended} unit={this.state.unit}/>
                    }
                    {this.state.loading &&
                        <Loading />
                    }

                    {this.state.error && 
                        <p style={{textAlign:'center'}}>There was an error getting forecast for {this.state.city}. Make sure the city is valid</p>
                    }
                 </div>
            </div>
        );
    }
}
