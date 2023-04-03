import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updateData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getProfile()
  }

  renderProfileFailure = () => (
    <button type="button" className="retry-button" onClick={this.onClickRetry}>
      Retry
    </button>
  )

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-container">{this.renderResult()}</div>
  }
}
export default Profile
