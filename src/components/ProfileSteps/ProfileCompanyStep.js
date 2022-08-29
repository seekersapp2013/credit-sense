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
import { cilPeople, cilUser, cilCalendar, cilMoney, cilX, cilCheckAlt } from '@coreui/icons'

import { appwrite } from 'src/functions/appwrite'
import dojah from 'src/functions/dojah'
import countriesData from '../Utils/countriesData'
import ListOfBanks from './components/ListOfBanks'
import creditchek from 'src/functions/creditchek'
import Link from 'next/link'
import CopyToClipboard from 'react-copy-to-clipboard'
import { dateToInput } from '../Utils/dateToInput'

export const addAccountsLink =
  'https://app.creditchek.africa/upload-data/short/4733208696/DtIiJyKaFV/62cb784f4dc5110013cc8b02/62cb784f4dc5110013cc8b04/true'

const ProfileCompanyStep = ({ data, setData }) => {
  // console.log('Data: ', data)
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>General</CCardHeader>
            <CCardBody>
              <CForm className="row gx-3 gy-2 align-items-center">
                <CCol sm={8}>
                  <CFormLabel htmlFor="company_name">Company Name</CFormLabel>
                  <CFormInput
                    id="company_name"
                    placeholder="Company Name"
                    value={data.company_name}
                    onChange={(e) => setData({ ...data, company_name: e.target.value })}
                  />
                </CCol>

                <CCol sm={4}>
                  <CFormLabel htmlFor="rc_number">RC Number</CFormLabel>
                  <CFormInput
                    id="rc_number"
                    placeholder="RC Number"
                    value={data.rc_number}
                    onChange={(e) => setData({ ...data, rc_number: e.target.value })}
                  />
                </CCol>

                <CCol sm={4}>
                  <CFormLabel htmlFor="tin">Tax Identification Number</CFormLabel>
                  <CFormInput
                    id="tin"
                    placeholder="Tax Identification Number"
                    value={data.tin}
                    onChange={(e) => setData({ ...data, tin: e.target.value })}
                  />
                </CCol>

                <CCol sm={4}>
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

                <CCol sm={4}>
                  <CFormLabel htmlFor="model_start_date">Business Start Date</CFormLabel>
                  <CFormInput
                    id="model_start_date"
                    placeholder="Business Start Date"
                    type="date"
                    value={data.model_start_date}
                    onChange={(e) => setData({ ...data, model_start_date: e.target.value })}
                  />
                </CCol>

                <CCol sm={4}>
                  <CFormLabel htmlFor="maa">Memorandum and Articles of Association</CFormLabel>
                  <CFormInput
                    id="maa"
                    placeholder="Memorandum and Articles of Association"
                    type="file"
                    filename={'Hello'}
                    onChange={(e) => {
                      const id = `${account.$id}maa`

                      appwrite.file.new(e.target.files[0], id).then((res) => {})
                    }}
                    // onChange={(e) =>
                    //   // setData({ ...data, maa: e.target.value })
                    // }
                  />
                </CCol>

                <CCol sm={4}>
                  <CFormLabel htmlFor="maa">Certificate of Incorporation</CFormLabel>
                  <CFormInput
                    id="coi"
                    placeholder="Certificate of Incorporation"
                    type="file"
                    value={data.coi}
                    // onChange={(e) =>
                    //   // setData({ ...data, maa: e.target.value })
                    // }
                  />
                </CCol>

                <CCol sm={4}>
                  <CFormLabel htmlFor="cacsr">CAC Status Report</CFormLabel>
                  <CFormInput
                    id="cacsr"
                    placeholder="CAC Status Report"
                    type="file"
                    value={data.maa}
                    // onChange={(e) =>
                    //   // setData({ ...data, maa: e.target.value })
                    // }
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
            <CCardHeader>Beneficial Owners</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs>
                  {data.beneficial_owners.map(
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
                    ) => {
                      let beneficial_owners = data.beneficial_owners

                      const setOperation = (newData) => {
                        beneficial_owners[i] = { ...beneficial_owners[i], ...newData }
                        setData({ ...data, beneficial_owners })
                      }

                      const removeOperation = (i) => {
                        beneficial_owners.splice(i, 1)
                        setData({ ...data, beneficial_owners })
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
                                    date_of_birth: dateToInput(date_of_birth),
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
                            setOperation({ sent_token: Date.now(), token_ref: res[0].reference_id })
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
                          {(data.beneficial_owners ? data.beneficial_owners.length : 1) > 1 ? (
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
                              <CCol sm={4}>
                                <CFormLabel htmlFor={`beneficial_owners_first_name_${i}`}>
                                  First Name
                                </CFormLabel>
                                <CInputGroup>
                                  <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                  </CInputGroupText>
                                  <CFormInput
                                    id={`beneficial_owners_first_name_${i}`}
                                    placeholder="First Name"
                                    value={first_name}
                                    onChange={(e) => setOperation({ first_name: e.target.value })}
                                    disabled={bvn_verified}
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol sm={4}>
                                <CFormLabel htmlFor={`beneficial_owners_middle_name_${i}`}>
                                  Middle Name
                                </CFormLabel>
                                <CInputGroup>
                                  <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                  </CInputGroupText>
                                  <CFormInput
                                    id={`beneficial_owners_middle_name_${i}`}
                                    placeholder="Middle Name"
                                    value={middle_name}
                                    onChange={(e) => setOperation({ middle_name: e.target.value })}
                                    disabled={bvn_verified}
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol sm={4}>
                                <CFormLabel htmlFor={`beneficial_owners_last_name_${i}`}>
                                  Last Name
                                </CFormLabel>
                                <CInputGroup>
                                  <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                  </CInputGroupText>
                                  <CFormInput
                                    id={`beneficial_owners_last_name_${i}`}
                                    placeholder="Last Name"
                                    value={last_name}
                                    onChange={(e) => setOperation({ last_name: e.target.value })}
                                    disabled={bvn_verified}
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol sm={6}>
                                <CFormLabel htmlFor={`beneficial_owners_date_of_birth_${i}`}>
                                  Date of Birth
                                </CFormLabel>
                                <CInputGroup>
                                  <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                  </CInputGroupText>
                                  <CFormInput
                                    id={`beneficial_owners_date_of_birth_${i}`}
                                    placeholder="Date of Birth"
                                    type="date"
                                    value={date_of_birth}
                                    onChange={(e) =>
                                      setOperation({ date_of_birth: e.target.value })
                                    }
                                    disabled={bvn_verified}
                                  />
                                </CInputGroup>
                              </CCol>

                              <CCol sm={6}>
                                <CFormLabel htmlFor={`beneficial_owners_bvn_${i}`}>
                                  Bank Verification Number (BVN)
                                </CFormLabel>
                                <CInputGroup>
                                  <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                  </CInputGroupText>
                                  <CFormInput
                                    id={`beneficial_owners_bvn_${i}`}
                                    placeholder="BVN"
                                    value={bvn}
                                    onChange={(e) => setOperation({ bvn: e.target.value })}
                                    disabled={bvn_verified}
                                  />
                                  {bvn_verified ? (
                                    ''
                                  ) : (
                                    <CButton onClick={verifiyBVN}>Check BVN</CButton>
                                  )}
                                </CInputGroup>
                              </CCol>

                              {bvn_verified ? (
                                <>
                                  <CCol sm={6}>
                                    <CFormLabel htmlFor={`beneficial_owners_email_${i}`}>
                                      Email Address
                                    </CFormLabel>
                                    <CInputGroup>
                                      <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                      </CInputGroupText>
                                      <CFormInput
                                        id={`beneficial_owners_email_${i}`}
                                        placeholder="Email Address"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setOperation({ email: e.target.value })}
                                        // disabled={bvn_verified}
                                      />
                                    </CInputGroup>
                                  </CCol>

                                  <CCol sm={6}>
                                    <CFormLabel htmlFor={`beneficial_owners_phone_number1_${i}`}>
                                      Phone Number
                                    </CFormLabel>
                                    <CInputGroup>
                                      <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                      </CInputGroupText>
                                      <CFormInput
                                        id={`beneficial_owners_phone_number1_${i}`}
                                        placeholder="Phone Number"
                                        type="tel"
                                        value={phone_number1}
                                        onChange={(e) =>
                                          setOperation({ phone_number1: e.target.value })
                                        }
                                        disabled={bvn_verified}
                                      />
                                    </CInputGroup>
                                  </CCol>
                                  <CCol sm={4}>
                                    <CFormLabel htmlFor={`beneficial_owners_gender_${i}`}>
                                      Gender
                                    </CFormLabel>
                                    <CFormSelect
                                      id={`beneficial_owners_gender_${i}`}
                                      value={gender}
                                      onChange={(e) => setOperation({ gender: e.target.value })}
                                      disabled={bvn_verified}
                                    >
                                      <option value="" disabled>
                                        Select an Option
                                      </option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Other">Other</option>
                                    </CFormSelect>
                                  </CCol>

                                  <CCol sm={4}>
                                    <CFormLabel htmlFor={`beneficial_owners_nationality_${i}`}>
                                      Nationality
                                    </CFormLabel>
                                    <CFormSelect
                                      id={`beneficial_owners_nationality_${i}`}
                                      value={nationality}
                                      onChange={(e) =>
                                        setOperation({ nationality: e.target.value })
                                      }
                                      disabled={bvn_verified}
                                    >
                                      <option value="" disabled>
                                        Select an Option
                                      </option>
                                      {Object.keys(countriesData).map((country) => (
                                        <option value={country}>{country}</option>
                                      ))}
                                      <option value="Other">Other</option>
                                    </CFormSelect>
                                  </CCol>

                                  <CCol sm={4}>
                                    <CFormLabel
                                      htmlFor={`beneficial_owners_state_of_residence_${i}`}
                                    >
                                      State of Residence
                                    </CFormLabel>
                                    <CFormSelect
                                      id={`beneficial_owners_state_of_residence_${i}`}
                                      value={state_of_residence}
                                      onChange={(e) =>
                                        setOperation({ state_of_residence: e.target.value })
                                      }
                                      disabled={bvn_verified}
                                    >
                                      <option value="" disabled>
                                        Select an Option
                                      </option>
                                      {nationality === 'Other' ? (
                                        <option value="Other">Other</option>
                                      ) : (
                                        countriesData[nationality].map((country) => (
                                          <option value={`${country} State`}>{country}</option>
                                        ))
                                      )}
                                    </CFormSelect>
                                  </CCol>
                                  <CCol sm={8}>
                                    <CFormLabel
                                      htmlFor={`beneficial_owners_residential_address_${i}`}
                                    >
                                      Residential Address
                                    </CFormLabel>
                                    <CInputGroup>
                                      <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                      </CInputGroupText>
                                      <CFormInput
                                        id={`beneficial_owners_residential_address_${i}`}
                                        placeholder="Phone Number"
                                        type="text"
                                        value={residential_address}
                                        onChange={(e) =>
                                          setOperation({ residential_address: e.target.value })
                                        }
                                        disabled={bvn_verified}
                                      />
                                    </CInputGroup>
                                  </CCol>
                                  <CCol sm={4}>
                                    <CFormLabel
                                      htmlFor={`beneficial_owners_verification_code_${i}`}
                                    >
                                      {verified
                                        ? ''
                                        : Date.now() - sent_token <= 5 * 60 * 1000
                                        ? 'Verification Code Sent Via SMS'
                                        : 'Send code to verify this person.'}
                                    </CFormLabel>
                                    <CInputGroup>
                                      {verified ? (
                                        <h5 className="text-success m-0">
                                          Verified <CIcon icon={cilCheckAlt} />
                                        </h5>
                                      ) : Date.now() - sent_token <= 5 * 60 * 1000 ? (
                                        <>
                                          <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                          </CInputGroupText>
                                          <CFormInput
                                            id={`beneficial_owners_verification_code_${i}`}
                                            placeholder="Verification Code"
                                            value={code}
                                            onChange={(e) => setOperation({ code: e.target.value })}
                                            // value={bvn}
                                            // onChange={(e) => setOperation({ bvn: e.target.value })}
                                            // disabled={bvn_verified}
                                          />
                                          <CButton onClick={verifiyToken}>Verify</CButton>
                                        </>
                                      ) : (
                                        <CButton onClick={sendToken}>
                                          Send Verification Token
                                        </CButton>
                                      )}
                                    </CInputGroup>
                                  </CCol>
                                </>
                              ) : (
                                ''
                              )}
                              {verified ? (
                                <>
                                  <CCol sm={12} className="mt-4">
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
                                </>
                              ) : (
                                ''
                              )}
                              {/* {verified ? (
                                <CCol sm={12} className="mt-4">
                                  <CFormLabel>Authorize Bank Mandate</CFormLabel>
                                  <ListOfBanks
                                    banks_synced_at={banks_synced_at}
                                    // mobile_number={phone_number1}
                                    mobile_number="07053761455"
                                    bvn={bvn}
                                    banks={banks}
                                    onChange={(data) => setOperation({ ...data })}
                                  />
                                </CCol>
                              ) : (
                                ''
                              )} */}
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
                      let beneficial_owners = data.beneficial_owners

                      beneficial_owners.push({
                        bvn: '',
                        first_name: '',
                        last_name: '',
                        date_of_birth: '',
                        phone_number1: '',
                        nationality: '',
                        state_of_residence: '',
                        residential_address: '',

                        middle_name: '',
                        gender: '',

                        bvn_verified: false,

                        email: '',
                        id_doc: '',
                        id_no: '',
                      })

                      setData({ ...data, beneficial_owners })
                    }}
                  >
                    Add
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Directors</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs>
                  {data.directors.map(
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
                        verified,

                        banks,
                      },
                      i,
                    ) => {
                      let directors = data.directors

                      const setOperation = (newData) => {
                        directors[i] = { ...directors[i], ...newData }
                        setData({ ...data, directors })
                      }

                      const removeOperation = (i) => {
                        directors.splice(i, 1)
                        setData({ ...data, directors })
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
                                    //image,
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
                        setOperation({ sent_token: Date.now() })
                      }

                      const verifiyToken = () => {
                        const banks = [
                          {
                            accountId:
                              'eyJ0ZXh0IjoidnFDV3hJNTdFK2l0cXVwU3d4MTF2dWZUREJ0cEQ4U0hscWoxVUovMHlNUG9nZWlEZnhCZFp0dVNscW5CeHE3LzV0cWNrZUVnTkg1N1V5ekllbWluSC9yQ3RYRE1BWHN2YnJzcmRXa1BrVFNnZWtCS0FXNlBUbE1TTnpvaHRUaVZ3dWJkQm5sVFl2QzRaNURtazNYODVuYk5aaGtONDBpNDZHanNjTlJoUVBTcEtZc0plV01hTXdIcDh1eVRLS3pReU00OS9xb3cvSkFNQklCa0V6bjZqUT09IiwiaW5pdFZlY3RvciI6Ikx1ZmpTeXZXZjRGdHI2RlFBQ3Q5S3c9PSJ9',
                            accountDescription: '025****220',
                            bankName: 'Wema Bank',
                            bankCode: '035',
                          },
                          {
                            accountId:
                              'eyJ0ZXh0IjoiOFN3RWk4Y0VEbndrMXBuSjRwcnlLSDJiNVZmRDFTaHBicG1lTmVycmtzNHF3SmNsMGRFendjaGE3SkgyYUV3YjJoYzRzZy90Wmtld2NMNmIreDJsamI4MUs4R01ZL1h0L0s4WGtRaXRnSzFiNjNSM29ySE1FcGhkNFhvRGpzeVM4R294eHlZVGZ4cHdLbXpYV0FVQnFHQVVSYWNCWklSQUEwM3R0NmcwV2lTdFdVYXBJWE12T0NmVjhCaGRRU3BIbkhQNG0rUGU0TStxRHhzSnZDMzU0Y1ZSODB0eWtYeDdwTTlnMTBWaUJzdz0iLCJpbml0VmVjdG9yIjoidzFEVXdKNlRIVWpXQXU3Y0g0Ti9iZz09In0=',
                            accountDescription: '149****643',
                            bankName: 'Access Bank Nigeria Plc',
                            bankCode: '044',
                          },
                          {
                            accountId:
                              'eyJ0ZXh0IjoiSlZSbWx4d2VKSE00aUo2d1NxYXo0UnpSUW5LSzJPY1BpUllkTGVhalExY3FqOEs5aTlrMnF2WWI1bHpKNk5CdnpkbEsxaWVFSWhqbGQzTWlZQ3htdkJraU5BcHRZUVpUQlBFOHB6cnU0QkdRbDVjc1hMZnRtUUtvanE4UExmRGNSZlIzQXpVWkVqRVNUc2tVOWJIVXUrZitPcVdLbHkrNWllTHJPbnhvdHUycUFRMHcxbXRCa2dpeENsRG45TlNpbVk5d2JQdjMvWG5NcTc2UVFlYWxLdz09IiwiaW5pdFZlY3RvciI6IitsWkJpSlJXY2dRblhoNnY3aDdVSlE9PSJ9',
                            accountDescription: '311XXXX917',
                            bankName: 'FBN',
                            bankCode: '011',
                          },
                        ]

                        setOperation({ verified: true, banks })
                      }

                      return (
                        <CCard key={i} className="mb-4">
                          {(data.directors ? data.directors.length : 1) > 1 ? (
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
                              <CCol sm={4}>
                                <CFormLabel htmlFor={`directors_first_name_${i}`}>
                                  First Name
                                </CFormLabel>
                                <CInputGroup>
                                  <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                  </CInputGroupText>
                                  <CFormInput
                                    id={`directors_first_name_${i}`}
                                    placeholder="First Name"
                                    value={first_name}
                                    onChange={(e) => setOperation({ first_name: e.target.value })}
                                    disabled={bvn_verified}
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol sm={4}>
                                <CFormLabel htmlFor={`directors_middle_name_${i}`}>
                                  Middle Name
                                </CFormLabel>
                                <CInputGroup>
                                  <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                  </CInputGroupText>
                                  <CFormInput
                                    id={`directors_middle_name_${i}`}
                                    placeholder="Middle Name"
                                    value={middle_name}
                                    onChange={(e) => setOperation({ middle_name: e.target.value })}
                                    disabled={bvn_verified}
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol sm={4}>
                                <CFormLabel htmlFor={`directors_last_name_${i}`}>
                                  Last Name
                                </CFormLabel>
                                <CInputGroup>
                                  <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                  </CInputGroupText>
                                  <CFormInput
                                    id={`directors_last_name_${i}`}
                                    placeholder="Last Name"
                                    value={last_name}
                                    onChange={(e) => setOperation({ last_name: e.target.value })}
                                    disabled={bvn_verified}
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol sm={6}>
                                <CFormLabel htmlFor={`directors_date_of_birth_${i}`}>
                                  Date of Birth
                                </CFormLabel>
                                <CInputGroup>
                                  <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                  </CInputGroupText>
                                  <CFormInput
                                    id={`directors_date_of_birth_${i}`}
                                    placeholder="Date of Birth"
                                    type="date"
                                    value={date_of_birth}
                                    onChange={(e) =>
                                      setOperation({ date_of_birth: e.target.value })
                                    }
                                    disabled={bvn_verified}
                                  />
                                </CInputGroup>
                              </CCol>

                              <CCol sm={6}>
                                <CFormLabel htmlFor={`directors_bvn_${i}`}>
                                  Bank Verification Number (BVN)
                                </CFormLabel>
                                <CInputGroup>
                                  <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                  </CInputGroupText>
                                  <CFormInput
                                    id={`directors_bvn_${i}`}
                                    placeholder="BVN"
                                    value={bvn}
                                    onChange={(e) => setOperation({ bvn: e.target.value })}
                                    disabled={bvn_verified}
                                  />
                                  {bvn_verified ? (
                                    ''
                                  ) : (
                                    <CButton onClick={verifiyBVN}>Check BVN</CButton>
                                  )}
                                </CInputGroup>
                              </CCol>

                              {bvn_verified ? (
                                <>
                                  <CCol sm={6}>
                                    <CFormLabel htmlFor={`directors_email_${i}`}>
                                      Email Address
                                    </CFormLabel>
                                    <CInputGroup>
                                      <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                      </CInputGroupText>
                                      <CFormInput
                                        id={`directors_email_${i}`}
                                        placeholder="Email Address"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setOperation({ email: e.target.value })}
                                        // disabled={bvn_verified}
                                      />
                                    </CInputGroup>
                                  </CCol>

                                  <CCol sm={6}>
                                    <CFormLabel htmlFor={`directors_phone_number1_${i}`}>
                                      Phone Number
                                    </CFormLabel>
                                    <CInputGroup>
                                      <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                      </CInputGroupText>
                                      <CFormInput
                                        id={`directors_phone_number1_${i}`}
                                        placeholder="Phone Number"
                                        type="tel"
                                        value={phone_number1}
                                        onChange={(e) =>
                                          setOperation({ phone_number1: e.target.value })
                                        }
                                        disabled={bvn_verified}
                                      />
                                    </CInputGroup>
                                  </CCol>
                                  <CCol sm={4}>
                                    <CFormLabel htmlFor={`directors_gender_${i}`}>
                                      Gender
                                    </CFormLabel>
                                    <CFormSelect
                                      id={`directors_gender_${i}`}
                                      value={gender}
                                      onChange={(e) => setOperation({ gender: e.target.value })}
                                      disabled={bvn_verified}
                                    >
                                      <option value="" disabled>
                                        Select an Option
                                      </option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Other">Other</option>
                                    </CFormSelect>
                                  </CCol>

                                  <CCol sm={4}>
                                    <CFormLabel htmlFor={`directors_nationality_${i}`}>
                                      Nationality
                                    </CFormLabel>
                                    <CFormSelect
                                      id={`directors_nationality_${i}`}
                                      value={nationality}
                                      onChange={(e) =>
                                        setOperation({ nationality: e.target.value })
                                      }
                                      disabled={bvn_verified}
                                    >
                                      <option value="" disabled>
                                        Select an Option
                                      </option>
                                      {Object.keys(countriesData).map((country) => (
                                        <option value={country}>{country}</option>
                                      ))}
                                      <option value="Other">Other</option>
                                    </CFormSelect>
                                  </CCol>

                                  <CCol sm={4}>
                                    <CFormLabel htmlFor={`directors_state_of_residence_${i}`}>
                                      State of Residence
                                    </CFormLabel>
                                    <CFormSelect
                                      id={`directors_state_of_residence_${i}`}
                                      value={state_of_residence}
                                      onChange={(e) =>
                                        setOperation({ state_of_residence: e.target.value })
                                      }
                                      disabled={bvn_verified}
                                    >
                                      <option value="" disabled>
                                        Select an Option
                                      </option>
                                      {nationality === 'Other' ? (
                                        <option value="Other">Other</option>
                                      ) : (
                                        countriesData[nationality].map((country) => (
                                          <option value={`${country} State`}>{country}</option>
                                        ))
                                      )}
                                    </CFormSelect>
                                  </CCol>
                                  <CCol sm={8}>
                                    <CFormLabel htmlFor={`directors_residential_address_${i}`}>
                                      Residential Address
                                    </CFormLabel>
                                    <CInputGroup>
                                      <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                      </CInputGroupText>
                                      <CFormInput
                                        id={`directors_residential_address_${i}`}
                                        placeholder="Phone Number"
                                        type="text"
                                        value={residential_address}
                                        onChange={(e) =>
                                          setOperation({ residential_address: e.target.value })
                                        }
                                        disabled={bvn_verified}
                                      />
                                    </CInputGroup>
                                  </CCol>
                                  <CCol sm={4}>
                                    <CFormLabel htmlFor={`directors_verification_code_${i}`}>
                                      {verified
                                        ? ''
                                        : Date.now() - sent_token <= 5 * 60 * 1000
                                        ? 'Verification Code Sent Via SMS'
                                        : 'Send code to verify this person.'}
                                    </CFormLabel>
                                    <CInputGroup>
                                      {verified ? (
                                        <h5 className="text-success m-0">
                                          Verified <CIcon icon={cilCheckAlt} />
                                        </h5>
                                      ) : Date.now() - sent_token <= 5 * 60 * 1000 ? (
                                        <>
                                          <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                          </CInputGroupText>
                                          <CFormInput
                                            id={`directors_verification_code_${i}`}
                                            placeholder="Verification Code"
                                            // value={bvn}
                                            // onChange={(e) => setOperation({ bvn: e.target.value })}
                                            // disabled={bvn_verified}
                                          />
                                          <CButton onClick={verifiyToken}>Verify</CButton>
                                        </>
                                      ) : (
                                        <CButton onClick={sendToken}>
                                          Send Verification Token
                                        </CButton>
                                      )}
                                    </CInputGroup>
                                  </CCol>
                                </>
                              ) : (
                                ''
                              )}
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
                      let directors = data.directors

                      directors.push({
                        bvn: '',
                        first_name: '',
                        last_name: '',
                        date_of_birth: '',
                        phone_number1: '',
                        nationality: '',
                        state_of_residence: '',
                        residential_address: '',

                        middle_name: '',
                        gender: '',
                        //image: '',

                        bvn_verified: false,

                        email: '',
                        id_doc: '',
                        id_no: '',
                      })

                      setData({ ...data, directors })
                    }}
                  >
                    Add
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  )
}

export default ProfileCompanyStep
