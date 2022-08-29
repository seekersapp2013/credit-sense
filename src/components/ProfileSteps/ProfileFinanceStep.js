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

import { appwrite } from 'src/functions/appwrite'

const ProfileFinanceStep = ({ data, setData }) => {
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Financial Statement (Monthly)</CCardHeader>
            <CCardBody>
              <CForm className="row gx-3 gy-2 align-items-center">
                <CCol sm={6}>
                  <CFormLabel htmlFor="initial_cash_balance">Initial Cash Balance</CFormLabel>
                  <CFormInput
                    id="initial_cash_balance"
                    placeholder="Initial Cash Balance"
                    value={data.initial_cash_balance}
                    type="number"
                    onChange={(e) => setData({ ...data, initial_cash_balance: e.target.value })}
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
            <CCardHeader>Financial Statement (Annual)</CCardHeader>
            <CCardBody>
              <CForm className="row gx-3 gy-2 align-items-center">
                <CCol sm={12}>
                  <small>
                    <b>Taxes & Inflation</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="income_tax_rate">Income Tax Rate</CFormLabel>
                  <CFormInput
                    id="income_tax_rate"
                    placeholder="Income Tax Rate"
                    type="number"
                    value={data.taxes?.income_tax_rate}
                    onChange={(e) =>
                      setData({
                        ...data,
                        taxes: { ...data.taxes, income_tax_rate: e.target.value },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inflation">Inflation</CFormLabel>
                  <CFormInput
                    id="inflation"
                    placeholder="Inflation"
                    type="number"
                    value={data.taxes?.inflation}
                    onChange={(e) =>
                      setData({
                        ...data,
                        taxes: { ...data.taxes, inflation: e.target.value },
                      })
                    }
                  />
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Valuation</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="business_terminal_value">Business Terminal Value</CFormLabel>
                  <CFormInput
                    id="business_terminal_value"
                    placeholder="Business Terminal Value"
                    type="text"
                    value={data.valuation?.business_terminal_value}
                    onChange={(e) =>
                      setData({
                        ...data,
                        valuation: {
                          ...data.valuation,
                          business_terminal_value: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="discount_rate_today">Discount Rate - Today</CFormLabel>
                  <CFormInput
                    id="discount_rate_today"
                    placeholder="Discount Rate - Today"
                    type="number"
                    value={data.valuation?.discount_rate_today}
                    onChange={(e) =>
                      setData({
                        ...data,
                        valuation: {
                          ...data.valuation,
                          discount_rate_today: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="xEBITDA">xEBITDA</CFormLabel>
                  <CFormInput
                    id="xEBITDA"
                    placeholder="xEBITDA"
                    type="number"
                    value={data.valuation?.xEBITDA}
                    onChange={(e) =>
                      setData({
                        ...data,
                        valuation: {
                          ...data.valuation,
                          xEBITDA: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="debt_capital_ratio">Debt/Capital Ratio</CFormLabel>
                  <CFormInput
                    id="debt_capital_ratio"
                    placeholder="Debt/Capital Ratio"
                    type="number"
                    value={data.valuation?.debt_capital_ratio}
                    onChange={(e) =>
                      setData({
                        ...data,
                        valuation: {
                          ...data.valuation,
                          debt_capital_ratio: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="debt_interest_rate">Debt Interest Rate</CFormLabel>
                  <CFormInput
                    id="debt_interest_rate"
                    placeholder="Debt Interest Rate"
                    type="number"
                    value={data.valuation?.debt_interest_rate}
                    onChange={(e) =>
                      setData({
                        ...data,
                        valuation: {
                          ...data.valuation,
                          debt_interest_rate: e.target.value,
                        },
                      })
                    }
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
            <CCardHeader>Capital Expenditures</CCardHeader>
            <CCardBody>
              <CForm className="row gx-3 gy-2 align-items-center">
                <CCol sm={12}>
                  <small>
                    <b>Operating Cash</b>
                  </small>
                </CCol>
                <CCol sm={6}>
                  <CFormLabel htmlFor="operating_cash_balance">Balance</CFormLabel>
                  <CFormInput
                    id="operating_cash_balance"
                    placeholder="Balance"
                    type="number"
                    value={data.operating_cash?.balance}
                    onChange={(e) =>
                      setData({
                        ...data,
                        operating_cash: {
                          ...data.operating_cash,
                          balance: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="operating_cash_percentage_of_revenues">
                    Percentage of Revenues
                  </CFormLabel>
                  <CFormInput
                    id="operating_cash_percentage_of_revenues"
                    placeholder="Percentage of Revenues"
                    type="number"
                    value={data.operating_cash?.percentage_of_revenues}
                    onChange={(e) =>
                      setData({
                        ...data,
                        operating_cash: {
                          ...data.operating_cash,
                          percentage_of_revenues: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="operating_cash_pending_income_total_income">
                    Pending Income/Total Income
                  </CFormLabel>
                  <CFormInput
                    id="operating_cash_pending_income_total_income"
                    placeholder="Percentage of Revenues"
                    type="number"
                    value={data.operating_cash?.pending_income_total_income}
                    onChange={(e) =>
                      setData({
                        ...data,
                        operating_cash: {
                          ...data.operating_cash,
                          pending_income_total_income: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="operating_cash_prepaid_days_outstanding">
                    Pre-paid Days Outstanding
                  </CFormLabel>
                  <CFormInput
                    id="operating_cash_prepaid_days_outstanding"
                    placeholder="Pre-paid Days Outstanding"
                    type="number"
                    value={data.operating_cash?.prepaid_days_outstanding}
                    onChange={(e) =>
                      setData({
                        ...data,
                        operating_cash: {
                          ...data.operating_cash,
                          prepaid_days_outstanding: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="operating_cash_accounts_payable">
                    A/P as % of total COGS
                  </CFormLabel>
                  <CFormInput
                    id="operating_cash_accounts_payable"
                    placeholder="A/P as % of total COGS"
                    type="number"
                    value={data.operating_cash?.accounts_payable}
                    onChange={(e) =>
                      setData({
                        ...data,
                        operating_cash: {
                          ...data.operating_cash,
                          accounts_payable: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Capital Expenditures</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="capital_expenditures_estimate_new_computers">
                    Automatically estimate new computer purchases for new employees
                  </CFormLabel>
                  <CFormSelect
                    id="capital_expenditures_estimate_new_computers"
                    value={data.capital_expenditures?.estimate_new_computers}
                    onChange={(e) =>
                      setData({
                        ...data,
                        capital_expenditures: {
                          ...data.capital_expenditures,
                          estimate_new_computers: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="" disabled>
                      Select an Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </CFormSelect>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="capital_expenditures_price_per_computer">
                    Price Per Computer
                  </CFormLabel>
                  <CFormInput
                    id="capital_expenditures_price_per_computer"
                    placeholder="Price Per Computer"
                    type="number"
                    value={data.capital_expenditures?.price_per_computer}
                    onChange={(e) =>
                      setData({
                        ...data,
                        capital_expenditures: {
                          ...data.capital_expenditures,
                          price_per_computer: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Time for Assets to Depreciate</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="assets_depreciation_time_apartment_office_fixings">
                    Apartment/Office Fixings
                  </CFormLabel>
                  <CFormInput
                    id="assets_depreciation_time_apartment_office_fixings"
                    placeholder="Apartment/Office Fixings"
                    type="number"
                    value={data.assets_depreciation_time?.apartment_office_fixings}
                    onChange={(e) =>
                      setData({
                        ...data,
                        assets_depreciation_time: {
                          ...data.assets_depreciation_time,
                          apartment_office_fixings: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="assets_depreciation_time_office_furniture">
                    Office Furniture
                  </CFormLabel>
                  <CFormInput
                    id="assets_depreciation_time_office_furniture"
                    placeholder="Office Furniture"
                    type="number"
                    value={data.assets_depreciation_time?.office_furniture}
                    onChange={(e) =>
                      setData({
                        ...data,
                        assets_depreciation_time: {
                          ...data.assets_depreciation_time,
                          office_furniture: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="assets_depreciation_time_computers">Computers</CFormLabel>
                  <CFormInput
                    id="assets_depreciation_time_computers"
                    placeholder="Computers"
                    type="number"
                    value={data.assets_depreciation_time?.computers}
                    onChange={(e) =>
                      setData({
                        ...data,
                        assets_depreciation_time: {
                          ...data.assets_depreciation_time,
                          computers: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="assets_depreciation_time_telecom_equipment">
                    Telecom Equipment
                  </CFormLabel>
                  <CFormInput
                    id="assets_depreciation_time_telecom_equipment"
                    placeholder="Telecom Equipment"
                    type="number"
                    value={data.assets_depreciation_time?.telecom_equipment}
                    onChange={(e) =>
                      setData({
                        ...data,
                        assets_depreciation_time: {
                          ...data.assets_depreciation_time,
                          telecom_equipment: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="assets_depreciation_time_tech_infrastructure">
                    Servers & Other Tech Infrastructure
                  </CFormLabel>
                  <CFormInput
                    id="assets_depreciation_time_tech_infrastructure"
                    placeholder="Servers & Other Tech Infrastructure"
                    type="number"
                    value={data.assets_depreciation_time?.tech_infrastructure}
                    onChange={(e) =>
                      setData({
                        ...data,
                        assets_depreciation_time: {
                          ...data.assets_depreciation_time,
                          tech_infrastructure: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="assets_depreciation_time_other">Other</CFormLabel>
                  <CFormInput
                    id="assets_depreciation_time_other"
                    placeholder="Other"
                    type="number"
                    value={data.assets_depreciation_time?.other}
                    onChange={(e) =>
                      setData({
                        ...data,
                        assets_depreciation_time: {
                          ...data.assets_depreciation_time,
                          other: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ProfileFinanceStep
