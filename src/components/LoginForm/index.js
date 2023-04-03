import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isErrorOccur: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessResponse = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureResponse = error => {
    this.setState({isErrorOccur: true, errorMsg: error})
  }

  onSubmitEvent = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessResponse(data.jwt_token)
    } else {
      this.onFailureResponse(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, isErrorOccur, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="user-details-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitEvent}>
            <label htmlFor="username" className="label-element">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="input-element"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Username"
            />
            <label htmlFor="password" className="label-element">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="input-element"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {isErrorOccur && <p className="error">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
