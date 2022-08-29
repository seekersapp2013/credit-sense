import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
  CTable,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { api } from 'src/functions/api'
import Loader from '../Loader'
import { formatMoney } from '../Utils/formatMoney'

const CollateralModal = ({
  open,
  onClose,
  value,
  onChange,
  current,
  max,
  maxPercentage,
  available,
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (open) {
      setLoading(true)
      api
        .get('/data/collaterals')
        .then(({ success, data }) => {
          if (success) {
            console.log('collaterals: ', data)
            setData(data)
          }
        })
        .finally(() => setLoading(false))
    }
  }, [open])

  const addToValue = (collateral) => {
    // const maxOfCollateral = collateral.value * (maxPercentage / 100)
    const maxToBeAvailable = (available * 100) / collateral.value
    const percentage = Math.min(maxPercentage, maxToBeAvailable)

    console.log('Max To Be Available: ', maxToBeAvailable)
    console.log('Percentage: ', percentage)

    // const minPercentage = 1
    // const minAmount = parseInt((collateral.value * minPercentage) / 100)
    // const maxAvailablePercentage = (max - current) / amount

    // console.log(minAmount)
    // console.log(minAmount <= max - current)

    if (percentage > 0) {
      const newValue = value
      newValue.push({ ...collateral, percentage })
      onChange(newValue)
      onClose()
    } else {
      alert('Sorry, you can not apply for this collateral as it is more than you need.')
    }
  }

  const columns = [
    { key: 'investor', label: 'Investor', _props: { scope: 'col' } },
    { key: 'value', label: 'Amount', _props: { scope: 'col' } },
    { key: 'type', label: 'Type', _props: { scope: 'col' } },
    { key: 'available', label: 'Available', _props: { scope: 'col' } },
    { key: 'interest', label: 'Interest', _props: { scope: 'col' } },
    { key: 'action', label: 'Action', _props: { scope: 'col' } },
  ]

  return (
    <CModal visible={open} onClose={onClose} size="xl">
      <CModalHeader closeButton>
        <h5 className="text-center">Select a Collateral to Add</h5>
      </CModalHeader>
      <CModalBody>
        {loading ? (
          <Loader />
        ) : data ? (
          <CRow>
            {data.map((collateral) => {
              const disabled = value.filter((data) => data.$id === collateral.$id)[0]

              return (
                <CCol sm={3}>
                  <CCard className="mb-4">
                    <CCardImage orientation="top" src="/images/react.jpg" />
                    <CCardBody>
                      <CCardTitle>{collateral.investor}</CCardTitle>
                      <CCardText>
                        Interest: {`${(collateral.interest * 100).toFixed(2)}%`}
                        <br />
                        Available: {`${(collateral.available * 100).toFixed(2)}%`}
                      </CCardText>
                      <h4>{formatMoney(collateral.value, false, false)}</h4>
                      <div style={{ textAlign: 'right' }}>
                        <CButton
                          disabled={disabled ? true : false}
                          onClick={() => {
                            addToValue(collateral)
                          }}
                        >
                          Apply
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              )

              return {
                ...collateral,
                value: formatMoney(collateral.value, false, false),
                interest: `${(collateral.interest * 100).toFixed(2)}%`,
                available: `${(collateral.available * 100).toFixed(2)}%`,
                action: (
                  <CButton
                    disabled={disabled ? true : false}
                    onClick={() => {
                      addToValue(collateral)
                    }}
                  >
                    Apply
                  </CButton>
                ),
              }
            })}
          </CRow>
        ) : (
          // <CTable
          //   hover
          //   columns={columns}
          //   items={}
          //   responsive
          // />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '75vh',
              width: '100%',
            }}
          >
            No collaterals found at the moment
          </div>
        )}
      </CModalBody>
    </CModal>
  )
}

export default CollateralModal
