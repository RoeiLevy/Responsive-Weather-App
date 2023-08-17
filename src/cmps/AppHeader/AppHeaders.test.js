import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { _AppHeader } from './AppHeader';

describe('_AppHeader Component', () => {
    // Mock store and props
    const mockStore = configureStore([]);
    const mockProps = {
        isDarkMode: false,
        isCelsius: true,
        setIsDarkMode: jest.fn(),
        setIsCelsius: jest.fn()
    };

    it('renders without errors', () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <_AppHeader {...mockProps} />
                </MemoryRouter>
            </Provider>
        );

        const appHeader = screen.getByTestId('app-header');
        expect(appHeader).toBeInTheDocument();
    });

    it('toggles dark mode', () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <_AppHeader {...mockProps} />
                </MemoryRouter>
            </Provider>
        );

        const toggleDarkModeButton = screen.getByTestId('toggle-dark-mode');
        fireEvent.click(toggleDarkModeButton);

        expect(mockProps.setIsDarkMode).toHaveBeenCalledTimes(1);
    });

    it('toggles temperature unit', () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <_AppHeader {...mockProps} />
                </MemoryRouter>
            </Provider>
        );

        const toggleTempUnitButton = screen.getByTestId('toggle-temp-unit');
        fireEvent.click(toggleTempUnitButton);

        expect(mockProps.setIsCelsius).toHaveBeenCalledTimes(1);
    });
});
