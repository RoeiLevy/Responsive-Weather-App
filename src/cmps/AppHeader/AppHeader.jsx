import { TabMenu } from 'primereact/tabmenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToggleButton } from 'primereact/togglebutton';
import { connect } from 'react-redux';
import { setIsDarkMode, setIsCelsius } from '../../store/actions/weatherActions.js'
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import './AppHeader.scss'

export const _AppHeader = ({ isDarkMode, isCelsius, setIsDarkMode, setIsCelsius }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [visibleRight, setVisibleRight] = useState(false);
    const [isMobile, setIsMobile] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
        {
            label: 'Home', icon: 'pi pi-fw pi-home', command: () => {
                setVisibleRight(false)
                navigate('/')
            }
        },
        {
            label: 'Favorites', icon: 'pi pi-fw pi-star', command: () => {
                setVisibleRight(false)
                navigate('/favorites')
            }
        },
    ];

    const handleChangeDarkMode = (e) => {
        document.body.classList.toggle('dark')
        setIsDarkMode(e.value)
    }

    const handleChangeIsCelsius = (e) => {
        setIsCelsius(e.value)
    }

    useEffect(() => {
        (location.pathname === '/') ? setActiveIndex(0) : setActiveIndex(1)
    }, [location.pathname]);

    useEffect(() => {
        (window.innerWidth < 750) ? setIsMobile(true) : setIsMobile(false)
        const handleResize = () => {
            (window.innerWidth < 750) ? setIsMobile(true) : setIsMobile(false)
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isMobile) {
        return (
            <header className="app-header">
                <div className="container">
                    <h1 onClick={() => navigate('/')}><i className="pi pi-sun" style={{ color: '#f05514', fontSize: '2rem' }}></i>Weather</h1>
                    <div className="settings">
                        <ToggleButton size="large" onLabel="" offLabel="" onIcon="pi pi-sun" offIcon="pi pi-moon"
                            checked={isDarkMode} onChange={handleChangeDarkMode} />
                        <ToggleButton size="small" onLabel="F&deg;" offLabel="C&deg;" checked={isCelsius} onChange={handleChangeIsCelsius} />
                    </div>
                    <TabMenu activeIndex={activeIndex} model={items} onTabChange={(e) => setActiveIndex(e.index)} />
                </div>
            </header>
        )
    } else {
        return (
            <header className={`app-header ${isDarkMode ? 'dark' : ''}`}>
                <div className="container">
                    <h1 onClick={() => navigate('/')}><i className="pi pi-sun" style={{ color: '#f05514', fontSize: '2rem' }}></i>Weather</h1>
                    <Button icon="pi pi-align-justify" onClick={() => setVisibleRight(true)} />
                    <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                        <TabMenu activeIndex={activeIndex} model={items} onTabChange={(e) => setActiveIndex(e.index)} />
                        <div className="settings">
                            <ToggleButton size="large" onLabel="" offLabel="" onIcon="pi pi-sun" offIcon="pi pi-moon"
                                checked={isDarkMode} onChange={handleChangeDarkMode} />
                            <ToggleButton size="small" onLabel="C&deg;" offLabel="F&deg;" checked={isCelsius} onChange={handleChangeIsCelsius} />
                        </div>
                    </Sidebar>
                </div>
            </header>
        )
    }

}
const mapStateToProps = state => ({
    isDarkMode: state.weatherReducer.isDarkMode,
    isCelsius: state.weatherReducer.isCelsius,
})

const mapDispatchToProps = {
    setIsDarkMode,
    setIsCelsius
}
export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)