import { useCallback, useEffect, useRef, useState } from 'react';
import { get5DayWeather, getCurrentWeather, getLocationCompletion, getLocationKeyCode, getWeatherFromGeoLocation } from '../../services/weather.service';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { debounce } from '../../services/utils';
import { setFavorites, setCurrWeather, setDailyForecasts } from '../../store/actions/weatherActions.js'
import { useLocation } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import './Home.scss'

const _Home = (props) => {
    const [cities, setCities] = useState([])
    const [isFavoriteBtnClicked, setIsFavoriteBtnClicked] = useState(false);
    const [currCity, setCurrCity] = useState({})
    const [isFocusOnInput, setIsFocusOnInput] = useState(false)

    const location = useLocation();
    const inputElem = useRef(null);
    const toast = useRef(null);
    const isFirstRender = useRef(true);

    const show = (severity, summary, detail, life = 3000) => {
        toast.current.show({ severity, summary, detail, life });
    };

    const getDefaultWeather = async () => {
        try {
            let Key
            if (localStorage.getItem('defaultKey')) {
                Key = JSON.parse(localStorage.getItem('defaultKey'))
            } else {
                Key = await getLocationKeyCode(encodeURIComponent('Tel Aviv'))
                localStorage.setItem('defaultKey', JSON.stringify(Key))
            }
            await getWeather({ LocalizedName: 'Tel Aviv', Key })
        } catch (error) {
            show('error', 'Error', error)
        }
    }

    const getWeatherLatLon = async ({ coords }) => {
        try {
            const { latitude, longitude } = coords
            const { Key, LocalizedName } = await getWeatherFromGeoLocation(latitude, longitude)
            getWeather({ Key, LocalizedName })
        } catch (error) {
            show('error', 'Error', error)
        }
    }

    const getWeather = async ({ Key, LocalizedName }) => {
        try {
            const cachedWeather = JSON.parse(localStorage.getItem('cachedWeather') || '{}')
            if (cachedWeather[Key]) {
                props.setCurrWeather(cachedWeather[Key].currWeather)
                props.setDailyForecasts(cachedWeather[Key].dailyForecasts)
            } else {
                const currWeather = await getCurrentWeather(Key, props.isCelsius)
                const dailyForecasts = await get5DayWeather(Key, props.isCelsius)
                cachedWeather[Key] = { currWeather, dailyForecasts }
                localStorage.setItem('cachedWeather', JSON.stringify(cachedWeather))
                props.setCurrWeather(currWeather)
                props.setDailyForecasts(dailyForecasts)
            }
            inputElem.current.value = LocalizedName
            setCurrCity({ Key, LocalizedName })
            setCities([])
        } catch (error) {
            show('error', 'Error', error)
        }
    }

    const toggleFromFavorites = (e) => {
        setIsFavoriteBtnClicked(true);
        setTimeout(() => {
            setIsFavoriteBtnClicked(false);
        }, 700); // For animation purposes
        const city = { name: currCity.LocalizedName, id: currCity.Key, currWeather: props.currWeather }
        const tempFavorites = props.favorites.slice()
        let isRemoved
        if (tempFavorites.some(city => city.id === city.id)) {
            const idx = tempFavorites.findIndex(favorite => favorite === city)
            tempFavorites.splice(idx, 1)
            isRemoved = true
        } else {
            tempFavorites.push(city)
            isRemoved = false
        }
        localStorage.setItem('favorites', JSON.stringify(tempFavorites))
        props.setFavorites(tempFavorites)
        show('success', 'Success', isRemoved ? 'City removed from favorites' : 'City added to favorites')
    }

    const handleSearch = async (value) => {
        try {
            const res = await getLocationCompletion(value)
            setCities(res.map(city => ({
                label: city.LocalizedName,
                command: () => {
                    getWeather(city)
                }
            })))
        } catch (error) {
            show('error', 'Error', error)
        }
    }

    const handleChange = useCallback(debounce(handleSearch, 500), []); // Using debounce to minimize API calls count 

    useEffect(() => { // Reload 5 day forecast when the degree settings is changed
        (async function myFunc() {
            if (!isFirstRender.current) {
                const currWeather = await getCurrentWeather(currCity.Key, props.isCelsius)
                const dailyForecasts = await get5DayWeather(currCity.Key, props.isCelsius)
                localStorage.setItem('cachedWeather', JSON.stringify({ [currCity.Key]: { currWeather, dailyForecasts } }))
                props.setCurrWeather(currWeather)
                props.setDailyForecasts(dailyForecasts)
            } else {
                isFirstRender.current = false;
            }
        })()
    }, [props.isCelsius]);

    useEffect(() => {
        // First get weather if we have query params ( Which means we just navigated from favorites page)
        // If not then try GEO location
        // If user denied or browser is incompatible get default Tel Aviv weather
        const LocalizedName = new URLSearchParams(location.search).get('q');
        const Key = new URLSearchParams(location.search).get('key');
        if (LocalizedName && Key) {
            getWeather({ Key, LocalizedName })
        } else if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getWeatherLatLon(position)
                },
                (error) => {
                    getDefaultWeather()
                }
            );
        } else {
            getDefaultWeather()
        }
        props.setFavorites(JSON.parse(localStorage.getItem('favorites')) || [])

        window.addEventListener('click', (e) => {
            if (e.target.className.includes("p-inputtext") || e.target.className.includes("p-menuitem-link")) {
                setIsFocusOnInput(true)
            } else {
                setIsFocusOnInput(false)
            }
        })
    }, []);

    return (
        <div className="home ">
            <div className="search container">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText placeholder="Search" ref={inputElem} onChange={() => handleChange(inputElem.current?.value)} onFocus={(e) => e.target.select()} />
                    {(cities.length && isFocusOnInput) ? <Menu className="menu" model={cities} /> : null}
                </span>
            </div>
            <main className='container'>
                <header>
                    <div className="curr-weather">
                        <aside>
                            <p>{currCity.LocalizedName}</p>
                            {!props.currWeather ? '' : props.isCelsius ? <p>{props.currWeather?.Temperature?.Metric?.Value + props.currWeather?.Temperature?.Metric?.Unit}&deg;</p> :
                                <p>{props.currWeather?.Temperature?.Imperial?.Value + props.currWeather?.Temperature?.Imperial?.Unit}&deg;</p>}
                        </aside>
                        {props.currWeather?.WeatherIcon ? <img src={require(`../../assets/weatherIcons/${props.currWeather.WeatherIcon}-s.png`)} alt="" /> : null}
                    </div>
                    <i className={`pi ${props.favorites?.some(city => city.name === inputElem?.current?.value) ? 'pi-heart-fill' : 'pi-heart'} ${isFavoriteBtnClicked ? 'heart-icon' : ''}`}
                        style={{ fontSize: '2rem' }} onClick={toggleFromFavorites} />
                    <Toast ref={toast} position="bottom-right" />

                </header>
                <div className="five-day-forecast">
                    {(props.dailyForecasts?.length && props.dailyForecasts.map(dailyForecast => (
                        <div className='day-forecast' key={dailyForecast.EpochDate}>
                            <h3>{new Date(dailyForecast.EpochDate * 1000).toDateString().slice(0, -5)}</h3>
                            <div className='imgs'>
                                <img src={require(`../../assets/weatherIcons/${dailyForecast.Day.Icon}-s.png`)} alt="" />/<img src={require(`../../assets/weatherIcons/${dailyForecast.Night.Icon}-s.png`)} alt="" />
                            </div>
                            {dailyForecast.Temperature.Maximum.Value + dailyForecast.Temperature.Maximum.Unit}&deg;/{dailyForecast.Temperature.Minimum.Value + dailyForecast.Temperature.Minimum.Unit}&deg;
                        </div>
                    ))) || ''}
                </div>
            </main>
        </div>
    )
}

const mapStateToProps = state => ({
    favorites: state.weatherReducer.favorites,
    isCelsius: state.weatherReducer.isCelsius,
    currWeather: state.weatherReducer.currWeather,
    dailyForecasts: state.weatherReducer.dailyForecasts
})

const mapDispatchToProps = {
    setFavorites,
    setCurrWeather,
    setDailyForecasts
}
export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)