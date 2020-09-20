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
  const [query, setQuery] = useState('')
  useEffect(() => {
    getPhotos()
  }, [page])

  function getPhotos() {
    let apiUrl = `https://api.unsplash.com/photos?`
    if (query) apiUrl = `https://api.unsplash.com/search/photos?query=${query}`
    apiUrl += `&page=${page}`
    apiUrl += `&client_id=${API_KEY}`

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const imagesFromApi = data.results ?? data

        // if page is 1, then we need a whole new array of images
        if (page === 1) {
          setImages(imagesFromApi)
          return
        }

        // if page > 1, then we are adding for our infinite scroll
        setImages((images) => [...images, ...imagesFromApi])
      })
  }

  function searchPhotos(e) {
    e.preventDefault()
    setPage(1)
    getPhotos()
  }

  function searchPhotos(event) {
    event.preventDefault()
    setPage(1)
    getPhotos()
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form onSubmit={searchPhotos}>
        <input
          type="text"
          placeholder="Search Unsplash..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
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
