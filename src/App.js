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
import { useState } from 'react';

function _App(props) {
  const [selectedFavorite, setSelectedFavorite] = useState(null)

  const handleSelectFavorite = (favorite) => {
    setSelectedFavorite(favorite)
  }

  return (
    <HashRouter>
      <div data-testid="div" className={props.isDarkMode ? "App dark" : "App"} >
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home selectedFavorite={selectedFavorite} />} />
          <Route path='favorites/' element={<Favorites onSelectFavorite={handleSelectFavorite} />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

const mapStateToProps = state => ({
  isDarkMode: state.weatherReducer.isDarkMode,
})

const mapDispatchToProps = {}
export const App = connect(mapStateToProps, mapDispatchToProps)(_App)