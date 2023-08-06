import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css'

import { Route, Routes, HashRouter } from "react-router-dom";
import { AppHeader } from "./cmps/AppHeader/AppHeader";
import { Home } from "./pages/Home/Home";
import { Favorites } from './pages/Favorites/Favorites';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setFavorites } from './store/actions/weatherActions.js'

function _App(props) {

  useEffect(() => {
    props.setFavorites(JSON.parse(localStorage.getItem('favorites')) || [])
  }, []);

  return (
    <HashRouter>
      <div className={props.isDarkMode ? "App dark" : "App"} >
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='favorites/' element={<Favorites />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

const mapStateToProps = state => ({
  isDarkMode: state.weatherReducer.isDarkMode,
})

const mapDispatchToProps = {
  setFavorites
}
export const App = connect(mapStateToProps, mapDispatchToProps)(_App)