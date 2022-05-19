const express = require('express')  
const controller = express.Router()
const createError = require('http-errors')  
const fetch = require('node-fetch');

IMBD_API = 'https://v2.sg.media-imdb.com/suggests'

controller.get('/:title', async (req, res, next) => {
  const title = req.params.title
  try{
    const response = await fetch(`${IMBD_API}/${title.charAt(0).toLowerCase()}/${title}.json`);
    const data = await response.text();
    const resObj = JSON.parse(data.slice((`imdb$${title}`.length + 1),(data.length)-1))
    if (resObj && resObj.d && resObj.d.length > 0) {
      res.status(200);
      res.json({
        title: resObj.d[0].l,
        url:`https://www.imdb.com/title/${resObj.d[0].id}`
      })
    }else{
      return next(new createError.BadRequest('Invalid Title'))
    }
  }
  catch(error){
    console.error(error)
  }
})

module.exports = controller;
