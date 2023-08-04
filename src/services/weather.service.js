import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY

export const getLocationKeyCode = async (location) => {
  try {
    // const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${location}`)
    // return data[0].Key
    return "215432"
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getWeatherFromGeoLocation = async (lat, lon, isMetric = true) => {
  try {
    const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}&details=true`)
    return data[0]
    return Promise.resolve(
      {
        "LocalObservationDateTime": "2023-08-02T21:58:00+03:00",
        "EpochTime": 1691002680,
        "WeatherText": "Clear",
        "WeatherIcon": 33,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 28.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 83.0,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
      }
    )
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getCurrentWeather = async (key, isMetric = true) => {
  try {
    // const { data } = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`)
    // return data[0]
    return Promise.resolve(
      {
        "LocalObservationDateTime": "2023-08-02T21:58:00+03:00",
        "EpochTime": 1691002680,
        "WeatherText": "Clear",
        "WeatherIcon": 33,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 28.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 83.0,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
      }
    )
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const get5DayWeather = async (key) => {
  try {
    // const { data } = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&details=true`)
    // return data.DailyForecasts
    return Promise.resolve([
      {
        "Date": "2023-08-02T07:00:00+03:00",
        "EpochDate": 1690948800,
        "Temperature": {
          "Minimum": {
            "Value": 25.7,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 34.2,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 34,
          "IconPhrase": "Mostly clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
      },
      {
        "Date": "2023-08-03T07:00:00+03:00",
        "EpochDate": 1691035200,
        "Temperature": {
          "Minimum": {
            "Value": 26.5,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 32.2,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 34,
          "IconPhrase": "Mostly clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"
      },
      {
        "Date": "2023-08-04T07:00:00+03:00",
        "EpochDate": 1691121600,
        "Temperature": {
          "Minimum": {
            "Value": 27.5,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 31.4,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 34,
          "IconPhrase": "Mostly clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"
      },
      {
        "Date": "2023-08-05T07:00:00+03:00",
        "EpochDate": 1691208000,
        "Temperature": {
          "Minimum": {
            "Value": 26.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 31.8,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 2,
          "IconPhrase": "Mostly sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 33,
          "IconPhrase": "Clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"
      },
      {
        "Date": "2023-08-06T07:00:00+03:00",
        "EpochDate": 1691294400,
        "Temperature": {
          "Minimum": {
            "Value": 26.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 32.4,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 34,
          "IconPhrase": "Mostly clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us"
      }
    ])
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getLocationCompletion = async (term) => {
  try {
    // const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${term}`)
    // return data
    return Promise.resolve([
      {
        "Version": 1,
        "Key": "122972",
        "Type": "City",
        "Rank": 31,
        "LocalizedName": "Holguin",
        "Country": {
          "ID": "CU",
          "LocalizedName": "Cuba"
        },
        "AdministrativeArea": {
          "ID": "11",
          "LocalizedName": "Holguín"
        }
      },
      {
        "Version": 1,
        "Key": "1849236",
        "Type": "City",
        "Rank": 45,
        "LocalizedName": "Holingol",
        "Country": {
          "ID": "CN",
          "LocalizedName": "China"
        },
        "AdministrativeArea": {
          "ID": "NM",
          "LocalizedName": "Inner Mongolia"
        }
      },
      {
        "Version": 1,
        "Key": "326224",
        "Type": "City",
        "Rank": 45,
        "LocalizedName": "Holmfirth",
        "Country": {
          "ID": "GB",
          "LocalizedName": "United Kingdom"
        },
        "AdministrativeArea": {
          "ID": "KIR",
          "LocalizedName": "Kirklees"
        }
      },
      {
        "Version": 1,
        "Key": "215838",
        "Type": "City",
        "Rank": 45,
        "LocalizedName": "Holon",
        "Country": {
          "ID": "IL",
          "LocalizedName": "Israel"
        },
        "AdministrativeArea": {
          "ID": "TA",
          "LocalizedName": "Tel Aviv"
        }
      },
      {
        "Version": 1,
        "Key": "3424209",
        "Type": "City",
        "Rank": 45,
        "LocalizedName": "Holy Spirit",
        "Country": {
          "ID": "PH",
          "LocalizedName": "Philippines"
        },
        "AdministrativeArea": {
          "ID": "MNL",
          "LocalizedName": "Metropolitan Manila"
        }
      },
      {
        "Version": 1,
        "Key": "326182",
        "Type": "City",
        "Rank": 45,
        "LocalizedName": "Holoby",
        "Country": {
          "ID": "UA",
          "LocalizedName": "Ukraine"
        },
        "AdministrativeArea": {
          "ID": "07",
          "LocalizedName": "Volyn"
        }
      },
      {
        "Version": 1,
        "Key": "332286",
        "Type": "City",
        "Rank": 45,
        "LocalizedName": "Hollywood",
        "Country": {
          "ID": "US",
          "LocalizedName": "United States"
        },
        "AdministrativeArea": {
          "ID": "FL",
          "LocalizedName": "Florida"
        }
      },
      {
        "Version": 1,
        "Key": "124444",
        "Type": "City",
        "Rank": 52,
        "LocalizedName": "Holstebro",
        "Country": {
          "ID": "DK",
          "LocalizedName": "Denmark"
        },
        "AdministrativeArea": {
          "ID": "82",
          "LocalizedName": "Central Jutland"
        }
      },
      {
        "Version": 1,
        "Key": "125893",
        "Type": "City",
        "Rank": 52,
        "LocalizedName": "Holbæk",
        "Country": {
          "ID": "DK",
          "LocalizedName": "Denmark"
        },
        "AdministrativeArea": {
          "ID": "85",
          "LocalizedName": "Zealand"
        }
      },
      {
        "Version": 1,
        "Key": "3351935",
        "Type": "City",
        "Rank": 55,
        "LocalizedName": "Holambi Kalan",
        "Country": {
          "ID": "IN",
          "LocalizedName": "India"
        },
        "AdministrativeArea": {
          "ID": "DL",
          "LocalizedName": "Delhi"
        }
      }
    ])
  } catch (error) {
    return Promise.reject(error.message)
  }

}