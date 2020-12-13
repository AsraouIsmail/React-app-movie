
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';

const App = () =>{

  const [movies, setMovies] = useState([]);

  const [SearchValue, setSearchValue] = useState(['']);

  const getMovieRequest = async () => {
    const url = "http://www.omdbapi.com/?s=lost&apikey=93a53d8c"

    const response = await fetch(url);

    const responseJson = await response.json();

    setMovies(responseJson.Search);
    
  };

  useEffect(() => {
      getMovieRequest();
    }, []);

  return (
    <div className='container-fluid movie-app'>
      <div className='row'>
        <MovieListHeading heading='Movies' />
      </div>
      <div className='row'>
        < MovieList  movies={movies}/>

      </div>
    
  </div>
  ); 
}

export default App;
