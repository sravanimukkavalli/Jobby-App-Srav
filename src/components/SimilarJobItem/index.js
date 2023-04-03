import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import './index.css'

const SimilarJobItem = props => {
  const {eachSimilarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachSimilarJob
  return (
    <li className="similar-container">
      <div className="first-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="company-description">Description</h1>
      <span className="job-description">{jobDescription}</span>
      <div className="location-container">
        <MdLocationOn className="location-icon" />
        <span className="company-rating">{location}</span>
        <MdBusinessCenter className="location-icon" />
        <span className="company-rating">{employmentType}</span>
      </div>
    </li>
  )
}
export default SimilarJobItem
