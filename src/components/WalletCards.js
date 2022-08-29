import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormLabel,
  CFormInput,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilOptions } from '@coreui/icons'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { shortMoney } from 'src/components/Utils/shortMoney'
import { appwrite, objectifySubStrings, stringifySubObjects } from 'src/functions/appwrite'
import planProfiles from 'src/components/Plans/planProfiles'
import AccountContext from './AccountContext'

const WalletCards = () => {
  const { account, plan } = useContext(AccountContext)

  console.log('Account & Plan: ', account, plan)

  const { $id, name, email } = account

  const [visible, setVisible] = useState(false)
  const [showPayPal, setShowPayPal] = useState(false)
  const [fundParams, setFundParams] = useState({
    currency: '',
    amount: '0',
  })

  const [walletData, setWalletData] = useState({
    user: $id,
    balances: { USD: 0, NGN: 0, GBP: 0, EUR: 0 },
    history: [
      { wallet: 'USD', amount: 0, type: 'INITIALIZE', balance: 0, date: Date.now() },
      { wallet: 'NGN', amount: 0, type: 'INITIALIZE', balance: 0, date: Date.now() },
      { wallet: 'GBP', amount: 0, type: 'INITIALIZE', balance: 0, date: Date.now() },
      { wallet: 'EUR', amount: 0, type: 'INITIALIZE', balance: 0, date: Date.now() },
    ],
  })

  const minValue = { USD: 1, NGN: 1, GBP: 1, EUR: 1 }

  const getWalletInfo = async () => {
    try {
      const wallet = await appwrite.fetchWallet()
      console.log('Wallet', objectifySubStrings(wallet))
      setWalletData(objectifySubStrings(wallet))
    } catch (error) {
      try {
        const wallet = await appwrite.createWallet(stringifySubObjects(walletData))
        console.log(wallet)
        setWalletData(objectifySubStrings(wallet))
      } catch (error) {
        console.log(error)
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getWalletInfo(), [])

  useEffect(() => setShowPayPal(false), [fundParams])

  const fundWallet = (currency) => {
    setFundParams({ ...fundParams, currency, amount: '0' })
    setVisible(!visible)
    // const initializePayment = useFincraPayment(config)
    // initializePayment(onSuccess, onClose)
  }

  const initPayment = () => {
    const { amount, currency } = fundParams

    // eslint-disable-next-line no-undef
    Fincra.initialize({
      key: 'pk_NjI5NWU3YjcwNjZmNzViZjBhYWM1M2Q4OjoxMjE3ODk=',
      amount,
      currency,
      customer: {
        name,
        email,
      },

      onClose: function () {
        alert('Transaction was not completed, window closed.')
      },
      onSuccess: function (data) {
        const reference = data.reference
        alert('Payment complete! Reference: ' + reference)
      },
    })

    // fetch('https://sandboxapi.fincra.com/checkout/payments', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'api-key': process.env.FINCRA_PUBLIC_KEY,
    //   },
    //   mode: 'cors',
    //   body: JSON.stringify({
    //     amount,
    //     redirectUrl: 'http://localhost:3000/verify-payment',
    //     currency,
    //     // reference: 'string',
    //     feeBearer: 'customer',
    //     customer: { name, email, phoneNumber: '08061154423' },
    //     settlementDestination: 'wallet',
    //     paymentMethods: [0, 1],
    //     defaultPaymentMethod: 'bank_transfer',
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((response) => alert(response))
    //   //   .then((response) => window.open('logout.aspx', '_top'))
    //   .catch((err) => alert(err))
  }

  const updateWallet = async (amount, type, currency, name) => {
    try {
      let id = walletData.$id
      let balances = walletData.balances
      let history = walletData.history

      if (type === 'CREDIT') {
        balances[currency] += amount
      }
      if (type === 'DEBIT') {
        balances[currency] -= amount
      }

      history.push({
        wallet: currency,
        amount,
        type,
        balance: balances[currency],
        date: Date.now(),
      })

      const wallet = await appwrite.updateWallet(
        id,
        stringifySubObjects({ ...walletData, balances, history }),
      )

      console.log('New Wallet: ', objectifySubStrings(wallet))
      setWalletData(objectifySubStrings(wallet))

      alert(`Transaction completed by ${name}`)
    } catch (error) {
      console.log(error)
    }
  }

  const isOwing = plan.status === 'OWING'

  const wallets = [
    {
      currency: 'USD',
      color: 'primary',
      history: walletData.history.filter(({ wallet }) => wallet === 'USD'),
      balance: isOwing
        ? walletData.balances.USD - planProfiles[plan.index].price.USD
        : walletData.balances.USD,
      options: [
        { title: 'Fund Wallet', action: () => fundWallet('USD'), disabled: false },
        {
          title: 'Withdraw from Wallet',
          action: () => {},
          disabled: isOwing ? true : false,
        },
        {
          title: 'Create Account',
          action: () => {},
          disabled: isOwing ? true : false,
        },
      ],
    },
    {
      currency: 'NGN',
      color: 'success',
      history: walletData.history.filter(({ wallet }) => wallet === 'NGN'),
      balance: walletData.balances.NGN,
      options: [
        { title: 'Fund Wallet', action: () => fundWallet('NGN'), disabled: true },
        {
          title: 'Withdraw from Wallet',
          action: () => {},
          disabled: isOwing ? true : false,
        },
        {
          title: 'Create Account',
          action: () => {},
          disabled: isOwing ? true : false,
        },
      ],
    },
    {
      currency: 'GBP',
      color: 'warning',
      history: walletData.history.filter(({ wallet }) => wallet === 'GBP'),
      balance: walletData.balances.GBP,
      options: [
        { title: 'Fund Wallet', action: () => fundWallet('GBP'), disabled: false },
        {
          title: 'Withdraw from Wallet',
          action: () => {},
          disabled: isOwing ? true : false,
        },
        {
          title: 'Create Account',
          action: () => {},
          disabled: isOwing ? true : false,
        },
      ],
    },
    {
      currency: 'EUR',
      color: 'danger',
      history: walletData.history.filter(({ wallet }) => wallet === 'EUR'),
      balance: walletData.balances.EUR,
      options: [
        { title: 'Fund Wallet', action: () => fundWallet('EUR'), disabled: false },
        {
          title: 'Withdraw from Wallet',
          action: () => {},
          disabled: isOwing ? true : false,
        },
        {
          title: 'Create Account',
          action: () => {},
          disabled: isOwing ? true : false,
        },
      ],
    },
  ]

  return (
    <>
      <CRow>
        {wallets.map(({ currency, color, history, balance, options }, i) => {
          const limit = 14
          const labels = [
            ...Array(limit - history.length).fill(new Date(history[0].date).toLocaleString()),
            ...history.map(({ date: time }, i) => {
              const date = new Date(time)
              return date.toLocaleString()
            }),
          ]
          const chartData = [
            ...Array(limit - history.length).fill(0),
            ...history.map(({ balance }) => balance),
          ]
          return (
            <CCol key={i} sm={6} lg={3}>
              <CWidgetStatsA
                className="mb-4"
                color={color}
                value={
                  <>
                    {shortMoney(balance)}{' '}
                    <span className="fs-6 fw-normal">
                      (-12.4% <CIcon icon={cilArrowBottom} />)
                    </span>
                  </>
                }
                title={currency}
                action={
                  <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="p-0">
                      <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      {options.map(({ title, action, disabled }, i) => (
                        <CDropdownItem key={i} disabled={disabled} onClick={action}>
                          {title}
                        </CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                }
                chart={
                  <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: '70px' }}
                    data={{
                      labels: labels.slice(labels.length > limit ? limit - 1 : 0, labels.length),
                      datasets: [
                        {
                          label: currency,
                          backgroundColor: 'rgba(255,255,255,.2)',
                          borderColor: 'rgba(255,255,255,.55)',
                          data: chartData.slice(
                            labels.length > limit ? limit - 1 : 0,
                            labels.length,
                          ),
                          fill: true,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          display: false,
                        },
                        y: {
                          display: false,
                        },
                      },
                      elements: {
                        line: {
                          borderWidth: 2,
                          tension: 0.4,
                        },
                        point: {
                          radius: 0,
                          hitRadius: 10,
                          hoverRadius: 4,
                        },
                      },
                    }}
                  />
                }
              />
            </CCol>
          )
        })}
      </CRow>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Fund {fundParams.currency} Wallet</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm={12}>
              <CFormLabel htmlFor="amount">Fund Amount</CFormLabel>
              <CFormInput
                id="amount"
                placeholder="Fund Amount"
                type="number"
                value={fundParams.amount}
                min={minValue[fundParams.currency]}
                onChange={(e) =>
                  setFundParams({
                    ...fundParams,
                    amount: e.target.value,
                  })
                }
              />
            </CCol>
          </CRow>
          {/* I will not close if you click outside me. Don{"'"}t even try to press escape key. */}
        </CModalBody>
        <CModalFooter>
          {parseFloat(fundParams.amount) > minValue[fundParams.currency] && showPayPal ? (
            <PayPalScriptProvider
              options={{
                'client-id':
                  'AdyBKCjpAE-bVBWe35eDkWzlo-BHaIEMUJELOBaUnlS3jLDrbD28xH2-DRjFDGZRl3iq9t6uMJbMZ4J3',
                intent: 'capture',
                currency: fundParams.currency,
                //   'data-client-token': 'abc123xyz==',
              }}
            >
              <PayPalButtons
                style={{ layout: 'horizontal' }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: fundParams.amount,
                        },
                      },
                    ],
                  })
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    const name = details.payer.name.given_name

                    const { currency_code: currency, value: amount } =
                      details.purchase_units[0].amount

                    updateWallet(parseFloat(amount), 'CREDIT', currency, name)

                    setVisible(false)
                  })
                }}
              />
            </PayPalScriptProvider>
          ) : (
            <>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton
                color="primary"
                disabled={
                  parseFloat(fundParams.amount) > minValue[fundParams.currency] ? false : true
                }
                onClick={() => setShowPayPal(true)}
              >
                Continue
              </CButton>
            </>
          )}
        </CModalFooter>
      </CModal>
    </>
  )
}

WalletCards.propTypes = {
  account: PropTypes.object,
  plan: PropTypes.object,
}

export const debitWallet = async (currency, amount) => {
  try {
    const wallet = objectifySubStrings(await appwrite.fetchWallet())

    let id = wallet.$id
    let balances = wallet.balances
    let history = wallet.history

    if (balances[currency] >= amount) {
      balances[currency] -= amount
    } else {
      return 'Insufficient Balance'
    }

    history.push({
      wallet: currency,
      amount,
      type: 'DEBIT',
      balance: balances[currency],
      date: Date.now(),
    })

    try {
      const res = await appwrite.updateWallet(
        id,
        stringifySubObjects({ ...wallet, balances, history }),
      )

      console.log('New Wallet: ', objectifySubStrings(res))

      return true
    } catch (error) {
      console.log(error)
      return 'An error occured'
    }
  } catch (error) {
    console.log(error)
    try {
      const wallet = await appwrite.createWallet(
        stringifySubObjects({
          user: JSON.parse(localStorage.getItem('user')).$id,
          balances: { USD: 0, NGN: 0, GBP: 0, EUR: 0 },
          history: [
            { wallet: 'USD', amount: 0, type: 'INITIALIZE', balance: 0, date: Date.now() },
            { wallet: 'NGN', amount: 0, type: 'INITIALIZE', balance: 0, date: Date.now() },
            { wallet: 'GBP', amount: 0, type: 'INITIALIZE', balance: 0, date: Date.now() },
            { wallet: 'EUR', amount: 0, type: 'INITIALIZE', balance: 0, date: Date.now() },
          ],
        }),
      )
      console.log(wallet)
    } catch (error) {
      console.log(error)
    }
    return ''
  }
}

export default WalletCards
