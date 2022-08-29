import { cilCheck, cilCheckAlt } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
import { useState } from 'react'
import { dateToInput } from 'src/components/Utils/dateToInput'
import fsi from 'src/functions/fsi'

const ListItem = ({
  bankName,
  accountDescription,
  bankCode,
  authorized,
  setAuthorized,
  mobile_number,
  amount,
  name,
  email,
}) => {
  const [accountNo, setAccountNo] = useState('')
  const [sent, setSent] = useState(false)

  const [ref, setRef] = useState('')

  const [otp, setOtp] = useState('')

  const start_date = new Date()
  start_date.setFullYear(start_date.getFullYear() + 1)

  const end_date = new Date()
  end_date.setFullYear(start_date.getFullYear() + 2)

  const authorize = () => {
    alert(accountNo)
    fsi.woven
      .recurringMandate({
        customer_name: name,
        customer_email: email,
        // customer_mobile: '08012345678',
        customer_mobile: mobile_number,
        // customer_reference: '39232131257610',
        customer_reference: Date.now(),
        account_number: accountNo,
        bank_code: bankCode,
        amount: amount,
        currency: 'NGN',
        call_back_url: 'https://c949c50b6ff43675ec9f206211ea806e.m.pipedream.net',
        mandate_type: 'direct',
        narration: 'Mandate on Collateral',
        frequency: 'monthly',
        start_date: dateToInput(start_date),
        end_date: dateToInput(end_date),
        meta_data: {
          product_id: 'AB001',
        },
      })
      .then((res) => {
        console.log(res)
        if (res.success) {
          setRef(res.body.mandate_reference)
          setSent(true)
        }
      })
      .catch((error) => console.log(error))
  }

  const verify = () => {
    alert(accountNo)
    fsi.woven
      .validateMandate(ref, { otp })
      .then((res) => {
        console.log(res)
        if (res.success) {
          setAuthorized(true)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <CCol sm={12}>
        <CRow>
          <CCol sm={4} style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <div>{bankName}</div>
              <div>
                <strong>{accountDescription}</strong>
              </div>
            </div>
          </CCol>
          <CCol sm={4} style={{ display: 'flex', alignItems: 'center' }}>
            <CFormInput
              placeholder="Enter full account number"
              type="text"
              onInput={({ target: { value } }) => setAccountNo(value)}
              disabled={authorized}
            />
          </CCol>
          <CCol
            sm={4}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          >
            {authorized ? (
              <h6 className="text-success">
                Authorized <CIcon icon={cilCheckAlt} />
              </h6>
            ) : sent ? (
              <CInputGroup>
                <CFormInput
                  placeholder="Enter OTP"
                  type="text"
                  onInput={({ target: { value } }) => setOtp(value)}
                />
                <CButton onClick={verify}>Confirm OTP</CButton>
              </CInputGroup>
            ) : (
              <CButton onClick={authorize}>Authorize</CButton>
            )}
          </CCol>
        </CRow>
      </CCol>
    </>
  )
}

export default ListItem
