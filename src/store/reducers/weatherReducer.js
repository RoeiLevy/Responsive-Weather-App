const INITIAL_STATE = {
  favorites: [],
  isDarkMode: false,
  isCelsius: true,
  currWeather: null,
  dailyForecasts: []
}
export function weatherReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.favorites
      }
    case 'SET_IS_DARK_MODE':
      return {
        ...state,
        isDarkMode: action.isDarkMode
      }
    case 'SET_IS_CELSIUS':
      return {
        ...state,
        isCelsius: action.isCelsius
      }
    case 'SET_CURR_WEATHER':
      return {
        ...state,
        currWeather: action.currWeather
      }
    case 'SET_DAILY_FORECASTS':
      return {
        ...state,
        dailyForecasts: action.dailyForecasts
      }

    default:
      return state
  }
}