import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import { formatMoney } from '../Utils/formatMoney'
import AddInstruction from './AddInstruction'
import CollateralModal from './CollateralModal'
import CollateralOption from './CollateralOption'

const CollateralSelector = ({
  data,
  selected,
  onChange = () => {},
  amount,
  maxPercentage,
  total,
}) => {
  const [showList, setShowList] = useState(false)

  const add = () => setShowList(true)

  const removeCollateral = (i) => {
    const collaterals = selected
    collaterals.splice(i, 1)
    onChange(collaterals)
  }

  const addCollateral = (collaterals) => {
    onChange(collaterals)
  }

  //   const totalAmount = data
  //     ? data.length
  //       ? data.map(({ value, percentage }) => (value * percentage) / 100).reduce((a, b) => a + b)
  //       : 0
  //     : 0

  const collaterals = selected.length
    ? selected.map((props) => ({
        amount: parseInt((props.value * props.percentage) / 100),
        ...props,
      }))
    : []

  const avgInterest = collaterals.length
    ? collaterals.map(({ interest }) => interest).reduce((a, b) => a + b) / collaterals.length
    : ''

  const estRepayment = collaterals.length
    ? collaterals
        .map(({ percentage, value, interest }) => ((value * percentage) / 100) * (1 + interest))
        .reduce((a, b) => a + b)
    : ''

  return (
    <>
      <CCard className="my-3">
        <CCardBody>
          <CRow>
            {collaterals.length ? (
              collaterals.map(({ $id, ...props }, i) => {
                //   const props = data.filter((data) => data.$id === $id)[0]
                return (
                  <CCol sm={12} className="my-2" key={i}>
                    <CollateralOption
                      maxPercentage={10}
                      onPercentageChange={(value) => {
                        const collaterals = selected
                        console.log('data: ', data)
                        collaterals[i].percentage = value

                        onChange(collaterals)
                      }}
                      remove={() => removeCollateral(i)}
                      totalAmount={total}
                      maxAmount={amount}
                      {...props}
                    />
                  </CCol>
                )
              })
            ) : (
              <AddInstruction />
            )}
          </CRow>

          <CRow>
            <CCol sm={12} className="my-2" style={{ display: 'flex', justifyContent: 'center' }}>
              <CButton onClick={add}>Add Collateral</CButton>
            </CCol>
          </CRow>

          {selected.length ? (
            <CRow>
              <CCol sm={12} className="my-2"></CCol>
              <CCol sm={4}>
                <CCard>
                  <CCardHeader>Total</CCardHeader>
                  <CCardBody>
                    <h3 className="text-center">{formatMoney(total, false, false)}</h3>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol sm={4}>
                <CCard>
                  <CCardHeader>Average Interest</CCardHeader>
                  <CCardBody>
                    <h3 className="text-center">{(avgInterest * 100).toFixed(2)}%</h3>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol sm={4}>
                <CCard>
                  <CCardHeader>Estiamted Repayment</CCardHeader>
                  <CCardBody>
                    <h3 className="text-center">{formatMoney(estRepayment, false, false)}</h3>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            ''
          )}
        </CCardBody>
      </CCard>

      {data ? (
        <CollateralModal
          open={showList}
          onClose={() => setShowList(false)}
          value={collaterals}
          onChange={addCollateral}
          //   max={(amount * percentageAvailable) / 100}
          //   current={totalAmount}
          maxPercentage={maxPercentage}
          available={amount - total}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default CollateralSelector
