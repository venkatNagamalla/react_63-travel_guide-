import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import PlaceCard from '../PlaceCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const TravelGuideContainer = () => {
  const [details, setDetails] = useState({
    apiStatus: apiStatusConstants.initial,
    placesData: [],
  })

  const modify = obj => ({
    id: obj.id,
    name: obj.name,
    imageUrl: obj.image_url,
    description: obj.description,
  })

  const getPlacesData = async () => {
    setDetails({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.packages.map(eachPlace => modify(eachPlace))
      setDetails({
        placesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      setDetails({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  useEffect(() => {
    getPlacesData()
  }, [])

  const loaderView = () => (
    <div className="container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  const failureView = () => (
    <div className="container">
      <h1 className="failure-text">Something went wrong please try again</h1>
      <button onClick={getPlacesData} type="button" className="failure-btn">
        Retry
      </button>
    </div>
  )

  const successView = () => (
    <ul className="cards-container">
      {details.placesData.map(eachPlace => (
        <PlaceCard key={eachPlace.id} placeDetails={eachPlace} />
      ))}
    </ul>
  )

  const renderPlaces = () => {
    switch (details.apiStatus) {
      case apiStatusConstants.inProgress:
        return loaderView()
      case apiStatusConstants.failure:
        return failureView()
      case apiStatusConstants.success:
        return successView()
      default:
        return null
    }
  }

  return (
    <div className="main-container">
      <h1 className="heading">Travel Guide</h1>
      {renderPlaces()}
    </div>
  )
}
export default TravelGuideContainer
