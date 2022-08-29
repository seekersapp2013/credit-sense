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

const ProfileOperationsStep = ({ data, setData }) => {
  return (
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
                      <div style={{ cursor: 'pointer' }} onClick={() => removeOperation(i)}>
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
                        <CFormLabel htmlFor={`team_category_${i}`}>Expense Category</CFormLabel>
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
                        <CFormLabel htmlFor={`team_subcategory_${i}`}>Sub-Category</CFormLabel>
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
                        <CFormLabel htmlFor={`team_salary_${i}`}>Annual Salary</CFormLabel>
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
                        <CFormLabel htmlFor={`team_date_hired_${i}`}>First Hire</CFormLabel>
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
                        <CFormLabel htmlFor={`team_maximum_number_${i}`}>Maximum Team</CFormLabel>
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
    </>
  )
}

export default ProfileOperationsStep
