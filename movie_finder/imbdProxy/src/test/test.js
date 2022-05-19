const fetch = require('node-fetch');
const PORT = 3001;

describe(`http://localhost:${PORT} fetch Test` ,()=>{
  test('Correct movie title parameter', async ()=>{
    const response = await fetch(`http://localhost:${PORT}/fighter`)
    await expect(response.json()).resolves.toEqual({
      "title": "The Fighter",
      "url": "https://www.imdb.com/title/tt0964517"
      })  
  })
  test('Non-existing page', async ()=>{
    const response = await fetch(`http://localhost:${PORT}/`)
    await expect(response.json()).resolves.toEqual({
      "hasError": true,
      "message": "Not found",
      })  
  })
  test('Incorrect movie title parameter', async ()=>{
    const response = await fetch(`http://localhost:${PORT}/sddsds asdad das sa dsa ddsaa da adada a d`)
    await expect(response.json()).resolves.toEqual({
      "hasError": true,
      "message": "Invalid Title"
      })  
  })
})