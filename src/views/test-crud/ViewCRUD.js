import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
import Plans from 'src/components/Plans/Plans'

const ViewCRUD = () => {
  const [CRUD1, setCRUD1] = useState({ title: '', description: '' })
  const [CRUD2, setCRUD2] = useState({ list: [{ item: '' }] })

  const getAccountInfo = async () => {
    const res = await appwrite.getAccount()

    setCRUD1({ ...CRUD1, user: res.$id })
    setCRUD2({ ...CRUD2, user: res.$id })

    try {
      const CRUD1 = await appwrite.fetchCRUD1(res.$id)

      setCRUD1(CRUD1)
    } catch (error) {
      console.log(error)
    }

    try {
      const CRUD2 = await appwrite.fetchCRUD2(res.$id)

      setCRUD2(objectifySubStrings(CRUD2))
    } catch (error) {
      console.log(error)
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAccountInfo(), [])

  return (
    <>
      <Plans />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 id="traffic" className="card-title mb-0">
                CRUD View
              </h4>
              <div className="small text-medium-emphasis"></div>
            </CCol>
          </CRow>

          <div className="mt-4">
            <>
              <CRow>
                <CCol xs>
                  <CCard className="mb-4">
                    <CCardHeader>CRUD 1 Outputs</CCardHeader>
                    <CCardBody>
                      {CRUD1 ? (
                        <>
                          <div>
                            <h1>Title: {CRUD1.title}</h1>
                          </div>
                          <div>
                            <p>Description: {CRUD1.description}</p>
                          </div>
                        </>
                      ) : (
                        'Loading...'
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol xs>
                  <CCard className="mb-4">
                    <CCardHeader>CRUD 2 Outputs</CCardHeader>
                    <CCardBody>
                      {CRUD2 ? (
                        <ol>
                          {CRUD2.list.map(({ item }, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ol>
                      ) : (
                        'Loading...'
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ViewCRUD
