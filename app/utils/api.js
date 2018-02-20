import axios from 'axios';

const api_id = '780971573a6c7b605ed3825c5845f676';

const getFullUnit = (unitCode) => {
    const unit = (unitCode === 'C') ? 'metric' : 'imperial';
    return "&units="+unit;
}

const getCurrentForecast = (city, unit) =>{
    let requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                        city  + getFullUnit(unit) +'&APPID='+api_id;
    return axios.get(requestURL).then((obj)=>{
        return obj.data;
    });
}

const getExtendedForecast = (city, unit) => {     
    let requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' +
                        city + getFullUnit(unit) +
                        '&APPID='+api_id;
    return axios.get(requestURL).then((obj)=>{
        return obj.data;
    })

} 

export const getWeatherForecast = (city, unit) =>{
    return axios.all([
                getCurrentForecast(city, unit), 
                getExtendedForecast(city, unit)
             ]
        ).then((response)=>{
            return {
                current: response[0],
                extended: response[1]
            };              
        }
    );
}