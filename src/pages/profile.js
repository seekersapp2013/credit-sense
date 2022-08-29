import React, { useContext, useEffect, useState } from 'react'

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
import { profileDataStructure } from 'src/components/Utils/profileDataStructure'
import AccountContext from 'src/components/AccountContext'
import {
  ProfileCompanyStep,
  ProfileOperationsStep,
  ProfileSalesStep,
  ProfileCogsStep,
  ProfileExpensesStep,
  ProfileFinanceStep,
} from 'src/components/ProfileSteps'
import ProfileBeneficialStep from 'src/components/ProfileSteps/ProfileBeneficialStep'

const Profile = () => {
  const { account, profile, getProps } = useContext(AccountContext)

  // const [account, setAccount] = useState(null)
  const [dataID, setDataID] = useState()

  const [currentStep, setCurrentStep] = useState(0)

  const [notCreated, setNotCreated] = useState(true)

  const [data, setData] = useState(
    localStorage.getItem('profile')
      ? JSON.parse(localStorage.getItem('profile'))
      : profile
      ? profile
      : profileDataStructure,
  )

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(data))
    console.log('Data', data)
  }, [data])

  const getAccountInfo = async () => {
    // const res = await appwrite.getAccount()
    // console.log(res)
    // setAccount(res)
    setData({ ...data, user: account.$id })

    getProps()

    setCurrentStep(0)

    console.log(account.$id)

    try {
      // const user = await appwrite.fetchUser(res.$id)
      console.log('User', profile)
      // setAccount(data)

      // setDataID(user.$id)

      setDataID(profile.$id)

      if (localStorage.getItem('profile')) {
        setData(JSON.parse(localStorage.getItem('profile')))
      } else {
        // setData(objectifySubStrings(user))
        setData(profile)
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
      getProps()
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
      getProps()
      localStorage.removeItem('profile')
    } catch (error) {
      console.log(error)
      alert('An Error Occured')
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAccountInfo(), [])

  const changeStep = (direction) =>
    setCurrentStep(direction === 'next' ? currentStep + 1 : currentStep - 1)

  const steps = [
    {
      title: 'Company Information',
      component: <ProfileCompanyStep data={data} setData={setData} />,
    },
    {
      title: 'Financial Information',
      component: <ProfileFinanceStep data={data} setData={setData} />,
    },
    {
      title: 'Operations Information',
      component: <ProfileOperationsStep data={data} setData={setData} />,
    },
    { title: 'Sales Information', component: <ProfileSalesStep data={data} setData={setData} /> },
    { title: 'Cogs Information', component: <ProfileCogsStep data={data} setData={setData} /> },
    {
      title: 'Expenses Information',
      component: <ProfileExpensesStep data={data} setData={setData} />,
    },
    // {
    //   title: 'Beneficial Owners',
    //   component: <ProfileBeneficialStep data={data} setData={setData} />,
    // },
  ]

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
                Company Profile - Step {currentStep + 1}
              </h4>
              <div className="small text-medium-emphasis">{steps[currentStep].title}</div>
            </CCol>
          </CRow>

          <div className="mt-4">
            {steps[currentStep].component}

            <CRow className="mt-5">
              <CCol xs={6}>
                <CButton
                  color="primary"
                  className="px-4"
                  onClick={() => changeStep('prev')}
                  disabled={currentStep <= 0}
                >
                  Previous
                </CButton>
              </CCol>

              {localStorage.getItem('profile') && currentStep === steps.length - 1 ? (
                <CCol xs={6} style={{ textAlign: 'right' }}>
                  <CButton
                    color="primary"
                    className="px-4"
                    onClick={!profile ? () => createData() : () => updateData()}
                  >
                    {!profile ? 'Create Profile' : 'Save Changes'}
                  </CButton>
                </CCol>
              ) : (
                <CCol xs={6} style={{ textAlign: 'right' }}>
                  <CButton color="primary" className="px-4" onClick={() => changeStep('next')}>
                    Next
                  </CButton>
                </CCol>
              )}
            </CRow>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

Profile.profile = false

export default Profile
