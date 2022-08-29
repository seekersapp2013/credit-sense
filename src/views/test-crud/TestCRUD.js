import React, { useEffect, useState } from 'react'
import { cilUser, cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { appwrite, objectifySubStrings, stringifySubObjects } from 'src/functions/appwrite'

const TestCRUD = () => {
  const [account, setAccount] = useState(null)

  const [CRUD1, setCRUD1] = useState({ title: '', description: '' })
  const [CRUD2, setCRUD2] = useState({ list: [{ item: '' }] })

  const [CRUD1ID, setCRUD1ID] = useState()
  const [CRUD2ID, setCRUD2ID] = useState()

  const [CRUD1NotCreated, setCRUD1NotCreated] = useState(true)
  const [CRUD2NotCreated, setCRUD2NotCreated] = useState(true)

  useEffect(() => console.log('CRUD 2: ', CRUD2), [CRUD2])

  const getAccountInfo = async () => {
    const res = await appwrite.getAccount()

    setAccount(res)
    setCRUD1({ ...CRUD1, user: res.$id })
    setCRUD2({ ...CRUD2, user: res.$id })

    try {
      const CRUD1 = await appwrite.fetchCRUD1(res.$id)

      setCRUD1ID(CRUD1.$id)

      setCRUD1(CRUD1)

      setCRUD1NotCreated(false)
    } catch (error) {
      console.log(error)
      setCRUD1NotCreated(true)
    }

    try {
      const CRUD2 = await appwrite.fetchCRUD2(res.$id)

      setCRUD2ID(CRUD2.$id)

      setCRUD2(objectifySubStrings(CRUD2))

      setCRUD2NotCreated(false)
    } catch (error) {
      console.log(error)
      setCRUD2NotCreated(true)
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAccountInfo(), [])

  // Update and Create Functions for CRUD1
  const updateCRUD1 = async () => {
    try {
      const res = await appwrite.updateCRUD1(CRUD1ID, CRUD1, account.$id)
      console.log(res)
      alert('CRUD1 Updated Successfully!')
    } catch (error) {
      console.log(error)
      alert('An Error Occured')
    }
  }

  const createCRUD1 = async () => {
    try {
      const res = await appwrite.createCRUD1(CRUD1)
      console.log(res)
      alert('CRUD1 Created Successfully!')
      setCRUD1NotCreated(false)
    } catch (error) {
      console.log(error)
      alert('An Error Occured')
    }
  }
  // End of Update and Create Functions for CRUD1

  // Update and Create Functions for CRUD2
  const updateCRUD2 = async () => {
    try {
      const res = await appwrite.updateCRUD2(CRUD2ID, stringifySubObjects(CRUD2), account.$id)
      console.log('CRUD2 update res: ', res)
      alert('CRUD2 Updated Successfully!')
    } catch (error) {
      console.log(error)
      alert('An Error Occured')
    }
  }

  const createCRUD2 = async () => {
    try {
      const res = await appwrite.createCRUD2(stringifySubObjects(CRUD2))
      console.log(res)
      alert('CRUD2 Created Successfully!')
      setCRUD2NotCreated(false)
    } catch (error) {
      console.log(error)
      alert('An Error Occured')
    }
  }
  // End of Update and Create Functions for CRUD2

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 id="traffic" className="card-title mb-0">
                CRUD Test
              </h4>
              <div className="small text-medium-emphasis"></div>
            </CCol>
          </CRow>

          <div className="mt-4">
            <>
              {CRUD1 ? (
                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>CRUD 1</CCardHeader>
                      <CCardBody>
                        <CForm className="row gx-3 gy-2 align-items-center">
                          <CCol sm={12}>
                            <CFormLabel htmlFor="title">Title</CFormLabel>
                            <CFormInput
                              id="title"
                              placeholder="Title"
                              value={CRUD1.title}
                              onChange={(e) => setCRUD1({ ...CRUD1, title: e.target.value })}
                            />
                          </CCol>
                          <CCol sm={12}>
                            <CFormLabel htmlFor="description">Description</CFormLabel>
                            <CFormInput
                              id="description"
                              placeholder="Description"
                              value={CRUD1.description}
                              onChange={(e) => setCRUD1({ ...CRUD1, description: e.target.value })}
                            />
                          </CCol>
                          <CCol xs={12} style={{ textAlign: 'right' }}>
                            <CButton
                              color="primary"
                              className="px-4"
                              onClick={CRUD1NotCreated ? () => createCRUD1() : () => updateCRUD1()}
                            >
                              {CRUD1NotCreated ? 'Create CRUD 1' : 'Save Changes'}
                            </CButton>
                          </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              ) : (
                ''
              )}
              {CRUD2.list ? (
                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>CRUD 2</CCardHeader>
                      <CCardBody>
                        <CRow>
                          <CCol xs>
                            {CRUD2.list.map(({ item }, i) => {
                              let list = CRUD2.list

                              const setOperation = (newData) => {
                                list[i] = { ...list[i], ...newData }
                                setCRUD2({ ...CRUD2, list })
                              }

                              const removeOperation = (i) => {
                                list.splice(i, 1)
                                setCRUD2({ ...CRUD2, list })
                              }

                              return (
                                <CCard key={i} className="mb-4">
                                  {(CRUD2.list ? CRUD2.list.length : 1) > 1 ? (
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
                                        <CFormLabel htmlFor={`list_item_${i}`}>Item</CFormLabel>
                                        <CInputGroup>
                                          <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                          </CInputGroupText>
                                          <CFormInput
                                            id={`list_item_${i}`}
                                            placeholder="Item"
                                            value={item}
                                            onChange={(e) => setOperation({ item: e.target.value })}
                                          />
                                        </CInputGroup>
                                      </CCol>
                                    </CForm>
                                  </CCardBody>
                                </CCard>
                              )
                            })}
                          </CCol>
                        </CRow>

                        <CRow>
                          <CCol xs={12} style={{ textAlign: 'right' }}>
                            <CButton
                              color="primary"
                              className="px-4"
                              onClick={() => {
                                let list = CRUD2.list

                                console.log('List before push: ', list)

                                list.push({
                                  item: '',
                                })

                                console.log('List after push: ', list)

                                setCRUD2({ ...CRUD2, list })
                              }}
                            >
                              Add
                            </CButton>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs={12} className="mt-2" style={{ textAlign: 'right' }}>
                            <CButton
                              color="primary"
                              className="px-4"
                              onClick={CRUD2NotCreated ? () => createCRUD2() : () => updateCRUD2()}
                            >
                              {CRUD2NotCreated ? 'Create CRUD 2' : 'Save Changes'}
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              ) : (
                ''
              )}
            </>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default TestCRUD
