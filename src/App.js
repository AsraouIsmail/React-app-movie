
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import removeFavourites from './components/RemoveFavourites';

const App = () =>{

  const [movies, setMovies] = useState([]);
  const [favourites, setfavourites] = useState([]);

  const [SearchValue, setSearchValue] = useState(['']);

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${SearchValue}&apikey=93a53d8c`;

    const response = await fetch(url);

    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }

    
    
  };

  useEffect(() => {
      getMovieRequest(SearchValue);
    }, [SearchValue]);


  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

			setfavourites(movieFavourites);
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

    const addFavouriteMovie = (movie) =>{
      const newFavouriteList = [...favourites, movie];
      setfavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);

    };

    const removeFavouriteMovie = (movie) =>{
      const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
      setfavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox SearchValue={setSearchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        < MovieList  movies={movies} handleFavouritesClick={addFavouriteMovie} FavouriteComponent={AddFavourites}/>
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>

      <div className='row'>
        < MovieList  movies={favourites} handleFavouritesClick={removeFavouriteMovie} FavouriteComponent={removeFavourites}/>
      </div>
    
  </div>
  ); 
}

export default App;
