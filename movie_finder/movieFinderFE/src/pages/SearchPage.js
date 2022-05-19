import React, { useState } from 'react'
import Button from '@mui/material/Button';
import LoadingProgress from '../components/LoadingProgress/LoadingProgress';
import { SearchMovies } from '../hooks/SearchMovies';
import TextField from '@mui/material/TextField';
import './SearchPage.scss'
import { SearchRelatedMovies } from '../hooks/SearchRelatedMovies';
import TableComponent from '../components/TableComponent/TableComponent';

export default function SearchPage() {
  const [switchValue,setSwitchValue] = useState(true);
  const [inputValue,setInputValue] = useState('');
  const [query,setQuery] = useState("");
  const [selectedMovieID,setSelectedMovieID] = useState('');
  const [getMovies,{error,data,loading}] =  SearchMovies(query) 
  const [getRelatedMovies,{error:errorRelated,data:dataRelated,leading:loadingRelated}] = SearchRelatedMovies(selectedMovieID)

  const selectMovie = (movie) => {
    if (switchValue) {
      setSelectedMovieID(movie.id);
    }else{
      setInputValue(movie.name)
    }
  }
  const searchClickHandler = () => {
    setQuery(inputValue);
    getMovies()
    if (!switchValue) {
      setSwitchValue(prevState=> !prevState)
    }
  }
  const switchOnChange = () => {
    if (!switchValue) {
      setQuery(inputValue);
      getMovies()    
    }else{
      getRelatedMovies()
    }
    setSwitchValue(prevState=> !prevState)
  }
  const handleEnterKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchClickHandler()
    }
  }

  return (
    <div>
      <div className="search">
        <TextField 
          value={inputValue} 
          onKeyDown={handleEnterKeyDown}
          onChange={(e) => setInputValue(e.target.value)} 
          id="filled-basic" 
          label="Search Movies" 
          variant="filled" />
        <Button 
          color={!switchValue ? "secondary" : "primary"} 
          onClick={()=> searchClickHandler()} 
          variant="outlined">
            Search
        </Button>
      </div>
      {
        <div className="content">
          {((switchValue && loading) || (!switchValue && loadingRelated)) &&   <LoadingProgress/>}
          {((switchValue && error) || (!switchValue && errorRelated)) && <p> Something is wrong... :( </p>}
          {((switchValue && data) || (!switchValue && dataRelated)) && (
            <TableComponent 
              data={switchValue ? data.searchMovies : dataRelated.movie.similar } 
              switchOnChange={switchOnChange} 
              switchValue={switchValue}
              selectMovie={selectMovie}
              />)}
        </div>
        }
    </div>
  )
}
