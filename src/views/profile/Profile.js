import React, { useEffect, useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilUser, cilCalendar, cilMoney, cilX } from '@coreui/icons'

import { appwrite, objectifySubStrings, stringifySubObjects } from 'src/functions/appwrite'
import { profileDataStructure } from './profileDataStructure'

const Profile = () => {
  const [account, setAccount] = useState(null)
  const [dataID, setDataID] = useState()

  const [currentStep, setCurrentStep] = useState(1)

  const [notCreated, setNotCreated] = useState(false)

  const [data, setData] = useState(
    localStorage.getItem('profile')
      ? JSON.parse(localStorage.getItem('profile'))
      : profileDataStructure,
  )

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(data))
    console.log('Data', data)
  }, [data])

  const getAccountInfo = async () => {
    const res = await appwrite.getAccount()
    console.log(res)
    setAccount(res)
    setData({ ...data, user: res.$id })

    setCurrentStep(1)

    console.log(res.$id)

    try {
      const user = await appwrite.fetchUser(res.$id)
      console.log('User', user)
      // setAccount(data)

      setDataID(user.$id)

      if (localStorage.getItem('profile')) {
        setData(JSON.parse(localStorage.getItem('profile')))
      } else {
        setData(objectifySubStrings(user))
        localStorage.removeItem('profile')
      }

      setNotCreated(false)
    } catch (error) {
      console.log(error)
      setNotCreated(true)
    }
  }

  const updateData = async () => {
    try {
      const res = await appwrite.updateUser(dataID, stringifySubObjects(data), account.$id)
      console.log(res)
      alert('Profile Updated Successfully!')
      //   getAccountInfo()
      localStorage.removeItem('profile')
    } catch (error) {
      console.log(error)
      alert('An Error Occured')
    }
  }

  const createData = async () => {
    try {
      const res = await appwrite.createUser(stringifySubObjects(data))
      console.log(res)
      alert('Profile Created Successfully!')
      //   getAccountInfo()
      localStorage.removeItem('profile')
    } catch (error) {
      console.log(error)
      alert('An Error Occured')
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAccountInfo(), [])

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 id="traffic" className="card-title mb-0">
                Profile
              </h4>
              <div className="small text-medium-emphasis">User Information</div>
            </CCol>
            {/* <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol> */}
          </CRow>

          <CForm className="row mt-3 gx-3 gy-2 align-items-center">
            <CCol sm={6}>
              <CFormLabel htmlFor="specificSizeInputGroupUsername">Username</CFormLabel>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  disabled={true}
                  id="specificSizeInputGroupUsername"
                  placeholder="Username"
                  value={account ? account.name : 'Loading...'}
                />
              </CInputGroup>
            </CCol>
            <CCol sm={6}>
              <CFormLabel htmlFor="specificSizeInputGroupUsername">Email</CFormLabel>
              <CInputGroup>
                <CInputGroupText>@</CInputGroupText>
                <CFormInput
                  disabled={true}
                  id="specificSizeInputGroupUsername"
                  placeholder="Email"
                  value={account ? account.email : 'Loading...'}
                />
              </CInputGroup>
              {/* <h1>Name: {account ? account.name : 'Loading...'}</h1>
              <h1>Email: {account ? account.email : 'Loading...'}</h1> */}
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 id="traffic" className="card-title mb-0">
                Step {currentStep}
              </h4>
              <div className="small text-medium-emphasis">
                {currentStep === 1
                  ? 'Company Information'
                  : currentStep === 2
                  ? 'Operations Information'
                  : currentStep === 3
                  ? 'Last Step'
                  : ''}
              </div>
            </CCol>
          </CRow>

          <div className="mt-4">
            {currentStep === 1 ? (
              <>
                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>General</CCardHeader>
                      <CCardBody>
                        <CForm className="row gx-3 gy-2 align-items-center">
                          <CCol sm={6}>
                            <CFormLabel htmlFor="company_name">Company Name</CFormLabel>
                            <CFormInput
                              id="company_name"
                              placeholder="Company Name"
                              value={data.company_name}
                              onChange={(e) => setData({ ...data, company_name: e.target.value })}
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="currency">Currency</CFormLabel>
                            <CFormSelect
                              id="currency"
                              value={data.currency}
                              onChange={(e) => setData({ ...data, currency: e.target.value })}
                            >
                              <option disabled value="">
                                Currency
                              </option>
                              <option value="USD">USD</option>
                              <option value="GBP">GBP</option>
                              <option value="NGN">NGN</option>
                            </CFormSelect>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="model_start_date">Model Start Date</CFormLabel>
                            <CFormInput
                              id="model_start_date"
                              placeholder="Model Start Date"
                              type="date"
                              value={data.model_start_date}
                              onChange={(e) =>
                                setData({ ...data, model_start_date: e.target.value })
                              }
                            />
                          </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>Financial Statement (Monthly)</CCardHeader>
                      <CCardBody>
                        <CForm className="row gx-3 gy-2 align-items-center">
                          <CCol sm={6}>
                            <CFormLabel htmlFor="initial_cash_balance">
                              Initial Cash Balance
                            </CFormLabel>
                            <CFormInput
                              id="initial_cash_balance"
                              placeholder="Initial Cash Balance"
                              value={data.initial_cash_balance}
                              type="number"
                              onChange={(e) =>
                                setData({ ...data, initial_cash_balance: e.target.value })
                              }
                            />
                          </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>Financial Statement (Annual)</CCardHeader>
                      <CCardBody>
                        <CForm className="row gx-3 gy-2 align-items-center">
                          <CCol sm={12}>
                            <small>
                              <b>Taxes & Inflation</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="income_tax_rate">Income Tax Rate</CFormLabel>
                            <CFormInput
                              id="income_tax_rate"
                              placeholder="Income Tax Rate"
                              type="number"
                              value={data.taxes?.income_tax_rate}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  taxes: { ...data.taxes, income_tax_rate: e.target.value },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inflation">Inflation</CFormLabel>
                            <CFormInput
                              id="inflation"
                              placeholder="Inflation"
                              type="number"
                              value={data.taxes?.inflation}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  taxes: { ...data.taxes, inflation: e.target.value },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Valuation</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="business_terminal_value">
                              Business Terminal Value
                            </CFormLabel>
                            <CFormInput
                              id="business_terminal_value"
                              placeholder="Business Terminal Value"
                              type="text"
                              value={data.valuation?.business_terminal_value}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  valuation: {
                                    ...data.valuation,
                                    business_terminal_value: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="discount_rate_today">
                              Discount Rate - Today
                            </CFormLabel>
                            <CFormInput
                              id="discount_rate_today"
                              placeholder="Discount Rate - Today"
                              type="number"
                              value={data.valuation?.discount_rate_today}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  valuation: {
                                    ...data.valuation,
                                    discount_rate_today: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="xEBITDA">xEBITDA</CFormLabel>
                            <CFormInput
                              id="xEBITDA"
                              placeholder="xEBITDA"
                              type="number"
                              value={data.valuation?.xEBITDA}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  valuation: {
                                    ...data.valuation,
                                    xEBITDA: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="debt_capital_ratio">Debt/Capital Ratio</CFormLabel>
                            <CFormInput
                              id="debt_capital_ratio"
                              placeholder="Debt/Capital Ratio"
                              type="number"
                              value={data.valuation?.debt_capital_ratio}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  valuation: {
                                    ...data.valuation,
                                    debt_capital_ratio: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="debt_interest_rate">Debt Interest Rate</CFormLabel>
                            <CFormInput
                              id="debt_interest_rate"
                              placeholder="Debt Interest Rate"
                              type="number"
                              value={data.valuation?.debt_interest_rate}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  valuation: {
                                    ...data.valuation,
                                    debt_interest_rate: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>Capital Expenditures</CCardHeader>
                      <CCardBody>
                        <CForm className="row gx-3 gy-2 align-items-center">
                          <CCol sm={12}>
                            <small>
                              <b>Operating Cash</b>
                            </small>
                          </CCol>
                          <CCol sm={6}>
                            <CFormLabel htmlFor="operating_cash_balance">Balance</CFormLabel>
                            <CFormInput
                              id="operating_cash_balance"
                              placeholder="Balance"
                              type="number"
                              value={data.operating_cash?.balance}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  operating_cash: {
                                    ...data.operating_cash,
                                    balance: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="operating_cash_percentage_of_revenues">
                              Percentage of Revenues
                            </CFormLabel>
                            <CFormInput
                              id="operating_cash_percentage_of_revenues"
                              placeholder="Percentage of Revenues"
                              type="number"
                              value={data.operating_cash?.percentage_of_revenues}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  operating_cash: {
                                    ...data.operating_cash,
                                    percentage_of_revenues: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="operating_cash_pending_income_total_income">
                              Pending Income/Total Income
                            </CFormLabel>
                            <CFormInput
                              id="operating_cash_pending_income_total_income"
                              placeholder="Percentage of Revenues"
                              type="number"
                              value={data.operating_cash?.pending_income_total_income}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  operating_cash: {
                                    ...data.operating_cash,
                                    pending_income_total_income: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="operating_cash_prepaid_days_outstanding">
                              Pre-paid Days Outstanding
                            </CFormLabel>
                            <CFormInput
                              id="operating_cash_prepaid_days_outstanding"
                              placeholder="Pre-paid Days Outstanding"
                              type="number"
                              value={data.operating_cash?.prepaid_days_outstanding}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  operating_cash: {
                                    ...data.operating_cash,
                                    prepaid_days_outstanding: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="operating_cash_accounts_payable">
                              A/P as % of total COGS
                            </CFormLabel>
                            <CFormInput
                              id="operating_cash_accounts_payable"
                              placeholder="A/P as % of total COGS"
                              type="number"
                              value={data.operating_cash?.accounts_payable}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  operating_cash: {
                                    ...data.operating_cash,
                                    accounts_payable: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Capital Expenditures</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="capital_expenditures_estimate_new_computers">
                              Automatically estimate new computer purchases for new employees
                            </CFormLabel>
                            <CFormSelect
                              id="capital_expenditures_estimate_new_computers"
                              value={data.capital_expenditures?.estimate_new_computers}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  capital_expenditures: {
                                    ...data.capital_expenditures,
                                    estimate_new_computers: e.target.value,
                                  },
                                })
                              }
                            >
                              <option value="" disabled>
                                Select an Option
                              </option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </CFormSelect>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="capital_expenditures_price_per_computer">
                              Price Per Computer
                            </CFormLabel>
                            <CFormInput
                              id="capital_expenditures_price_per_computer"
                              placeholder="Price Per Computer"
                              type="number"
                              value={data.capital_expenditures?.price_per_computer}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  capital_expenditures: {
                                    ...data.capital_expenditures,
                                    price_per_computer: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Time for Assets to Depreciate</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="assets_depreciation_time_apartment_office_fixings">
                              Apartment/Office Fixings
                            </CFormLabel>
                            <CFormInput
                              id="assets_depreciation_time_apartment_office_fixings"
                              placeholder="Apartment/Office Fixings"
                              type="number"
                              value={data.assets_depreciation_time?.apartment_office_fixings}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  assets_depreciation_time: {
                                    ...data.assets_depreciation_time,
                                    apartment_office_fixings: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="assets_depreciation_time_office_furniture">
                              Office Furniture
                            </CFormLabel>
                            <CFormInput
                              id="assets_depreciation_time_office_furniture"
                              placeholder="Office Furniture"
                              type="number"
                              value={data.assets_depreciation_time?.office_furniture}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  assets_depreciation_time: {
                                    ...data.assets_depreciation_time,
                                    office_furniture: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="assets_depreciation_time_computers">
                              Computers
                            </CFormLabel>
                            <CFormInput
                              id="assets_depreciation_time_computers"
                              placeholder="Computers"
                              type="number"
                              value={data.assets_depreciation_time?.computers}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  assets_depreciation_time: {
                                    ...data.assets_depreciation_time,
                                    computers: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="assets_depreciation_time_telecom_equipment">
                              Telecom Equipment
                            </CFormLabel>
                            <CFormInput
                              id="assets_depreciation_time_telecom_equipment"
                              placeholder="Telecom Equipment"
                              type="number"
                              value={data.assets_depreciation_time?.telecom_equipment}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  assets_depreciation_time: {
                                    ...data.assets_depreciation_time,
                                    telecom_equipment: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="assets_depreciation_time_tech_infrastructure">
                              Servers & Other Tech Infrastructure
                            </CFormLabel>
                            <CFormInput
                              id="assets_depreciation_time_tech_infrastructure"
                              placeholder="Servers & Other Tech Infrastructure"
                              type="number"
                              value={data.assets_depreciation_time?.tech_infrastructure}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  assets_depreciation_time: {
                                    ...data.assets_depreciation_time,
                                    tech_infrastructure: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="assets_depreciation_time_other">Other</CFormLabel>
                            <CFormInput
                              id="assets_depreciation_time_other"
                              placeholder="Other"
                              type="number"
                              value={data.assets_depreciation_time?.other}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  assets_depreciation_time: {
                                    ...data.assets_depreciation_time,
                                    other: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs={12} style={{ textAlign: 'right' }}>
                    <CButton color="primary" className="px-4" onClick={() => setCurrentStep(2)}>
                      Next
                    </CButton>
                  </CCol>
                </CRow>
              </>
            ) : currentStep === 2 ? (
              <>
                <CRow>
                  <CCol xs>
                    {data.team.map(
                      (
                        {
                          role,
                          category,
                          subCategory,
                          salary,
                          taxes_and_benefits,
                          date_hired,
                          number_of_new_hires,
                          period_of_new_hires,
                          maximum_number,
                          annual_increase,
                        },
                        i,
                      ) => {
                        let team = data.team

                        const setOperation = (newData) => {
                          team[i] = { ...team[i], ...newData }
                          setData({ ...data, team })
                        }

                        const removeOperation = (i) => {
                          team.splice(i, 1)
                          setData({ ...data, team })
                        }

                        return (
                          <CCard key={i} className="mb-4">
                            {(data.team ? data.team.length : 1) > 1 ? (
                              <CCardHeader style={{ textAlign: 'right' }}>
                                <div
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => removeOperation(i)}
                                >
                                  <CIcon icon={cilX} />
                                  Remove
                                </div>
                              </CCardHeader>
                            ) : (
                              ''
                            )}
                            <CCardBody>
                              <CForm className="row gx-3 gy-2 align-items-center">
                                <CCol sm={6}>
                                  <CFormLabel htmlFor={`team_role_${i}`}>Role</CFormLabel>
                                  <CInputGroup>
                                    <CInputGroupText>
                                      <CIcon icon={cilUser} />
                                    </CInputGroupText>
                                    <CFormInput
                                      id={`team_role_${i}`}
                                      placeholder="Role"
                                      value={role}
                                      onChange={(e) => setOperation({ role: e.target.value })}
                                    />
                                  </CInputGroup>
                                </CCol>

                                <CCol sm={6}>
                                  <CFormLabel htmlFor={`team_category_${i}`}>
                                    Expense Category
                                  </CFormLabel>
                                  <CFormSelect
                                    id={`team_category_${i}`}
                                    value={category}
                                    onChange={(e) => setOperation({ category: e.target.value })}
                                  >
                                    <option value="" disabled>
                                      Select a Category
                                    </option>
                                    <option value="Ops">Ops</option>
                                    <option value="R&D">R&D</option>
                                    <option value="Growth">Growth</option>
                                  </CFormSelect>
                                </CCol>

                                <CCol sm={6}>
                                  <CFormLabel htmlFor={`team_subcategory_${i}`}>
                                    Sub-Category
                                  </CFormLabel>
                                  <CFormSelect
                                    id={`team_subcategory_${i}`}
                                    value={subCategory}
                                    onChange={(e) => setOperation({ subCategory: e.target.value })}
                                  >
                                    <option value="" disabled>
                                      Select a Sub-Category
                                    </option>
                                    <option value="">None</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Marketing">Marketing</option>
                                  </CFormSelect>
                                </CCol>

                                <CCol sm={6}>
                                  <CFormLabel htmlFor={`team_salary_${i}`}>
                                    Annual Salary
                                  </CFormLabel>
                                  <CInputGroup>
                                    <CInputGroupText>
                                      <CIcon icon={cilMoney} />
                                    </CInputGroupText>
                                    <CFormInput
                                      id={`team_salary_${i}`}
                                      placeholder="Annual Salary"
                                      type="number"
                                      value={salary}
                                      onChange={(e) => {
                                        setOperation({ salary: e.target.value })
                                      }}
                                    />
                                  </CInputGroup>
                                </CCol>

                                <CCol sm={6}>
                                  <CFormLabel htmlFor={`team_taxes_and_benefits_${i}`}>
                                    Payroll Taxes + Benefits
                                  </CFormLabel>
                                  <CInputGroup>
                                    <CInputGroupText>
                                      <CIcon icon={cilMoney} />
                                    </CInputGroupText>
                                    <CFormInput
                                      id={`team_taxes_and_benefits_${i}`}
                                      placeholder="Payroll Taxes + Benefits"
                                      type="number"
                                      value={taxes_and_benefits}
                                      onChange={(e) => {
                                        setOperation({ taxes_and_benefits: e.target.value })
                                      }}
                                    />
                                  </CInputGroup>
                                </CCol>

                                <CCol sm={6}>
                                  <CFormLabel htmlFor={`team_date_hired_${i}`}>
                                    First Hire
                                  </CFormLabel>
                                  <CInputGroup>
                                    <CInputGroupText>
                                      <CIcon icon={cilCalendar} />
                                    </CInputGroupText>
                                    <CFormInput
                                      id={`team_date_hired_${i}`}
                                      placeholder="Payroll Taxes + Benefits"
                                      type="date"
                                      value={date_hired}
                                      onChange={(e) => {
                                        setOperation({ date_hired: e.target.value })
                                      }}
                                    />
                                  </CInputGroup>
                                </CCol>

                                <CCol sm={6}>
                                  <CFormLabel htmlFor={`team_number_of_new_hires_${i}`}>
                                    How many hires added per period?
                                  </CFormLabel>
                                  <CInputGroup>
                                    <CInputGroupText>
                                      <CIcon icon={cilPeople} />
                                    </CInputGroupText>
                                    <CFormInput
                                      id={`team_number_of_new_hires_${i}`}
                                      placeholder="How many hires added per period?"
                                      type="number"
                                      value={number_of_new_hires}
                                      onChange={(e) => {
                                        setOperation({ number_of_new_hires: e.target.value })
                                      }}
                                    />
                                  </CInputGroup>
                                </CCol>

                                <CCol sm={6}>
                                  <CFormLabel htmlFor={`team_period_of_new_hires_${i}`}>
                                    How often are new hires added?
                                  </CFormLabel>
                                  <CFormSelect
                                    id={`team_period_of_new_hires_${i}`}
                                    value={period_of_new_hires}
                                    onChange={(e) => {
                                      setOperation({ period_of_new_hires: e.target.value })
                                    }}
                                  >
                                    <option value="" disabled>
                                      Select Period
                                    </option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Annually">Annually</option>
                                    <option value="Never">Never</option>
                                  </CFormSelect>
                                </CCol>

                                <CCol sm={6}>
                                  <CFormLabel htmlFor={`team_maximum_number_${i}`}>
                                    Maximum Team
                                  </CFormLabel>
                                  <CInputGroup>
                                    <CInputGroupText>
                                      <CIcon icon={cilPeople} />
                                    </CInputGroupText>
                                    <CFormInput
                                      id={`team_maximum_number_${i}`}
                                      placeholder="Maximum Team"
                                      type="number"
                                      value={maximum_number}
                                      onChange={(e) => {
                                        setOperation({ maximum_number: e.target.value })
                                      }}
                                    />
                                  </CInputGroup>
                                </CCol>

                                <CCol sm={6}>
                                  <CFormLabel htmlFor={`team_annual_increase_${i}`}>
                                    Annual Increase
                                  </CFormLabel>
                                  <CInputGroup>
                                    <CInputGroupText>
                                      <CIcon icon={cilPeople} />
                                    </CInputGroupText>
                                    <CFormInput
                                      id={`team_annual_increase_${i}`}
                                      placeholder="Annual Increase"
                                      type="number"
                                      value={annual_increase}
                                      onChange={(e) => {
                                        setOperation({ annual_increase: e.target.value })
                                      }}
                                    />
                                  </CInputGroup>
                                </CCol>
                              </CForm>
                            </CCardBody>
                          </CCard>
                        )
                      },
                    )}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs={12} style={{ textAlign: 'right' }}>
                    <CButton
                      color="primary"
                      className="px-4"
                      onClick={() => {
                        let team = data.team

                        team.push({
                          role: '',
                          category: '',
                          salary: '',
                          taxes_and_benefits: '',
                          date_hired: '',
                          number_of_new_hires: '',
                          period_of_new_hires: '',
                          maximum_number: '',
                          annual_increase: '',
                        })

                        setData({ ...data, team })
                      }}
                    >
                      Add
                    </CButton>
                  </CCol>
                </CRow>

                <CRow className="mt-5">
                  <CCol xs={6}>
                    <CButton color="primary" className="px-4" onClick={() => setCurrentStep(1)}>
                      Previous
                    </CButton>
                  </CCol>
                  <CCol xs={6} style={{ textAlign: 'right' }}>
                    <CButton color="primary" className="px-4" onClick={() => setCurrentStep(3)}>
                      Next
                    </CButton>
                  </CCol>
                </CRow>
              </>
            ) : currentStep === 3 ? (
              <>
                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>General</CCardHeader>
                      <CCardBody>
                        <CForm className="row gx-3 gy-2 align-items-center">
                          <CCol sm={6}>
                            <CFormLabel htmlFor="fundraising_close_date">
                              Fundraising Close Date
                            </CFormLabel>
                            <CFormInput
                              id="fundraising_close_date"
                              placeholder="Fundraising Close Date"
                              type="date"
                              value={data.fundraising_close_date}
                              onChange={(e) =>
                                setData({ ...data, fundraising_close_date: e.target.value })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="investment_amount">Investment Amount</CFormLabel>
                            <CFormInput
                              id="investment_amount"
                              placeholder="Investment Amount"
                              type="number"
                              value={data.investment_amount}
                              onChange={(e) =>
                                setData({ ...data, investment_amount: e.target.value })
                              }
                            />
                          </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>Organic Website Traffic</CCardHeader>
                      <CCardBody>
                        <CForm className="row gx-3 gy-2 align-items-center">
                          <CCol sm={12}>
                            <small>
                              <b>Brand Awareness Budget</b>
                            </small>
                          </CCol>
                          <CCol sm={6}>
                            <CFormLabel htmlFor="brand_awareness_budget_starting_budget">
                              Starting Budget
                            </CFormLabel>
                            <CFormInput
                              id="brand_awareness_budget_starting_budget"
                              placeholder="Starting Budget"
                              type="number"
                              value={data.brand_awareness_budget.starting_budget}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  brand_awareness_budget: {
                                    ...data.brand_awareness_budget,
                                    starting_budget: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="brand_awareness_budget_monthly_marketing_budget_increase">
                              Monthly Marketing Budget Increase
                            </CFormLabel>
                            <CFormInput
                              id="brand_awareness_budget_monthly_marketing_budget_increase"
                              placeholder="Monthly Marketing Budget Increase"
                              type="number"
                              value={data.brand_awareness_budget.monthly_marketing_budget_increase}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  brand_awareness_budget: {
                                    ...data.brand_awareness_budget,
                                    monthly_marketing_budget_increase: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="brand_awareness_budget_maximum_marketing_budget">
                              Maximum Marketing Budget
                            </CFormLabel>
                            <CFormInput
                              id="brand_awareness_budget_maximum_marketing_budget"
                              placeholder="Maximum Marketing Budget"
                              type="number"
                              value={data.brand_awareness_budget.maximum_marketing_budget}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  brand_awareness_budget: {
                                    ...data.brand_awareness_budget,
                                    maximum_marketing_budget: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Website Traffic</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="website_traffic_start_date">
                              Organic Traffic Efforts Kick-Off
                            </CFormLabel>
                            <CFormInput
                              id="website_traffic_start_date"
                              placeholder="Organic Traffic Efforts Kick-Off"
                              type="date"
                              value={data.website_traffic.start_date}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  website_traffic: {
                                    ...data.website_traffic,
                                    start_date: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="website_traffic_traffic_at_launch">
                              Website Traffic at launch
                            </CFormLabel>
                            <CFormInput
                              id="website_traffic_traffic_at_launch"
                              placeholder="Website Traffic at launch"
                              type="number"
                              value={data.website_traffic.traffic_at_launch}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  website_traffic: {
                                    ...data.website_traffic,
                                    traffic_at_launch: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="website_traffic_monthly_increase">
                              Monthly Traffic Increase
                            </CFormLabel>
                            <CFormInput
                              id="website_traffic_monthly_increase"
                              placeholder="Monthly Traffic Increase"
                              type="number"
                              value={data.website_traffic.monthly_increase}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  website_traffic: {
                                    ...data.website_traffic,
                                    monthly_increase: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="website_traffic_maximum_traffic">
                              Maximum Possible Organic Website Traffic
                            </CFormLabel>
                            <CFormInput
                              id="website_traffic_maximum_traffic"
                              placeholder="Maximum Possible Organic Website Traffic"
                              type="number"
                              value={data.website_traffic.maximum_traffic}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  website_traffic: {
                                    ...data.website_traffic,
                                    maximum_traffic: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <CRow>
                          <CCol sm={6}>Self-Service Subscriptions</CCol>
                          <CCol sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CFormSwitch
                              id="self_service_subscriptions"
                              checked={data.self_service_subscriptions}
                              onChange={(e) =>
                                setData({ ...data, self_service_subscriptions: e.target.checked })
                              }
                            />
                          </CCol>
                        </CRow>
                      </CCardHeader>
                      <CCardBody>
                        <CForm className="row gx-3 gy-2 align-items-center">
                          <CCol sm={12}>
                            <small>
                              <b>Business Model</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_business_model_launch_date">
                              Expected Launch
                            </CFormLabel>
                            <CFormInput
                              id="self_service_business_model_launch_date"
                              placeholder="Expected Launch"
                              type="date"
                              value={data.self_service_business_model?.launch_date}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_business_model: {
                                    ...data.self_service_business_model,
                                    launch_date: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_business_model_ARPU">ARPU</CFormLabel>
                            <CFormInput
                              id="self_service_business_model_ARPU"
                              placeholder="ARPU"
                              type="number"
                              value={data.self_service_business_model?.ARPU}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_business_model: {
                                    ...data.self_service_business_model,
                                    ARPU: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_business_model_billing_term">
                              How will you primarily bill your customers
                            </CFormLabel>
                            <CFormSelect
                              id="self_service_business_model_billing_term"
                              value={data.self_service_business_model.billing_term}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_business_model: {
                                    ...data.self_service_business_model,
                                    billing_term: e.target.value,
                                  },
                                })
                              }
                            >
                              <option value="" disabled>
                                Select Billing Term
                              </option>
                              <option value="Monthly">Monthly</option>
                              <option value="Quarterly">Quarterly</option>
                              <option value="Annually">Annually</option>
                              <option value="Never">Never</option>
                            </CFormSelect>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_business_model_churn_rate">
                              Expected Monthly Churn Rate
                            </CFormLabel>
                            <CFormInput
                              id="self_service_business_model_churn_rate"
                              placeholder="Expected Monthly Churn Rate"
                              type="number"
                              value={data.self_service_business_model?.churn_rate}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_business_model: {
                                    ...data.self_service_business_model,
                                    churn_rate: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_business_model_lifetime_value">
                              Expected Lifetime Value
                            </CFormLabel>
                            <CFormInput
                              id="self_service_business_model_lifetime_value"
                              placeholder="Expected Lifetime Value"
                              type="number"
                              value={data.self_service_business_model?.lifetime_value}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_business_model: {
                                    ...data.self_service_business_model,
                                    lifetime_value: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Organic Traffic</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_conversion_to_paid">
                              Organic Traffic Conversion to Paid
                            </CFormLabel>
                            <CFormInput
                              id="self_service_conversion_to_paid"
                              placeholder="Organic Traffic Conversion to Paid"
                              type="number"
                              value={data.self_service_conversion_to_paid}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_conversion_to_paid: e.target.value,
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Paid Traffic</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_paid_traffic_starting_marketing_budget">
                              Starting Marketing Budget
                            </CFormLabel>
                            <CFormInput
                              id="self_service_paid_traffic_starting_marketing_budget"
                              placeholder="Starting Marketing Budget"
                              type="number"
                              value={data.self_service_paid_traffic?.starting_marketing_budget}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_paid_traffic: {
                                    ...data.paid_traffic,
                                    starting_marketing_budget: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_paid_traffic_marketing_budget_increase">
                              Monthly Marketing Budget Increase
                            </CFormLabel>
                            <CFormInput
                              id="self_service_paid_traffic_marketing_budget_increase"
                              placeholder="Monthly Marketing Budget Increase"
                              type="number"
                              value={data.self_service_paid_traffic?.marketing_budget_increase}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_paid_traffic: {
                                    ...data.self_service_paid_traffic,
                                    marketing_budget_increase: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_paid_traffic_maximum_paid_ads_budget">
                              Maximum Paid Ads Marketing Budget
                            </CFormLabel>
                            <CFormInput
                              id="self_service_paid_traffic_maximum_paid_ads_budget"
                              placeholder="Maximum Paid Ads Marketing Budget"
                              type="number"
                              value={data.self_service_paid_traffic?.maximum_paid_ads_budget}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_paid_traffic: {
                                    ...data.self_service_paid_traffic,
                                    maximum_paid_ads_budget: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_paid_traffic_expected_CAC">
                              Expected CAC, First Month
                            </CFormLabel>
                            <CFormInput
                              id="self_service_paid_traffic_expected_CAC"
                              placeholder="Expected CAC, First Month"
                              type="number"
                              value={data.self_service_paid_traffic?.expected_CAC}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_paid_traffic: {
                                    ...data.self_service_paid_traffic,
                                    expected_CAC: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_paid_traffic_monthly_CAC_change">
                              Monthly CAC change
                            </CFormLabel>
                            <CFormInput
                              id="self_service_paid_traffic_monthly_CAC_change"
                              placeholder="Monthly CAC change"
                              type="number"
                              value={data.self_service_paid_traffic?.monthly_CAC_change}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_paid_traffic: {
                                    ...data.self_service_paid_traffic,
                                    monthly_CAC_change: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="self_service_paid_traffic_minimum_CAC_possible">
                              Minimum CAC possible
                            </CFormLabel>
                            <CFormInput
                              id="self_service_paid_traffic_minimum_CAC_possible"
                              placeholder="Minimum CAC possible"
                              type="number"
                              value={data.self_service_paid_traffic?.minimum_CAC_possible}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  self_service_paid_traffic: {
                                    ...data.self_service_paid_traffic,
                                    minimum_CAC_possible: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <CRow>
                          <CCol sm={6}>Inbound Sales</CCol>
                          <CCol sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CFormSwitch
                              id="inbound_sales"
                              checked={data.inbound_sales}
                              onChange={(e) =>
                                setData({ ...data, inbound_sales: e.target.checked })
                              }
                            />
                          </CCol>
                        </CRow>
                      </CCardHeader>
                      <CCardBody>
                        <CForm className="row gx-3 gy-2 align-items-center">
                          <CCol sm={12}>
                            <small>
                              <b>Business Model</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_business_model_launch_date">
                              Expected Launch
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_business_model_launch_date"
                              placeholder="Expected Launch"
                              type="date"
                              value={data.inbound_sales_business_model?.launch_date}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_business_model: {
                                    ...data.inbound_sales_business_model,
                                    launch_date: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_business_model_ARPU">
                              ARPU
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_business_model_ARPU"
                              placeholder="ARPU"
                              type="number"
                              value={data.inbound_sales_business_model?.ARPU}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_business_model: {
                                    ...data.inbound_sales_business_model,
                                    ARPU: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_business_model_billing_term">
                              How will you primarily bill your customers
                            </CFormLabel>
                            <CFormSelect
                              id="inbound_sales_business_model_billing_term"
                              value={data.inbound_sales_business_model.billing_term}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_business_model: {
                                    ...data.inbound_sales_business_model,
                                    billing_term: e.target.value,
                                  },
                                })
                              }
                            >
                              <option value="" disabled>
                                Select Billing Term
                              </option>
                              <option value="Monthly">Monthly</option>
                              <option value="Quarterly">Quarterly</option>
                              <option value="Annually">Annually</option>
                              <option value="Never">Never</option>
                            </CFormSelect>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_business_model_churn_rate">
                              Expected Monthly Churn Rate
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_business_model_churn_rate"
                              placeholder="Expected Monthly Churn Rate"
                              type="number"
                              value={data.inbound_sales_business_model?.churn_rate}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_business_model: {
                                    ...data.inbound_sales_business_model,
                                    churn_rate: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_business_model_lifetime_value">
                              Expected Lifetime Value
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_business_model_lifetime_value"
                              placeholder="Expected Lifetime Value"
                              type="number"
                              value={data.inbound_sales_business_model?.lifetime_value}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_business_model: {
                                    ...data.inbound_sales_business_model,
                                    lifetime_value: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Organic Traffic</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_conversion_to_paid">
                              Organic Traffic Conversion to Paid
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_conversion_to_paid"
                              placeholder="Organic Traffic Conversion to Paid"
                              type="number"
                              value={data.inbound_sales_conversion_to_paid}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_conversion_to_paid: e.target.value,
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Paid Traffic</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_paid_traffic_starting_marketing_budget">
                              Starting Marketing Budget
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_paid_traffic_starting_marketing_budget"
                              placeholder="Starting Marketing Budget"
                              type="number"
                              value={data.inbound_sales_paid_traffic?.starting_marketing_budget}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_paid_traffic: {
                                    ...data.paid_traffic,
                                    starting_marketing_budget: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_paid_traffic_marketing_budget_increase">
                              Monthly Marketing Budget Increase
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_paid_traffic_marketing_budget_increase"
                              placeholder="Monthly Marketing Budget Increase"
                              type="number"
                              value={data.inbound_sales_paid_traffic?.marketing_budget_increase}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_paid_traffic: {
                                    ...data.inbound_sales_paid_traffic,
                                    marketing_budget_increase: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_paid_traffic_maximum_paid_ads_budget">
                              Maximum Paid Ads Marketing Budget
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_paid_traffic_maximum_paid_ads_budget"
                              placeholder="Maximum Paid Ads Marketing Budget"
                              type="number"
                              value={data.inbound_sales_paid_traffic?.maximum_paid_ads_budget}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_paid_traffic: {
                                    ...data.inbound_sales_paid_traffic,
                                    maximum_paid_ads_budget: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_paid_traffic_expected_CAC">
                              Expected CAC, First Month
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_paid_traffic_expected_CAC"
                              placeholder="Expected CAC, First Month"
                              type="number"
                              value={data.inbound_sales_paid_traffic?.expected_CAC}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_paid_traffic: {
                                    ...data.inbound_sales_paid_traffic,
                                    expected_CAC: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_paid_traffic_monthly_CAC_change">
                              Monthly CAC change
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_paid_traffic_monthly_CAC_change"
                              placeholder="Monthly CAC change"
                              type="number"
                              value={data.inbound_sales_paid_traffic?.monthly_CAC_change}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_paid_traffic: {
                                    ...data.inbound_sales_paid_traffic,
                                    monthly_CAC_change: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_paid_traffic_minimum_CAC_possible">
                              Minimum CAC possible
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_paid_traffic_minimum_CAC_possible"
                              placeholder="Minimum CAC possible"
                              type="number"
                              value={data.inbound_sales_paid_traffic?.minimum_CAC_possible}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_paid_traffic: {
                                    ...data.inbound_sales_paid_traffic,
                                    minimum_CAC_possible: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Agents & Lead Nurturing</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_agent_lead_nurturing_leads_per_agent">
                              Leads a single sales agent can handle per month
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_agent_lead_nurturing_leads_per_agent"
                              placeholder="Leads a single sales agent can handle per month"
                              type="number"
                              value={data.inbound_sales_agent_lead_nurturing?.leads_per_agent}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_agent_lead_nurturing: {
                                    ...data.inbound_sales_agent_lead_nurturing,
                                    leads_per_agent: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_agent_lead_nurturing_role">
                              Position in charge of lead handling and conversion
                            </CFormLabel>
                            <CFormSelect
                              id="inbound_sales_agent_lead_nurturing_role"
                              value={data.inbound_sales_agent_lead_nurturing?.role}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_agent_lead_nurturing: {
                                    ...data.inbound_sales_agent_lead_nurturing,
                                    role: e.target.value,
                                  },
                                })
                              }
                            >
                              <option value="" disabled>
                                Select a Role
                              </option>
                              {data.team
                                .filter(({ category }) => category === 'Growth')
                                .map(({ role }, i) => (
                                  <option value={role} key={i}>
                                    {role}
                                  </option>
                                ))}
                            </CFormSelect>
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Conversions</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="inbound_sales_lead_sale_conversion">
                              Lead to sale conversion rate
                            </CFormLabel>
                            <CFormInput
                              id="inbound_sales_lead_sale_conversion"
                              placeholder="Lead to sale conversion rate"
                              type="number"
                              value={data.inbound_sales_lead_sale_conversion}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  inbound_sales_lead_sale_conversion: e.target.value,
                                })
                              }
                            />
                          </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <CRow>
                          <CCol sm={6}>Outbound Sales</CCol>
                          <CCol sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CFormSwitch
                              id="outbound_sales"
                              checked={data.outbound_sales}
                              onChange={(e) =>
                                setData({ ...data, outbound_sales: e.target.checked })
                              }
                            />
                          </CCol>
                        </CRow>
                      </CCardHeader>
                      <CCardBody>
                        <CForm className="row gx-3 gy-2 align-items-center">
                          <CCol sm={12}>
                            <small>
                              <b>Business Model</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="outbound_sales_business_model_launch_date">
                              Expected Launch
                            </CFormLabel>
                            <CFormInput
                              id="outbound_sales_business_model_launch_date"
                              placeholder="Expected Launch"
                              type="date"
                              value={data.outbound_sales_business_model?.launch_date}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  outbound_sales_business_model: {
                                    ...data.outbound_sales_business_model,
                                    launch_date: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="outbound_sales_business_model_ARPU">
                              ARPU
                            </CFormLabel>
                            <CFormInput
                              id="outbound_sales_business_model_ARPU"
                              placeholder="ARPU"
                              type="number"
                              value={data.outbound_sales_business_model?.ARPU}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  outbound_sales_business_model: {
                                    ...data.outbound_sales_business_model,
                                    ARPU: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="outbound_sales_business_model_billing_term">
                              How will you primarily bill your customers
                            </CFormLabel>
                            <CFormSelect
                              id="outbound_sales_business_model_billing_term"
                              value={data.outbound_sales_business_model.billing_term}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  outbound_sales_business_model: {
                                    ...data.outbound_sales_business_model,
                                    billing_term: e.target.value,
                                  },
                                })
                              }
                            >
                              <option value="" disabled>
                                Select Billing Term
                              </option>
                              <option value="Monthly">Monthly</option>
                              <option value="Quarterly">Quarterly</option>
                              <option value="Annually">Annually</option>
                              <option value="Never">Never</option>
                            </CFormSelect>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="outbound_sales_business_model_churn_rate">
                              Expected Monthly Churn Rate
                            </CFormLabel>
                            <CFormInput
                              id="outbound_sales_business_model_churn_rate"
                              placeholder="Expected Monthly Churn Rate"
                              type="number"
                              value={data.outbound_sales_business_model?.churn_rate}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  outbound_sales_business_model: {
                                    ...data.outbound_sales_business_model,
                                    churn_rate: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="outbound_sales_business_model_lifetime_value">
                              Expected Lifetime Value
                            </CFormLabel>
                            <CFormInput
                              id="outbound_sales_business_model_lifetime_value"
                              placeholder="Expected Lifetime Value"
                              type="number"
                              value={data.outbound_sales_business_model?.lifetime_value}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  outbound_sales_business_model: {
                                    ...data.outbound_sales_business_model,
                                    lifetime_value: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Outbound Reachout</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="outbound_sales_reachout_role">
                              Position in Charge
                            </CFormLabel>
                            <CFormSelect
                              id="outbound_sales_reachout_role"
                              value={data.outbound_sales_reachout?.role}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  outbound_sales_reachout: {
                                    ...data.outbound_sales_reachout,
                                    role: e.target.value,
                                  },
                                })
                              }
                            >
                              <option value="" disabled>
                                Select a Role
                              </option>
                              {data.team
                                .filter(({ category }) => category === 'Growth')
                                .map(({ role }, i) => (
                                  <option value={role} key={i}>
                                    {role}
                                  </option>
                                ))}
                            </CFormSelect>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="outbound_sales_reachout_number_of_new_agents">
                              New agents added per month
                            </CFormLabel>
                            <CFormInput
                              id="outbound_sales_reachout_number_of_new_agents"
                              placeholder="New agents added per month"
                              type="number"
                              value={data.outbound_sales_reachout?.number_of_new_agents}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  outbound_sales_reachout: {
                                    ...data.outbound_sales_reachout,
                                    number_of_new_agents: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="outbound_sales_reachout_maximum_number_of_agents">
                              Maximum Agents for Outbound Sales
                            </CFormLabel>
                            <CFormInput
                              id="outbound_sales_reachout_maximum_number_of_agents"
                              placeholder="Maximum Agents for Outbound Sales"
                              type="number"
                              value={data.outbound_sales_reachout?.maximum_number_of_agents}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  outbound_sales_reachout: {
                                    ...data.outbound_sales_reachout,
                                    maximum_number_of_agents: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="outbound_sales_reachout_deals_closed_per_month">
                              Deals closed per agent per month
                            </CFormLabel>
                            <CFormInput
                              id="outbound_sales_reachout_deals_closed_per_month"
                              placeholder="Deals closed per agent per month"
                              type="number"
                              value={data.outbound_sales_reachout?.deals_closed_per_month}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  outbound_sales_reachout: {
                                    ...data.outbound_sales_reachout,
                                    deals_closed_per_month: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="outbound_sales_reachout_sales_cycle_time">
                              Sales cycle expected time
                            </CFormLabel>
                            <CFormSelect
                              id="outbound_sales_reachout_sales_cycle_time"
                              value={data.outbound_sales_reachout?.sales_cycle_time}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  outbound_sales_reachout: {
                                    ...data.outbound_sales_reachout,
                                    sales_cycle_time: e.target.value,
                                  },
                                })
                              }
                            >
                              <option value="" disabled>
                                Select No. of Months
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="6">6</option>
                            </CFormSelect>
                          </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>SG&A</CCardHeader>
                      <CCardBody>
                        <CForm className="row gx-3 gy-2 align-items-center">
                          <CCol sm={6}>
                            <CFormLabel htmlFor="sga_office_per_desk_cost">
                              Office {'>'} Per Desk Cost
                            </CFormLabel>
                            <CFormInput
                              id="sga_office_per_desk_cost"
                              placeholder="Office > Per Desk Cost"
                              type="number"
                              value={data.sga?.office_per_desk_cost}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  sga: {
                                    ...data.sga,
                                    office_per_desk_cost: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={12}>
                            <small>
                              <b>Tech Support/Customer Success</b>
                            </small>
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="sga_tech_support_customers_per_agent">
                              Customers an agent can handle
                            </CFormLabel>
                            <CFormInput
                              id="sga_tech_support_customers_per_agent"
                              placeholder="Customers an agent can handle"
                              type="number"
                              value={data.sga?.tech_support_customers_per_agent}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  sga: {
                                    ...data.sga,
                                    tech_support_customers_per_agent: e.target.value,
                                  },
                                })
                              }
                            />
                          </CCol>

                          <CCol sm={6}>
                            <CFormLabel htmlFor="sga_tech_support_role">
                              Position in charge of support/success
                            </CFormLabel>
                            <CFormSelect
                              id="sga_tech_support_role"
                              value={data.sga?.tech_support_role}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  sga: {
                                    ...data.sga,
                                    tech_support_role: e.target.value,
                                  },
                                })
                              }
                            >
                              <option value="" disabled>
                                Select a Role
                              </option>
                              {data.team
                                .filter(({ category }) => category === 'Growth')
                                .map(({ role }, i) => (
                                  <option value={role} key={i}>
                                    {role}
                                  </option>
                                ))}
                            </CFormSelect>
                          </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>

                <CRow className="mt-5">
                  <CCol xs={6}>
                    <CButton color="primary" className="px-4" onClick={() => setCurrentStep(2)}>
                      Previous
                    </CButton>
                  </CCol>
                  <CCol xs={6} style={{ textAlign: 'right' }}>
                    <CButton color="primary" className="px-4" onClick={() => setCurrentStep(4)}>
                      Next
                    </CButton>
                  </CCol>
                </CRow>
              </>
            ) : currentStep === 4 ? (
              <>
                <CRow>
                  <CCol xs>
                    {data.cogs
                      ? data.cogs.map(({ name, category, cost }, i) => {
                          let cogs = data.cogs

                          const setOperation = (newData) => {
                            cogs[i] = { ...cogs[i], ...newData }
                            setData({ ...data, cogs })
                          }

                          const removeOperation = (i) => {
                            cogs.splice(i, 1)
                            setData({ ...data, cogs })
                          }

                          return (
                            <CCard key={i} className="mb-4">
                              {(data.cogs ? data.cogs.length : 1) > 1 ? (
                                <CCardHeader style={{ textAlign: 'right' }}>
                                  <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => removeOperation(i)}
                                  >
                                    <CIcon icon={cilX} />
                                    Remove
                                  </div>
                                </CCardHeader>
                              ) : (
                                ''
                              )}
                              <CCardBody>
                                <CForm className="row gx-3 gy-2 align-items-center">
                                  <CCol sm={6}>
                                    <CFormLabel htmlFor={`cogs_name_${i}`}>Name</CFormLabel>
                                    <CInputGroup>
                                      <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                      </CInputGroupText>
                                      <CFormInput
                                        id={`cogs_name_${i}`}
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setOperation({ name: e.target.value })}
                                      />
                                    </CInputGroup>
                                  </CCol>

                                  <CCol sm={6}>
                                    <CFormLabel htmlFor={`cogs_category_${i}`}>Category</CFormLabel>
                                    <CInputGroup>
                                      <CInputGroupText>
                                        <CIcon icon={cilMoney} />
                                      </CInputGroupText>
                                      <CFormInput
                                        id={`cogs_category_${i}`}
                                        placeholder="Category"
                                        type="text"
                                        value={category}
                                        onChange={(e) => {
                                          setOperation({ category: e.target.value })
                                        }}
                                      />
                                    </CInputGroup>
                                  </CCol>

                                  <CCol sm={6}>
                                    <CFormLabel htmlFor={`cogs_cost_${i}`}>Cost</CFormLabel>
                                    <CInputGroup>
                                      <CInputGroupText>
                                        <CIcon icon={cilMoney} />
                                      </CInputGroupText>
                                      <CFormInput
                                        id={`cogs_cost_${i}`}
                                        placeholder="Cost"
                                        type="number"
                                        value={cost}
                                        onChange={(e) => {
                                          setOperation({ cost: e.target.value })
                                        }}
                                      />
                                    </CInputGroup>
                                  </CCol>
                                </CForm>
                              </CCardBody>
                            </CCard>
                          )
                        })
                      : `Loading... ${JSON.stringify(data.cogs, null, 4)}`}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs={12} style={{ textAlign: 'right' }}>
                    <CButton
                      color="primary"
                      className="px-4"
                      onClick={() => {
                        let cogs = data.cogs

                        cogs.push({
                          name: '',
                          category: '',
                          cost: '',
                        })

                        setData({ ...data, cogs })
                      }}
                    >
                      Add
                    </CButton>
                  </CCol>
                </CRow>

                <CRow className="mt-5">
                  <CCol xs={6}>
                    <CButton color="primary" className="px-4" onClick={() => setCurrentStep(3)}>
                      Previous
                    </CButton>
                  </CCol>
                  <CCol xs={6} style={{ textAlign: 'right' }}>
                    <CButton color="primary" className="px-4" onClick={() => setCurrentStep(5)}>
                      Next
                    </CButton>
                  </CCol>
                </CRow>
              </>
            ) : currentStep === 5 ? (
              <>
                <CRow>
                  <CCol xs>
                    {data.operating_expenses
                      ? data.operating_expenses.map(({ name, category, subCategory, cost }, i) => {
                          let operating_expenses = data.operating_expenses

                          const setOperation = (newData) => {
                            operating_expenses[i] = { ...operating_expenses[i], ...newData }
                            setData({ ...data, operating_expenses })
                          }

                          const removeOperation = (i) => {
                            operating_expenses.splice(i, 1)
                            setData({ ...data, operating_expenses })
                          }

                          const categories = {
                            'Marketing & Growth': [
                              'Platforms',
                              'Direct Response Campaigns',
                              'Brand Awareness Campaigns',
                              'Experiment Campaigns',
                            ],
                            'Advisory & Prof. Services': ['Recurring', 'One-Time'],
                            Rent: [],
                            'Tech Support & Services': [],
                            Insurance: [],
                            Utilities: [],
                            'Other Expenses': [],
                          }

                          return (
                            <CCard key={i} className="mb-4">
                              {(data.operating_expenses ? data.operating_expenses.length : 1) >
                              1 ? (
                                <CCardHeader style={{ textAlign: 'right' }}>
                                  <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => removeOperation(i)}
                                  >
                                    <CIcon icon={cilX} />
                                    Remove
                                  </div>
                                </CCardHeader>
                              ) : (
                                ''
                              )}
                              <CCardBody>
                                <CForm className="row gx-3 gy-2 align-items-center">
                                  <CCol sm={6}>
                                    <CFormLabel htmlFor={`operating_expenses_name_${i}`}>
                                      Name
                                    </CFormLabel>
                                    <CInputGroup>
                                      <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                      </CInputGroupText>
                                      <CFormInput
                                        id={`operating_expenses_name_${i}`}
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setOperation({ name: e.target.value })}
                                      />
                                    </CInputGroup>
                                  </CCol>

                                  <CCol sm={6}>
                                    <CFormLabel htmlFor={`operating_expenses_category_${i}`}>
                                      Category
                                    </CFormLabel>
                                    <CFormSelect
                                      id={`operating_expenses_category_${i}`}
                                      value={category}
                                      onChange={(e) => {
                                        setOperation({ category: e.target.value })
                                      }}
                                    >
                                      <option disabled value="">
                                        Category
                                      </option>
                                      {Object.keys(categories).map((category, i) => (
                                        <option value={category} key={i}>
                                          {category}
                                        </option>
                                      ))}
                                    </CFormSelect>
                                  </CCol>

                                  <CCol sm={6}>
                                    <CFormLabel htmlFor={`operating_expenses_sub_category_${i}`}>
                                      Sub-Category
                                    </CFormLabel>
                                    <CFormSelect
                                      id={`operating_expenses_sub_category_${i}`}
                                      value={subCategory}
                                      onChange={(e) => {
                                        setOperation({ subCategory: e.target.value })
                                      }}
                                    >
                                      <option disabled value="">
                                        Sub-Category
                                      </option>
                                      {categories[category]
                                        ? categories[category].map((subCategory, i) => (
                                            <option value={subCategory} key={i}>
                                              {subCategory}
                                            </option>
                                          ))
                                        : ''}
                                    </CFormSelect>
                                  </CCol>

                                  <CCol sm={6}>
                                    <CFormLabel htmlFor={`operating_expenses_cost_${i}`}>
                                      Cost
                                    </CFormLabel>
                                    <CInputGroup>
                                      <CInputGroupText>
                                        <CIcon icon={cilMoney} />
                                      </CInputGroupText>
                                      <CFormInput
                                        id={`operating_expenses_cost_${i}`}
                                        placeholder="Cost"
                                        type="number"
                                        value={cost}
                                        onChange={(e) => {
                                          setOperation({ cost: e.target.value })
                                        }}
                                      />
                                    </CInputGroup>
                                  </CCol>
                                </CForm>
                              </CCardBody>
                            </CCard>
                          )
                        })
                      : `Loading... ${JSON.stringify(data.operating_expenses, null, 4)}`}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs={12} style={{ textAlign: 'right' }}>
                    <CButton
                      color="primary"
                      className="px-4"
                      onClick={() => {
                        let operating_expenses = data.operating_expenses

                        operating_expenses.push({
                          name: '',
                          category: '',
                          cost: '',
                        })

                        setData({ ...data, operating_expenses })
                      }}
                    >
                      Add
                    </CButton>
                  </CCol>
                </CRow>

                <CRow className="mt-5">
                  <CCol xs={6}>
                    <CButton color="primary" className="px-4" onClick={() => setCurrentStep(3)}>
                      Previous
                    </CButton>
                  </CCol>
                  {localStorage.getItem('profile') ? (
                    <CCol xs={6} style={{ textAlign: 'right' }}>
                      <CButton
                        color="primary"
                        className="px-4"
                        onClick={notCreated ? () => createData() : () => updateData()}
                      >
                        {notCreated ? 'Create Profile' : 'Save Changes'}
                      </CButton>
                    </CCol>
                  ) : (
                    ''
                  )}
                </CRow>
              </>
            ) : null}
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Profile
