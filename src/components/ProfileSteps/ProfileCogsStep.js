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

const ProfileCogsStep = ({ data, setData, changeStep, i }) => {
  return (
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
    </>
  )
}

export default ProfileCogsStep
