import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {MdBusinessCenter} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt=" website logo"
          className="website-logo-img"
        />
      </Link>
      <div className="icons-container">
        <Link to="/" style={{textDecoration: 'none'}}>
          <AiFillHome className="icon" />
        </Link>
        <Link to="/jobs" style={{textDecoration: 'none'}}>
          <MdBusinessCenter className="icon" />
        </Link>
        <FiLogOut className="icon" onClick={onClickLogout} />
      </div>
      <ul className="unordered-list">
        <Link to="/" style={{textDecoration: 'none'}}>
          <li className="each-list">Home</li>
        </Link>
        <Link to="/jobs" style={{textDecoration: 'none'}}>
          <li className="each-list">Jobs</li>
        </Link>
        <li>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
