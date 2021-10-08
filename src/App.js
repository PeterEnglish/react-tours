import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

//Querying the api.
const url = 'https://course-api.com/react-tours-project'

function App() {
  //boolean value for loading
  const [loading, setLoading] = useState(true)
  //array for tours
  const [tours, setTours] = useState([])

  const removeTour = (id) => {
    //filter out a tours object
    const newTours = tours.filter((t) => t.id !== id)
    //set the tours to the new tours object
    setTours(newTours)
  }

  const fetchTours = async () => {
    setLoading(true)
    try {
      //
      const response = await fetch(url)
      //Read and parse the data
      const tours = await response.json()
      setLoading(false)
      setTours(tours)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  //empty array calls useEffect only once, after initial render
  useEffect(() => {
    fetchTours()
  }, [])
  //Note use of returns below.
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App
