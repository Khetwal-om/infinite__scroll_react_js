import React, { useState, useEffect } from 'react'
import './App.css'
// r1w0Kc2irpne4ekT_sQLOyE_ANm0LsDK-MQPXbPlrBY
// 1n2REiNzTr7sAvwegSmdAntYnkyOVejNcUDPhCPHG-Q

// json format te r
import InfiniteScroll from 'react-infinite-scroll-component'
const API_KEY = '1n2REiNzTr7sAvwegSmdAntYnkyOVejNcUDPhCPHG-Q'

export default function App() {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    getPhotos()
  }, [page])

  function getPhotos() {
    fetch(`https://api.unsplash.com/photos?client_id=${API_KEY}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setImages((images) => [...images, ...data])
      })
  }
  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form>
        <input type="text" placeholder="Search Unsplash..." />
        <button>Search</button>
      </form>

      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage((page) => page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          {images.map((image, index) => (
            <div className="image" key={index}>
              <img src={image.urls.small} alt={image.alt_description} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

// dataLength={images.length}
// next={() => {
//   setPage((page) => page + 1)
//   getPhotos()
// }}
