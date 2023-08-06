// const API_KEY = process.env.REACT_APP_API_KEY
// const API_URL = process.env.REACT_APP_API_URL

// export const getLocationKeyCode = async (location) => {
//   try {
//     const url = `${API_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${location}`
//     return new Promise((resolve, reject) => {
//       loadJSONP(url, (data) => {
//         resolve(data[0].Key)
//       });
//     })
//   } catch (error) {
//     return Promise.reject(error.message)
//   }
// }

// export const getWeatherFromGeoLocation = async (lat, lon) => {
//   try {
//     const url = `${API_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`
//     return new Promise((resolve, reject) => {
//       loadJSONP(url, (data) => {
//         resolve(data)
//       });
//     })
//   } catch (error) {
//     return Promise.reject(error.message)
//   }
// }

// export const getCurrentWeather = async (key, isMetric = true) => {
//   try {
//     const url = `${API_URL}/currentconditions/v1/${key}?apikey=${API_KEY}&metric=${isMetric}`
//     return new Promise((resolve, reject) => {
//       loadJSONP(url, (data) => {
//         resolve(data[0])
//       });
//     })
//   } catch (error) {
//     return Promise.reject(error.message)
//   }
// }

// export const get5DayWeather = async (key, isMetric = true) => {
//   try {
//     const url = `${API_URL}/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&metric=${isMetric}`
//     return new Promise((resolve, reject) => {
//       loadJSONP(url, (data) => {
//         resolve(data.DailyForecasts)
//       });
//     })
//   } catch (error) {
//     return Promise.reject(error.message)
//   }
// }

// export const getLocationCompletion = async (term) => {
//   try {
//     const url = `${API_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${term}`
//     return new Promise((resolve, reject) => {
//       loadJSONP(url, (data) => {
//         resolve(data)
//       });
//     })
//   } catch (error) {
//     return Promise.reject(error.message)
//   }

// }

// // When deployed the request encountered with CORS error.
// // Adding headers didn't solved the problem and because i have no control on the API i used this solution.
// // Also i tried to configured allow hosts in my AccuWeather dashboard but it doesn't exist.
// // AccuWeather API support JSONP is a workaround to make cross-origin requests in situations where the server does not support CORS.
// var loadJSONP = (function () {
//   var unique = 0;
//   return function (url, callback, context) {
//     // Init
//     var name = "_mijsonp_" + unique++;
//     if (url.match(/\?/)) url += "&callback=" + name;
//     else url += "?callback=" + name;

//     // Create script tag
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = url;

//     // Setup handler
//     window[name] = function (data) {
//       callback.call((context || window), data);
//       document.getElementsByTagName('head')[0].removeChild(script);
//       script = null;
//       delete window[name];
//     };

//     // Load JSON
//     document.getElementsByTagName('head')[0].appendChild(script);
//   };
// })();
import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = process.env.REACT_APP_API_URL

export const getLocationKeyCode = async (location) => {
  try {
    const { data } = await axios.get(`${API_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${location}`)
    return data[0].Key
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getWeatherFromGeoLocation = async (lat, lon) => {
  try {
    const { data } = await axios.get(`${API_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`)
    return data
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getCurrentWeather = async (key, isMetric = true) => {
  try {
    const { data } = await axios.get(`${API_URL}/currentconditions/v1/${key}?apikey=${API_KEY}&metric=${isMetric}`)
    return data[0]
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const get5DayWeather = async (key, isMetric = true) => {
  try {
    const { data } = await axios.get(`${API_URL}/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&metric=${isMetric}`)
    return data.DailyForecasts
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getLocationCompletion = async (term) => {
  try {
    const {data} = await axios.get(`${API_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${term}`)
    return data
  } catch (error) {
    return Promise.reject(error.message)
  }

}