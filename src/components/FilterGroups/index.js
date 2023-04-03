

const FilterGroups = props => {
  const renderEmployeesList = () => {
    const {employeeList} = props
    return employeeList.map(employee => {
      const {onChangeEmployee} = props
      const onClickEmployee = () => {
        onChangeEmployee(employee.employmentTypeId)
      }
      const {label} = employee
      return (
        <li
          key={employee.employmentTypeId}
          className="each-list-employee"
          onClick={onClickEmployee}
          value={label}
        >
          <input type="checkbox" id="label" />
          <label htmlFor="label" className="filter-items">
            {label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryList = () => {
    const {salaryList} = props
    return salaryList.map(salary => {
      const {onChangeSalary} = props
      const onClickSalary = () => {
        onChangeSalary(salary.salaryRangeId)
      }
      const {label} = salary
      return (
        <li
          key={salary.salaryRangeId}
          className="each-list-employee"
          onClick={onClickSalary}
          value={label}
        >
          <input type="radio" name="salary" id="salary" />
          <label htmlFor="salary" className="filter-items">
            {label}
          </label>
        </li>
      )
    })
  }

  const renderEmployees = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="employees-container">{renderEmployeesList()}</ul>
    </>
  )

  const renderSalaries = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="employees-container">{renderSalaryList()}</ul>
    </>
  )

  return (
    <div>
      {renderEmployees()}
      <hr className="hr-line" />
      {renderSalaries()}
    </div>
  )
}
export default FilterGroups
