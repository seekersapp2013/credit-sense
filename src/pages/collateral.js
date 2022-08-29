import { cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDropdownDivider,
  CForm,
  CFormInput,
  CFormLabel,
  CHeaderDivider,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
  CTable,
  CWidgetStatsF,
  cilChartPie,
  CCardHeader,
  CFormSelect,
} from '@coreui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import AccountContext from 'src/components/AccountContext'
import CollateralModal from 'src/components/Collateral/CollateralModal'
import CollateralSelector from 'src/components/Collateral/CollateralSelector'
import Loader from 'src/components/Loader'
import ListOfBanks from 'src/components/ProfileSteps/components/ListOfBanks'
import { addAccountsLink } from 'src/components/ProfileSteps/ProfileCompanyStep'
import countriesData from 'src/components/Utils/countriesData'
import { formatMoney } from 'src/components/Utils/formatMoney'
import { api } from 'src/functions/api'
import { appwrite, objectifySubStrings, stringifySubObjects } from 'src/functions/appwrite'

const Collateral = ({ page = 0 }) => {
  const router = useRouter()

  const [showList, setShowList] = useState(false)

  const { profile: profileData } = useContext(AccountContext)

  const [loadingData, setLoadingData] = useState(true)
  const [data, setData] = useState(null)

  const [profile, setProfile] = useState(
    localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : profileData,
  )

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile))
    console.log('Profile: ', profile)
  }, [profile])

  const [info, setInfo] = useState(null)

  const [loading, setLoading] = useState(false)
  const [collaterals, setCollaterals] = useState([])

  const [total, setTotal] = useState(0)

  const [proceed, setProceed] = useState(false)

  // const [page, setPage] = useState(0)

  useEffect(() => {
    setTotal(
      data?.collaterals
        ? data.collaterals.length
          ? data.collaterals
              .map(({ value, percentage }) => (value * percentage) / 100)
              .reduce((a, b) => a + b)
          : 0
        : 0,
    )
  }, [data])

  useEffect(() => {
    setProceed(
      profile.beneficial_owners.filter(
        ({ verified, banks }) =>
          verified &&
          banks.length &&
          banks.filter(({ authorized }) => authorized).length === banks.length,
      ).length
        ? true
        : false,
    )
  }, [profile])

  const percentageAvailable = 70 // This is the percentage of the starting capital value that the collaterals can be maxed at.

  const maxCollateralPercentage = 10 // This is the percentage of the collateralq that can be applied for.

  const getCollaterals = async () => {
    setLoading(true)
    const res = await api.get('/data/collaterals')
    if (res.success) {
      const { data } = res
      console.log('collaterals ', data)
      setCollaterals(data)
    }
    setLoading(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const infoRes = await api.get('/data/capital-and-profitability')
      if (infoRes.success) {
        const { data } = infoRes
        console.log('info ', data)
        setInfo(data)
      }

      const dataRes = await api.get('/users/collateral')
      if (dataRes.success) {
        if (Object.keys(dataRes.data).length) {
          const { data } = dataRes
          console.log('data ', data)
          setData(objectifySubStrings(data))
        } else {
          const data = await appwrite.createCollateralProfile({})
          console.log('new data ', data)
          setData(objectifySubStrings(data))
        }
        setLoadingData(false)
      }

      getCollaterals()
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }, [])

  const updateCollateralProfile = async () => {
    const { $id, ...collateralData } = data
    const res = await appwrite.updateCollateralProfile($id, {
      ...stringifySubObjects(collateralData),
      status: proceed ? 'APPLIED' : 'INITIALIZED',
    })
    console.log('data updated to ', res)
    // alert('Saved!')
    router.push('/collateral?page=1')
  }

  const addCollateral = (collaterals) => setData({ ...data, collaterals })

  const availableAmount = info ? (info.capital * percentageAvailable) / 100 : 0

  // const totalAmount = data
  //   ? data.collaterals.length
  //     ? data.collaterals
  //         .map(({ value, percentage }) => (value * percentage) / 100)
  //         .reduce((a, b) => a + b)
  //     : 0
  //   : 0

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 id="traffic" className="card-title mb-0">
                Collateral
              </h4>
              <div className="small text-medium-emphasis">Startup Support Information</div>
            </CCol>
          </CRow>

          <CForm className="row mt-3 gx-3 gy-2 align-items-center">
            <CCol xs={6}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilUser} height={24} />}
                title="Start Up Capital"
                value={info ? formatMoney(info.capital, false, false) : 'Loading...'}
              />
            </CCol>
            <CCol xs={6}>
              <CWidgetStatsF
                className="mb-3"
                color="warning"
                icon={<CIcon icon={cilUser} height={24} />}
                title="Total Available Collateral"
                value={info ? `${formatMoney(availableAmount, false, false)} (70%)` : 'Loading...'}
              />
            </CCol>
            <CCol sm={6}>
              <CFormLabel htmlFor="specificSizeInputGroupUsername">Collateral ID</CFormLabel>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  disabled={true}
                  id="specificSizeInputGroupUsername"
                  placeholder="Collateral ID"
                  value={data ? data.$id : 'Loading...'}
                />
                <CButton>Copy</CButton>
              </CInputGroup>
            </CCol>
          </CForm>

          {loadingData ? (
            <Loader />
          ) : data?.status === 'APPLIED' ? (
            <>
              <CDropdownDivider className="my-4" />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '12em',
                }}
              >
                <h2 className="text-center text-success">Applied!</h2>
                <p>Pending approval</p>
              </div>
            </>
          ) : page == 0 ? (
            <>
              <CDropdownDivider className="my-4" />
              <CRow>
                <CCol sm={12}>
                  <h4 id="traffic" className="card-title mb-0">
                    Collateral Details
                  </h4>
                  <div className="small text-medium-emphasis">Build a collateral</div>
                </CCol>
              </CRow>
              {!loadingData ? (
                <>
                  <CRow>
                    <CCol sm={12}>
                      <CollateralSelector
                        data={collaterals}
                        selected={data.collaterals}
                        onChange={(collaterals) => setData({ ...data, collaterals })}
                        maxPercentage={maxCollateralPercentage}
                        amount={availableAmount}
                        total={total}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol
                      sm={12}
                      className="mt-2"
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <CButton onClick={() => updateCollateralProfile()}>Continue</CButton>
                    </CCol>
                  </CRow>
                </>
              ) : (
                <Loader />
              )}
            </>
          ) : page == 1 ? (
            <>
              <CDropdownDivider className="my-4" />

              <CRow>
                <CCol sm={12}>
                  <h4 id="traffic" className="card-title mb-0">
                    Bank Mandate
                  </h4>
                  <div className="small text-medium-emphasis">Get bank mandate</div>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CCard className="mt-3">
                    <CCardHeader>Beneficial Owners</CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol xs>
                          {profile.beneficial_owners.filter(({ verified }) => verified).length ? (
                            profile.beneficial_owners
                              .filter(({ verified }) => verified)
                              .map(
                                (
                                  {
                                    bvn,
                                    first_name,
                                    last_name,
                                    date_of_birth,

                                    phone_number1,
                                    nationality,
                                    state_of_residence,
                                    residential_address,

                                    middle_name,
                                    gender,
                                    // image,

                                    bvn_verified,

                                    email,
                                    // id_doc,
                                    // id_no,

                                    sent_token,
                                    token_ref,
                                    verified,

                                    code,

                                    banks,
                                    banks_synced_at,
                                  },
                                  i,
                                  arr,
                                ) => {
                                  let beneficial_owners = profile.beneficial_owners

                                  const setOperation = (newData) => {
                                    beneficial_owners[i] = { ...beneficial_owners[i], ...newData }
                                    setProfile({ ...data, beneficial_owners })
                                  }

                                  const removeOperation = (i) => {
                                    beneficial_owners.splice(i, 1)
                                    setProfile({ ...data, beneficial_owners })
                                  }

                                  const verifiyBVN = () => {
                                    dojah
                                      .validateBVN({
                                        bvn,
                                        first_name,
                                        last_name,
                                        dob: date_of_birth,
                                      })
                                      .then((res) => {
                                        console.log(res)
                                        if (res.status) {
                                          //
                                          dojah.lookupBVN({ bvn }).then(
                                            ({
                                              bvn,
                                              first_name,
                                              last_name,
                                              date_of_birth,

                                              phone_number1,
                                              nationality,
                                              state_of_residence,
                                              residential_address,

                                              middle_name,
                                              gender,
                                            }) => {
                                              // if (res.success) {
                                              setOperation({
                                                bvn,
                                                first_name,
                                                last_name,
                                                date_of_birth: new Date(date_of_birth)
                                                  .toLocaleDateString()
                                                  .split('/')
                                                  .reverse()
                                                  .join('-'),
                                                phone_number1,
                                                nationality,
                                                state_of_residence,
                                                residential_address,
                                                middle_name,
                                                gender,
                                                bvn_verified: true,
                                              })
                                              // }
                                            },
                                          )
                                        }
                                      })
                                      .catch((error) => console.log(error))
                                  }

                                  const sendToken = () => {
                                    dojah
                                      .sendOTP({ destination: phone_number1 })
                                      .then((res) => {
                                        console.log(res)
                                        setOperation({
                                          sent_token: Date.now(),
                                          token_ref: res[0].reference_id,
                                        })
                                      })
                                      .catch((error) => {
                                        console.log(error)
                                        alert('Could not send token')
                                      })
                                  }

                                  const verifiyToken = () => {
                                    dojah
                                      .validateOTP({ code, reference_id: token_ref })
                                      .then((res) => {
                                        console.log(res)

                                        // if (res.valid) {
                                        alert('Verified!')
                                        setOperation({ verified: true })

                                        // } else {
                                        //   alert('Not Verified!')
                                        // }
                                      })
                                      .catch((error) => {
                                        console.log(error)
                                        alert('Could not verify token')
                                      })
                                  }

                                  return (
                                    <CCard key={i} className="mb-4">
                                      {/* {(profile.beneficial_owners
                                      ? profile.beneficial_owners.length
                                      : 1) > 1 ? (
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
                                    )} */}
                                      <CCardHeader>
                                        {first_name} {middle_name} {last_name}
                                      </CCardHeader>
                                      <CCardBody>
                                        <CForm className="row gx-3 gy-2 align-items-center">
                                          {verified ? (
                                            <>
                                              <CCol sm={12}>
                                                <CFormLabel>Link accounts to continue</CFormLabel>
                                                <CRow>
                                                  <CCol sm={8}>
                                                    <CInputGroup>
                                                      <CFormInput
                                                        placeholder="URL"
                                                        type="text"
                                                        value={addAccountsLink}
                                                        disabled
                                                      />
                                                      <CopyToClipboard text={addAccountsLink}>
                                                        <CButton>Copy Link</CButton>
                                                      </CopyToClipboard>
                                                    </CInputGroup>
                                                  </CCol>
                                                  <CCol>
                                                    <a
                                                      target="_blank"
                                                      // passHref
                                                      href={addAccountsLink}
                                                    >
                                                      <CButton>Continue to Link Accounts</CButton>
                                                    </a>
                                                  </CCol>
                                                </CRow>
                                                {/* <br /> */}
                                                {/* <Link> */}
                                                {/* </Link> */}
                                              </CCol>
                                              <CCol sm={12} className="mt-4">
                                                <CFormLabel>Authorize Bank Mandate</CFormLabel>
                                                <ListOfBanks
                                                  banks_synced_at={banks_synced_at}
                                                  // mobile_number={phone_number1}
                                                  mobile_number="07053761455"
                                                  bvn={bvn}
                                                  banks={banks}
                                                  onChange={(data) => setOperation({ ...data })}
                                                  totalAmount={parseInt(total / arr.length)}
                                                  name={`${first_name} ${last_name}`}
                                                  email={email}
                                                />
                                              </CCol>
                                            </>
                                          ) : (
                                            <p className="text-center">
                                              Beneficial owner has not been verified!{' '}
                                              <Link href="/profile">
                                                <a>Verify</a>
                                              </Link>{' '}
                                              inorder to proceed with mandate.
                                            </p>
                                          )}
                                        </CForm>
                                      </CCardBody>
                                    </CCard>
                                  )
                                },
                              )
                          ) : (
                            <div className="text-center">
                              <p>
                                No verified beneficial owners. Make sure to add beneficial owners
                                and verify them to continue.
                              </p>
                              <Link href="/profile">
                                <a>Go to Beneficial Owners</a>
                              </Link>
                            </div>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol sm={6}>
                          <Link href="/collateral">
                            <CButton>Back</CButton>
                          </Link>
                        </CCol>
                        <CCol sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <CButton onClick={() => updateCollateralProfile()} disabled={!proceed}>
                            Complete Application
                          </CButton>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </>
          ) : (
            ''
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

Collateral.getInitialProps = ({ query: { page } }) => {
  return { page }
}

export default Collateral
