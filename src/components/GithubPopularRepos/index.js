import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    filterId: languageFiltersData[0].id,
    resposList: [],
    isSuccess: true,
    isLoading: true,
  }

  updateFilterId = id => {
    this.setState(
      {filterId: id, isLoading: true, isSuccess: true},
      this.getData,
    )
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const {filterId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${filterId}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const popularRespos = data.popular_repos

      const updatedList = popularRespos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({resposList: updatedList, isLoading: false})
    } else {
      this.setState({isSuccess: false, isLoading: true}, this.getFailurePage)
    }
  }

  getRepositories = () => {
    const {resposList} = this.state

    return (
      <ul className="repos-list">
        {resposList.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.starsCount} />
        ))}
      </ul>
    )
  }

  getFailurePage = () => (
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt=" failure view"
        className="failure-logo"
      />
      <h1 className="title">Something Went Wrong</h1>
    </div>
  )

  toggleLoading = () => (
    <div data-testid="loader" className="container ">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getResutl = () => {
    const {isSuccess} = this.state

    return isSuccess ? this.getRepositories() : this.getFailurePage()
  }

  render() {
    const {filterId, isLoading} = this.state

    return (
      <div className="github-popular-repos-container">
        <div className="detailed-container">
          <h1 className="main-heading">Popular</h1>
          <ul className="filter-icons-list">
            {languageFiltersData.map(eachFilter => (
              <LanguageFilterItem
                filterDetails={eachFilter}
                updateFilterId={this.updateFilterId}
                isActive={filterId === eachFilter.id}
                key={eachFilter.id}
              />
            ))}
          </ul>

          {isLoading ? this.toggleLoading() : this.getResutl()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
