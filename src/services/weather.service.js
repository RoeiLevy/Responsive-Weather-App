import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY

export const getLocationKeyCode = async (location) => {
  try {
    const { data } = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${location}`)
    return data[0].Key
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getWeatherFromGeoLocation = async (lat, lon) => {
  try {
    const { data } = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`)
    return data
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getCurrentWeather = async (key, isMetric = true) => {
  try {
    const { data } = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}&metric=${isMetric}`)
    return data[0]
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const get5DayWeather = async (key, isMetric = true) => {
  try {
    const { data } = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&metric=${isMetric}`)
    return data.DailyForecasts
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getLocationCompletion = async (term) => {
  try {
    const {data} = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${term}`)
    return data
  } catch (error) {
    return Promise.reject(error.message)
  }

}