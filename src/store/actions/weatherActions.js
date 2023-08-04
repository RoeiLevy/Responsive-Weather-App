export function setFavorites(favorites) {
  return async dispatch => {
    dispatch({ type: 'SET_FAVORITES', favorites })
  }
}
export function setIsDarkMode(isDarkMode) {
  return async dispatch => {
    dispatch({ type: 'SET_IS_DARK_MODE', isDarkMode })
  }
}
export function setIsCelsius(isCelsius) {
  return async dispatch => {
    dispatch({ type: 'SET_IS_CELSIUS', isCelsius })
  }
}
export function setCurrWeather(currWeather) {
  return async dispatch => {
    dispatch({ type: 'SET_CURR_WEATHER', currWeather })
  }
}
export function setDailyForecasts(dailyForecasts) {
  return async dispatch => {
    dispatch({ type: 'SET_DAILY_FORECASTS', dailyForecasts })
  }
}