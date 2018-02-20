import React from 'react';
import PropTypes from 'prop-types';

export default class LocationList extends React.Component{
    render(){
        return (
            <div>
                <table className='location-list-table'>
                    <tbody>
                        <tr>
                            <td className='location-current-weather-column'>
                                <img src='https://openweathermap.org/img/w/04n.png'/>
                            </td>
                            <td>
                                <div >
                                    London, UK
                                    23C
                                </div>
                            </td>
                            <td>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}