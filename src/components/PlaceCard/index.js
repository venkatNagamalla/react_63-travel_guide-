import './index.css'

const PlaceCard = props => {
  const {placeDetails} = props
  const {name, imageUrl, description} = placeDetails
  return (
    <li className="card">
      <img className="card-img" src={imageUrl} alt={name} />
      <div className="name-desc-container">
        <h1 className="card-name">{name}</h1>
        <p className="card-desc">{description}</p>
      </div>
    </li>
  )
}

export default PlaceCard
