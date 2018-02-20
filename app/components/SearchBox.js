import React from 'react';
import PropTypes from 'prop-types';

export default class SearchBox extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCityInputChange = this.onCityInputChange.bind(this);
        this.state = {city:''};
    }

    onCityInputChange(event){
        const value = event.target.value;
        this.setState( ()=>{
            return {city: value};
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmitCity(this.state.city);
    }

    render(){
        return (
            <form className='search-box' onSubmit={this.handleSubmit}>
                <input id='search-input'
                       placeholder='City name'
                       value={this.state.city} 
                       onChange={this.onCityInputChange}
                       autoComplete='off'
                       autoFocus/>
                <button type='submit'
                        disabled={!this.state.city}>Search</button>
            </form>
        );
    }
}

SearchBox.propTypes = {
    onSubmitCity:PropTypes.func.isRequired
};