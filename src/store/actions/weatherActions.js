export const setFavorites = (favorites) => {
  return ({ type: 'SET_FAVORITES', favorites })
}
export const setIsDarkMode = (isDarkMode) => {
  return ({ type: 'SET_IS_DARK_MODE', isDarkMode })
}
export const setIsCelsius = (isCelsius) => {
  return ({ type: 'SET_IS_CELSIUS', isCelsius })
}
export const setCurrWeather = (currWeather) => {
  return ({ type: 'SET_CURR_WEATHER', currWeather })
}
export const setDailyForecasts = (dailyForecasts) => {
  return ({ type: 'SET_DAILY_FORECASTS', dailyForecasts })
}