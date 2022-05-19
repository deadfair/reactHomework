import React, { useEffect,  useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './PopoverCard.scss';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const URL = 'http://localhost:3001/'

export default function PopoverCard({wikipediaUrl, title, description,switchValue,switchOnChange}) {

  const [imbdUrl, setImbdUrl] = useState(null);

  const searchImbdUrl = async (title) => {
    setImbdUrl(null);
    try {
      const response = await fetch(`${URL}${title}`)
      const data = await response.json()
      if (!data.hasError && data.url && data.title.includes(title)) { 
        setImbdUrl(data.url)
      }else{
        setImbdUrl(null)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (title) {
      searchImbdUrl(title)
    }
  }, [title])
  


  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography className="card__body" variant="body2" component="div">
          {description || 'I dont have information :('}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          disabled={!wikipediaUrl} 
          size="small"
          onClick={()=> window.open(wikipediaUrl, "_blank")}>
          Read more on wikipedia
        </Button>
        <Button 
          disabled={!imbdUrl} 
          onClick={()=> window.open(imbdUrl, "_blank")}
          size="small">
            Read more on IMDB
        </Button>
        <FormControlLabel 
          control={<Switch value={switchValue} onChange={switchOnChange} checked={switchValue} />}  
          label="Mode"/>
      </CardActions>
    </Card>
  );
}
