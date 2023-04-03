import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Profile from '../Profile'
import Header from '../Header'
import JobItem from '../JobItem'
import FilterGroups from '../FilterGroups'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    employee: [],
    salary: '',
    jobData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {employee, salary, searchInput} = this.state
    console.log(employee)
    const jobUrl = `https://apis.ccbp.in/jobs?employment_type=${employee}&minimum_package=${salary}&search=${searchInput}`
    console.log(jobUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updateData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeEmployee = employeeId => {
    const {employee} = this.state
    if (employee.length === 0) {
      this.setState({employee: employeeId}, this.getJobs)
    } else {
      this.setState(
        prevState => ({
          employee: [prevState.employee, employeeId],
        }),
        this.getJobs,
      )
    }
  }

  onChangeSalary = salaryId => {
    this.setState({salary: salaryId}, this.getJobs)
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobs()
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

  onClickSearch = () => {
    this.getJobs()
  }

  renderSuccessView = () => {
    const {jobData, searchInput} = this.state
    console.log(jobData);
    const isJobsAvailable = jobData.length > 0
    return (
      <div>
        <div className="search-lg-container">
          <input
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            className="search"
          />
          <button
            type="button"
            className="search-icon search-button"
            onClick={this.onClickSearch}
          >
            <BsSearch className="search" />
          </button>
        </div>
        {isJobsAvailable ? (
          <div className="failure-container">
            <ul className="job-list-container">
              {jobData.map(each => (
                <JobItem key={each.id} jobDetails={each} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="failure-img"
            />
            <h1 className="failure-heading">No Jobs Found</h1>
            <p className="failure-description">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )}
      </div>
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
    const {searchInput} = this.state

    return (
      <div className="total-container">
        <Header />
        <div className="job-container">
          <div className="align-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="search"
              />
              <button
                type="button"
                className="search-icon search-button"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search" />
              </button>
            </div>
            <div className="profile-list-container">
              <Profile />
            </div>
            <hr className="hr-line" />
            <FilterGroups
              employeeList={employmentTypesList}
              onChangeEmployee={this.onChangeEmployee}
              salaryList={salaryRangesList}
              onChangeSalary={this.onChangeSalary}
            />
          </div>
          {this.renderResultView()}
        </div>
      </div>
    )
  }
}
export default Jobs
