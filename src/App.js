
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';

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

    const addFavouriteMovie = (movie) =>{
      const newFavouriteList = [...favourites, movie];
      setfavourites(newFavouriteList);

    };

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
        < MovieList  movies={favourites} handleFavouritesClick={addFavouriteMovie} FavouriteComponent={AddFavourites}/>
      </div>
    
  </div>
  ); 
}

export default App;
