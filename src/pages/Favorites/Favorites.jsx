import { connect } from "react-redux"
import { useNavigate } from "react-router-dom";
import './Favorites.scss'

export const _Favorites = ({ favorites, isCelsius, onSelectFavorite }) => {
    const navigate = useNavigate();

    return (
        <div data-testid="favorites-container" className="favorites container">
            <h3>Favorites Cities</h3>
            <hr />
            <div className="list">
                {(favorites?.length && favorites.map(favorite => (
                    <div data-testid="favorite" className="favorite" key={favorite.id} onClick={() => { navigate('/'); onSelectFavorite(favorite) }}>
                        {/* <div className="favorite" key={favorite.id} onClick={() => navigate(`/?q=${favorite.name}&key=${favorite.id}`)}> */}
                        <h3>{favorite.name}</h3>
                        <div className='imgs'>
                            <img src={require(`../../assets/weatherIcons/${favorite.currWeather.WeatherIcon}-s.png`)} alt="" />
                        </div>
                        {isCelsius ? favorite.currWeather.Temperature.Metric.Value + 'C' : favorite.currWeather.Temperature.Imperial.Value + 'F'}&deg;
                    </div>
                ))) || ''}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    favorites: state.weatherReducer.favorites,
    isCelsius: state.weatherReducer.isCelsius,
})

const mapDispatchToProps = {}

export const Favorites = connect(mapStateToProps, mapDispatchToProps)(_Favorites)