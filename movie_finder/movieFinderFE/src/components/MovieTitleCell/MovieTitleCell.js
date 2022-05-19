import React, {  useState } from 'react'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import PopoverCard from '../Card/PopoverCard';
import LoadingProgress from '../LoadingProgress/LoadingProgress';

export default function MovieTitleCell({movie, switchValue,switchOnChange,selectMovie}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [popover,setPopover] = useState({})
  const [popoverStatus,setPopoverStatus] = useState(false) 
  
  const openPopover = async (e) => {
    setPopoverStatus(false);
    setAnchorEl(e.currentTarget);
    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${e.target.innerHTML}`)
      setPopoverStatus(response.ok);
      const data = await response.json()
      setPopover({
        ...popover,
        title:e.target.innerHTML,
        url: data?.content_urls?.desktop?.page || null,
        description:data?.extract || null,
      });
      selectMovie(movie)
    } catch (error) {
      console.error(error);
    }
    setPopoverStatus(true);
  }

  return (
    <div >
      <span aria-describedby={id} className="pointer" onClick={openPopover}>{movie.name}</span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',}}>
        <Typography component={'div'} sx={{ p: 2 }}>{ 
          !popoverStatus ? (<LoadingProgress />)
          :(<PopoverCard 
              wikipediaUrl={popover.url} 
              title={popover.title} 
              description={popover.description} 
              switchValue={switchValue} 
              switchOnChange={switchOnChange} 
              />)
        }</Typography>
      </Popover>
    </div>
  );
}
