import './App.css'
import { useState, useEffect } from "react"
import axios from 'axios'
import LocationInfo from './Components/LocationInfo'
import ResidentCard from './Components/ResidentCard'
import ErrorFetch from './Components/ErrorFetch'

function App() {

  const [location, setLocation] = useState()
  const [locationInput, setLocationInput] = useState()
  const [hasError, setHasError] = useState(false)


  useEffect(() => {
    let URL

    if(locationInput) {
      URL = `https://rickandmortyapi.com/api/location/${locationInput}`
    } else {
      const randomIdLocation = Math.floor(Math.random() * 126) + 1
      URL = `https://rickandmortyapi.com/api/location/${randomIdLocation}`

    }
    

    axios.get(URL)
      .then(res => { 
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => {
        setHasError(true)
        console.log(err)
      })

  }, [locationInput])

  const handleSubmit = e => {
    e.preventDefault()
    setLocationInput(e.target.inputSearch.value)
  }


  return (
    <div className="App">
      <h1>Ricky and morty</h1>
      <form onSubmit={handleSubmit}>
        <input id='inputSearch' type="text" />
        <button>Search</button>
      </form>

      {
        hasError ?
        <ErrorFetch />
        :

        <>
        
        <LocationInfo location={location} />
        <div className='residents-container'>
          {
            location?.residents.map(url => (
              <ResidentCard key={url} url={url} />
            ))
          }

        </div>


        </>

        

      }
    </div>
  )
}

export default App
