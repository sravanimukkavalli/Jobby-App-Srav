import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">
          Find The Job That Fits <br /> Your Life
        </h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews.Find the job that fits your ability and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-job-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
