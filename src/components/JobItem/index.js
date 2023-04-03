import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
    id,
  } = jobDetails
  return (
    <Link to={`jobs/${id}`} style={{textDecoration: 'none'}}>
      <li className="each-list-item">
        <div className="first-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="company-name-container">
            <p className="company-title">{title}</p>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <span className="company-rating">{rating}</span>
            </div>
          </div>
        </div>
        <div className="location-full-container">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <span className="company-rating">{location}</span>
            <MdBusinessCenter className="location-icon" />
            <span className="company-rating">{employmentType}</span>
          </div>
          <span className="company-rating">{packagePerAnnum}</span>
        </div>
        <hr className="line" />
        <h1 className="company-description">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItem
