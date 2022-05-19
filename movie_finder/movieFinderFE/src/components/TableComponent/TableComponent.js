import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import MovieTitleCell from '../MovieTitleCell/MovieTitleCell';

export default function TableComponent({data,switchValue,switchOnChange,selectMovie}) {

  return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Movie Title</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Release Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(movie => { return (
              <TableRow key={movie.id}>
                <TableCell component="th" scope="row">
                  <MovieTitleCell 
                    selectMovie={selectMovie}  
                    movie={movie} 
                    switchValue={switchValue} 
                    switchOnChange={switchOnChange}/>
                </TableCell>
                <TableCell align="right">{movie.score}</TableCell>
                <TableCell align="right">{new Date(movie.releaseDate).getFullYear()}</TableCell>
              </TableRow>)
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
}





