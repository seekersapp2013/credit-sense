import { cilReload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CButtonToolbar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdownDivider,
  CRow,
} from '@coreui/react'
import { useEffect, useRef, useState } from 'react'
import Loader from 'src/components/Loader'
import creditchek from 'src/functions/creditchek'
import ListItem from './ListItem'

const banksDemo = [
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

const hoursTillReload = 1

const ListOfBanks = ({
  banks_synced_at,
  mobile_number,
  bvn,
  banks = [],
  onChange,
  totalAmount,
  name,
  email,
}) => {
  const interval = useRef(null)

  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    interval.current = setInterval(() => {
      const now = Date.now()
      //   console.log('now: ', now)
      //   console.log('synced at: ', banks_synced_at)
      const diff = now - banks_synced_at

      if (diff && diff < 1 * 60 * 60 * 1000) {
        const remainingSecs = hoursTillReload * 60 * 60 - Math.floor(diff / 1000)
        // console.log('Remaining Seconds: ', remainingSecs)
        const hh = Math.floor(remainingSecs / 60 / 60)
        const mm = Math.floor(hh ? remainingSecs % (hh * 60) : remainingSecs / 60)
        const ss = Math.floor(mm ? remainingSecs % (hh * 60 * 60 + mm * 60) : remainingSecs)

        // console.log('hh: ', hh)
        // console.log('mm: ', mm)
        // console.log('ss: ', ss)

        setTimeLeft(
          `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss
            .toString()
            .padStart(2, '0')}`,
        )
      } else {
        setTimeLeft('')
        clearInterval(interval.current)
      }
    }, 1000)
  }, [banks_synced_at])

  //   const [banks, setBanks] = useState()

  const syncBanks = () => {
    setLoading(true)
    creditchek
      .getBanks({ type: 'mobile_number', mobile_number })
      .then((res) => {
        console.log(res)
        if (res.success) {
          console.log(res.data.banks)
          //   onChange({ banks_synced_at: Date.now(), banks: res.data.banks })
          onChange({ banks_synced_at: Date.now(), banks: banksDemo })
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  const setAuthorized = (i, value) => {
    const newData = banks

    newData[i].authorized = value

    onChange({ banks: newData })
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>Bank Accounts</CCol>
            <CCol style={{ textAlign: 'right' }}>
              <span className="text-secondary m-2">{timeLeft}</span>
              <CButton onClick={syncBanks} disabled={timeLeft ? true : false}>
                <CIcon icon={cilReload} />
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {loading ? (
            <Loader />
          ) : (
            <CRow>
              {banks.length ? (
                banks.map(({ bankName, accountDescription, bankCode, authorized = false }, i) => (
                  <>
                    <ListItem
                      key={i}
                      bankName={bankName}
                      accountDescription={accountDescription}
                      bankCode={bankCode}
                      authorized={authorized}
                      setAuthorized={(value) => setAuthorized(i, value)}
                      mobile_number={mobile_number}
                      name={name}
                      email={email}
                      amount={parseInt(totalAmount / banks.length)}
                    />
                    <CDropdownDivider />
                  </>
                ))
              ) : (
                <CCol className="text-center">
                  No banks found. Link accounts and refresh to list banks.
                </CCol>
              )}
            </CRow>
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default ListOfBanks
