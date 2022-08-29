import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { formatMoney } from '../Utils/formatMoney'

const CollateralOption = ({
  maxPercentage,
  onPercentageChange,
  investor,
  available,
  remove,
  percentage,
  amount,
  totalAmount,
  maxAmount,
}) => {
  const remainingPercentage = ((maxAmount - totalAmount) / amount) * 100
  console.log('Remaining %: ', remainingPercentage)
  const max = Math.min(maxPercentage, remainingPercentage, available * 100)
  console.log('Max %: ', max)
  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol
            sm={5}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <h4 className="m-0">{formatMoney(amount, false, false)}</h4>
            <span>
              {'('}
              {percentage.toFixed(2)}%{')'}
            </span>
          </CCol>
          <CCol
            sm={3}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span>{investor}</span>
          </CCol>
          {/* <CCol sm={2}>
            <CInputGroup>
              <CFormInput
                id="specificSizeInputGroupUsername"
                placeholder="Amount"
                type="number"
                // max={max}
                // min={0.01}
                value={amount}
                // onInput={(e) => {
                //   let val = parseInt(e.target.value)

                //   let percentage = parseFloat((val / totalAmount) * 100).toFixed(2)

                // //   if (val < 0.01) {
                // //     alert("Percentage can not be less than '0.01'")
                // //   }

                //   if (percentage > max) {
                //     percentage = max
                //   }

                //   if (percentage < 0.01) {
                //     percentage = 0.01
                //   }

                //   onPercentageChange(percentage)
                // }}
              />
              <CInputGroupText>₦</CInputGroupText>
            </CInputGroup>
          </CCol>
          <CCol sm={2}>
            <CInputGroup>
              <CFormInput
                id="specificSizeInputGroupUsername"
                placeholder="Percentage"
                type="number"
                // max={max}
                // min={0.01}
                value={percentage}
                onInput={(e) => {
                  let val = parseFloat(e.target.value).toFixed(2)

                  //   if (val < 0.01) {
                  //     alert("Percentage can not be less than '0.01'")
                  //   }

                  if (val > max) {
                    onPercentageChange(max.toFixed(2))
                  } else if (val < 0.01) {
                    onPercentageChange(0.01)
                  } else {
                    onPercentageChange(val)
                  }
                }}
              />
              <CInputGroupText>%</CInputGroupText>
            </CInputGroup>
          </CCol> */}
          <CCol
            sm={4}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <CButton onClick={remove}>Withdraw Application</CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default CollateralOption
