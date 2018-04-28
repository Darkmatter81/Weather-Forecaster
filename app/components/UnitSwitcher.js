import React from 'react';
import PropTypes from 'prop-types';


export default class UnitSwitcher extends React.Component{
    constructor(props){
        super(props);
        this.onUnitChanged = this.onUnitChanged.bind(this);
    }

    componentDidMount(){
        const unit = this.props.unit === 'C' ? 'metric' : 'imperial';
        document.getElementById(unit).checked = true;
    }
    
    onUnitChanged(event){
        this.props.onUnitChanged (event.target.value);
    }
   
    render(){
        return (
            <div className='unit-switcher'>
                <form action="">
                    <input id ='metric' type="radio"
                           name="unit" value="C"
                           onChange={this.onUnitChanged}/> 
                    <span>°C</span>
                    <input id ='imperial' type="radio" 
                           name="unit" value="F"
                           onChange={this.onUnitChanged}/>
                    <span>°F</span>
                </form>
            </div>
        );
    }
}

UnitSwitcher.defaultProps = {
    unit: 'C'
}

UnitSwitcher.propTypes = {
    unit: PropTypes.string.isRequired,
    onUnitChanged:PropTypes.func.isRequired
};
