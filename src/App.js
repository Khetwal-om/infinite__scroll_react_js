import React, { useEffect } from 'react'
import './App.css'
// r1w0Kc2irpne4ekT_sQLOyE_ANm0LsDK-MQPXbPlrBY
// 1n2REiNzTr7sAvwegSmdAntYnkyOVejNcUDPhCPHG-Q

// json format te r

const url =
  'https://api.unsplash.com/photos?client_id=1n2REiNzTr7sAvwegSmdAntYnkyOVejNcUDPhCPHG-Q'

export default function App() {
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  }, [])
  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form>
        <input type="text" placeholder="Search Unsplash..." />
        <button>Search</button>
      </form>

      <div className="image-grid">
        {[...Array(8)].map((_, index) => (
          <div className="image" key={index}>
            <img src="https://placekitten.com/g/1920/1080" alt="Sample" />
          </div>
        ))}
      </div>
    </div>
  )
}
