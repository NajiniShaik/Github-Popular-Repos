import './index.css'

const RespositoryItem = props => {
  const {repoDetails} = props

  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails

  console.log(repoDetails)

  return (
    <li className="repository-detailed-container">
      <div className="first-card">
        <img src={avatarUrl} alt={name} className="repository-logo" />
        <h1 className="name">{name}</h1>
      </div>

      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p className="count">{starsCount}</p>
      </div>

      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <p className="count">{forksCount}</p>
      </div>

      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p className="count">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RespositoryItem
