import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobItemDetails: {}}

  componentDidMount() {
    this.getJobItems()
  }

  convertToJsObject = jobDetails => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    skills: jobDetails.skills,
    lifeAtCompany: jobDetails.life_at_company,
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
    title: jobDetails.title,
  })

  getJobItems = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItemDetails: data,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobItems()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobItemDetails} = this.state
    console.log(jobItemDetails)
    const updateData = this.convertToJsObject(jobItemDetails.job_details)
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = updateData
    const skillsList = updateData.skills.map(eachSkill => ({
      name: eachSkill.name,
      imageUrl: eachSkill.image_url,
    }))
    const lifeAtCompanyList = {
      imageUrl: updateData.lifeAtCompany.image_url,
      description: updateData.lifeAtCompany.description,
    }
    const similarJob = jobItemDetails.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    console.log(similarJob)
    return (
      <>
        <div className="each-job-list-item">
          <div className="first-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="description-container">
            <h1 className="company-description">Description</h1>
            <div>
              <a href={companyWebsiteUrl} className="visit-container">
                Visit <BsBoxArrowUpRight />
              </a>
            </div>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="company-description">Skills</h1>
          <ul className="list-skill-container">
            {skillsList.map(skill => (
              <li className="list-skill">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="skill-img"
                />
                <p className="job-description">{skill.name}</p>
              </li>
            ))}
          </ul>
          <div className="company-life-container">
            <div>
              <h1 className="company-description">Life at Company</h1>
              <p className="job-description">{lifeAtCompanyList.description}</p>
            </div>
            <img
              src={lifeAtCompanyList.imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="company-description">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJob.map(job => (
            <SimilarJobItem key={job.id} eachSimilarJob={job} />
          ))}
        </ul>
      </>
    )
  }

  renderResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header />
        <div className="job-items-container">{this.renderResultView()}</div>
      </div>
    )
  }
}
export default JobItemDetails
