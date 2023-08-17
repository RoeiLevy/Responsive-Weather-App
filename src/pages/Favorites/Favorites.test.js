import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { _Favorites } from './Favorites'; 

describe('_Favorites Component', () => {
  const mockProps = {
    favorites: [
      {
        id: 1,
        name: 'City 1',
        currWeather: {
          WeatherIcon: '1',
          Temperature: {
            Metric: {
              Value: '20'
            },
            Imperial: {
              Value: '68'
            }
          }
        }
      },
    ],
    isCelsius: true,
    onSelectFavorite: jest.fn() 
  };

  it('renders without errors', () => {
    render(
        <MemoryRouter>
          <_Favorites {...mockProps} />
        </MemoryRouter>
    );

    const favoritesContainer = screen.getByTestId('favorites-container');
    expect(favoritesContainer).toBeInTheDocument();
  });

  it('renders favorites', () => {
    render(
        <MemoryRouter>
          <_Favorites {...mockProps} />
        </MemoryRouter>
    );

    const favoriteElements = screen.getAllByTestId('favorite');
    expect(favoriteElements.length).toBe(mockProps.favorites.length);
  });

  it('calls onSelectFavorite when a favorite is clicked', () => {
    render(
        <MemoryRouter>
          <_Favorites {...mockProps} />
        </MemoryRouter>
    );
    const favoriteElement = screen.getByText('City 1'); 
    fireEvent.click(favoriteElement);

    expect(mockProps.onSelectFavorite).toHaveBeenCalledTimes(1);
  });
});
