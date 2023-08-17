import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { App } from './App';
import { setIsDarkMode } from './store/actions/weatherActions';
import { store as configureStoreForTesting } from './store';

describe('App', () => {
  const store = configureStoreForTesting
  it('should render without errors', () => {

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const childElement = screen.getByTestId('div');
    expect(childElement).toHaveClass('App');
  });

  it('should have dark class', () => {

    store.dispatch(setIsDarkMode(true));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const childElement = screen.getByTestId('div');
    expect(childElement).toHaveClass('dark');
  });

  it('renders without errors', () => {
    render(
      <Provider store={store}>
        <App isDarkMode={false} />
      </Provider>
    );
    const appDiv = screen.getByTestId('div');
    expect(appDiv).toBeInTheDocument();
  });

  it('renders AppHeader', () => {
    render(
      <Provider store={store}>
        <App isDarkMode={false} />
      </Provider>
    );    const appHeaderTitle = screen.getByText('Weather'); 
    expect(appHeaderTitle).toBeInTheDocument();
  });
});