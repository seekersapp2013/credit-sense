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

const ProfileExpensesStep = ({ data, setData }) => {
  return (
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
                    {(data.operating_expenses ? data.operating_expenses.length : 1) > 1 ? (
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
                          <CFormLabel htmlFor={`operating_expenses_name_${i}`}>Name</CFormLabel>
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
                          <CFormLabel htmlFor={`operating_expenses_cost_${i}`}>Cost</CFormLabel>
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
    </>
  )
}

export default ProfileExpensesStep
