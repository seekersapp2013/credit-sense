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

const ProfileSalesStep = ({ data, setData }) => {
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>General</CCardHeader>
            <CCardBody>
              <CForm className="row gx-3 gy-2 align-items-center">
                <CCol sm={6}>
                  <CFormLabel htmlFor="fundraising_close_date">Fundraising Close Date</CFormLabel>
                  <CFormInput
                    id="fundraising_close_date"
                    placeholder="Fundraising Close Date"
                    type="date"
                    value={data.fundraising_close_date}
                    onChange={(e) => setData({ ...data, fundraising_close_date: e.target.value })}
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="investment_amount">Investment Amount</CFormLabel>
                  <CFormInput
                    id="investment_amount"
                    placeholder="Investment Amount"
                    type="number"
                    value={data.investment_amount}
                    onChange={(e) => setData({ ...data, investment_amount: e.target.value })}
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
            <CCardHeader>Organic Website Traffic</CCardHeader>
            <CCardBody>
              <CForm className="row gx-3 gy-2 align-items-center">
                <CCol sm={12}>
                  <small>
                    <b>Brand Awareness Budget</b>
                  </small>
                </CCol>
                <CCol sm={6}>
                  <CFormLabel htmlFor="brand_awareness_budget_starting_budget">
                    Starting Budget
                  </CFormLabel>
                  <CFormInput
                    id="brand_awareness_budget_starting_budget"
                    placeholder="Starting Budget"
                    type="number"
                    value={data.brand_awareness_budget.starting_budget}
                    onChange={(e) =>
                      setData({
                        ...data,
                        brand_awareness_budget: {
                          ...data.brand_awareness_budget,
                          starting_budget: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="brand_awareness_budget_monthly_marketing_budget_increase">
                    Monthly Marketing Budget Increase
                  </CFormLabel>
                  <CFormInput
                    id="brand_awareness_budget_monthly_marketing_budget_increase"
                    placeholder="Monthly Marketing Budget Increase"
                    type="number"
                    value={data.brand_awareness_budget.monthly_marketing_budget_increase}
                    onChange={(e) =>
                      setData({
                        ...data,
                        brand_awareness_budget: {
                          ...data.brand_awareness_budget,
                          monthly_marketing_budget_increase: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="brand_awareness_budget_maximum_marketing_budget">
                    Maximum Marketing Budget
                  </CFormLabel>
                  <CFormInput
                    id="brand_awareness_budget_maximum_marketing_budget"
                    placeholder="Maximum Marketing Budget"
                    type="number"
                    value={data.brand_awareness_budget.maximum_marketing_budget}
                    onChange={(e) =>
                      setData({
                        ...data,
                        brand_awareness_budget: {
                          ...data.brand_awareness_budget,
                          maximum_marketing_budget: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Website Traffic</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="website_traffic_start_date">
                    Organic Traffic Efforts Kick-Off
                  </CFormLabel>
                  <CFormInput
                    id="website_traffic_start_date"
                    placeholder="Organic Traffic Efforts Kick-Off"
                    type="date"
                    value={data.website_traffic.start_date}
                    onChange={(e) =>
                      setData({
                        ...data,
                        website_traffic: {
                          ...data.website_traffic,
                          start_date: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="website_traffic_traffic_at_launch">
                    Website Traffic at launch
                  </CFormLabel>
                  <CFormInput
                    id="website_traffic_traffic_at_launch"
                    placeholder="Website Traffic at launch"
                    type="number"
                    value={data.website_traffic.traffic_at_launch}
                    onChange={(e) =>
                      setData({
                        ...data,
                        website_traffic: {
                          ...data.website_traffic,
                          traffic_at_launch: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="website_traffic_monthly_increase">
                    Monthly Traffic Increase
                  </CFormLabel>
                  <CFormInput
                    id="website_traffic_monthly_increase"
                    placeholder="Monthly Traffic Increase"
                    type="number"
                    value={data.website_traffic.monthly_increase}
                    onChange={(e) =>
                      setData({
                        ...data,
                        website_traffic: {
                          ...data.website_traffic,
                          monthly_increase: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="website_traffic_maximum_traffic">
                    Maximum Possible Organic Website Traffic
                  </CFormLabel>
                  <CFormInput
                    id="website_traffic_maximum_traffic"
                    placeholder="Maximum Possible Organic Website Traffic"
                    type="number"
                    value={data.website_traffic.maximum_traffic}
                    onChange={(e) =>
                      setData({
                        ...data,
                        website_traffic: {
                          ...data.website_traffic,
                          maximum_traffic: e.target.value,
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
            <CCardHeader>
              <CRow>
                <CCol sm={6}>Self-Service Subscriptions</CCol>
                <CCol sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CFormSwitch
                    id="self_service_subscriptions"
                    checked={data.self_service_subscriptions}
                    onChange={(e) =>
                      setData({ ...data, self_service_subscriptions: e.target.checked })
                    }
                  />
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm className="row gx-3 gy-2 align-items-center">
                <CCol sm={12}>
                  <small>
                    <b>Business Model</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_business_model_launch_date">
                    Expected Launch
                  </CFormLabel>
                  <CFormInput
                    id="self_service_business_model_launch_date"
                    placeholder="Expected Launch"
                    type="date"
                    value={data.self_service_business_model?.launch_date}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_business_model: {
                          ...data.self_service_business_model,
                          launch_date: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_business_model_ARPU">ARPU</CFormLabel>
                  <CFormInput
                    id="self_service_business_model_ARPU"
                    placeholder="ARPU"
                    type="number"
                    value={data.self_service_business_model?.ARPU}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_business_model: {
                          ...data.self_service_business_model,
                          ARPU: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_business_model_billing_term">
                    How will you primarily bill your customers
                  </CFormLabel>
                  <CFormSelect
                    id="self_service_business_model_billing_term"
                    value={data.self_service_business_model.billing_term}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_business_model: {
                          ...data.self_service_business_model,
                          billing_term: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Billing Term
                    </option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annually">Annually</option>
                    <option value="Never">Never</option>
                  </CFormSelect>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_business_model_churn_rate">
                    Expected Monthly Churn Rate
                  </CFormLabel>
                  <CFormInput
                    id="self_service_business_model_churn_rate"
                    placeholder="Expected Monthly Churn Rate"
                    type="number"
                    value={data.self_service_business_model?.churn_rate}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_business_model: {
                          ...data.self_service_business_model,
                          churn_rate: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_business_model_lifetime_value">
                    Expected Lifetime Value
                  </CFormLabel>
                  <CFormInput
                    id="self_service_business_model_lifetime_value"
                    placeholder="Expected Lifetime Value"
                    type="number"
                    value={data.self_service_business_model?.lifetime_value}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_business_model: {
                          ...data.self_service_business_model,
                          lifetime_value: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Organic Traffic</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_conversion_to_paid">
                    Organic Traffic Conversion to Paid
                  </CFormLabel>
                  <CFormInput
                    id="self_service_conversion_to_paid"
                    placeholder="Organic Traffic Conversion to Paid"
                    type="number"
                    value={data.self_service_conversion_to_paid}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_conversion_to_paid: e.target.value,
                      })
                    }
                  />
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Paid Traffic</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_paid_traffic_starting_marketing_budget">
                    Starting Marketing Budget
                  </CFormLabel>
                  <CFormInput
                    id="self_service_paid_traffic_starting_marketing_budget"
                    placeholder="Starting Marketing Budget"
                    type="number"
                    value={data.self_service_paid_traffic?.starting_marketing_budget}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_paid_traffic: {
                          ...data.paid_traffic,
                          starting_marketing_budget: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_paid_traffic_marketing_budget_increase">
                    Monthly Marketing Budget Increase
                  </CFormLabel>
                  <CFormInput
                    id="self_service_paid_traffic_marketing_budget_increase"
                    placeholder="Monthly Marketing Budget Increase"
                    type="number"
                    value={data.self_service_paid_traffic?.marketing_budget_increase}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_paid_traffic: {
                          ...data.self_service_paid_traffic,
                          marketing_budget_increase: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_paid_traffic_maximum_paid_ads_budget">
                    Maximum Paid Ads Marketing Budget
                  </CFormLabel>
                  <CFormInput
                    id="self_service_paid_traffic_maximum_paid_ads_budget"
                    placeholder="Maximum Paid Ads Marketing Budget"
                    type="number"
                    value={data.self_service_paid_traffic?.maximum_paid_ads_budget}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_paid_traffic: {
                          ...data.self_service_paid_traffic,
                          maximum_paid_ads_budget: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_paid_traffic_expected_CAC">
                    Expected CAC, First Month
                  </CFormLabel>
                  <CFormInput
                    id="self_service_paid_traffic_expected_CAC"
                    placeholder="Expected CAC, First Month"
                    type="number"
                    value={data.self_service_paid_traffic?.expected_CAC}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_paid_traffic: {
                          ...data.self_service_paid_traffic,
                          expected_CAC: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_paid_traffic_monthly_CAC_change">
                    Monthly CAC change
                  </CFormLabel>
                  <CFormInput
                    id="self_service_paid_traffic_monthly_CAC_change"
                    placeholder="Monthly CAC change"
                    type="number"
                    value={data.self_service_paid_traffic?.monthly_CAC_change}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_paid_traffic: {
                          ...data.self_service_paid_traffic,
                          monthly_CAC_change: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="self_service_paid_traffic_minimum_CAC_possible">
                    Minimum CAC possible
                  </CFormLabel>
                  <CFormInput
                    id="self_service_paid_traffic_minimum_CAC_possible"
                    placeholder="Minimum CAC possible"
                    type="number"
                    value={data.self_service_paid_traffic?.minimum_CAC_possible}
                    onChange={(e) =>
                      setData({
                        ...data,
                        self_service_paid_traffic: {
                          ...data.self_service_paid_traffic,
                          minimum_CAC_possible: e.target.value,
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
            <CCardHeader>
              <CRow>
                <CCol sm={6}>Inbound Sales</CCol>
                <CCol sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CFormSwitch
                    id="inbound_sales"
                    checked={data.inbound_sales}
                    onChange={(e) => setData({ ...data, inbound_sales: e.target.checked })}
                  />
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm className="row gx-3 gy-2 align-items-center">
                <CCol sm={12}>
                  <small>
                    <b>Business Model</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_business_model_launch_date">
                    Expected Launch
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_business_model_launch_date"
                    placeholder="Expected Launch"
                    type="date"
                    value={data.inbound_sales_business_model?.launch_date}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_business_model: {
                          ...data.inbound_sales_business_model,
                          launch_date: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_business_model_ARPU">ARPU</CFormLabel>
                  <CFormInput
                    id="inbound_sales_business_model_ARPU"
                    placeholder="ARPU"
                    type="number"
                    value={data.inbound_sales_business_model?.ARPU}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_business_model: {
                          ...data.inbound_sales_business_model,
                          ARPU: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_business_model_billing_term">
                    How will you primarily bill your customers
                  </CFormLabel>
                  <CFormSelect
                    id="inbound_sales_business_model_billing_term"
                    value={data.inbound_sales_business_model.billing_term}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_business_model: {
                          ...data.inbound_sales_business_model,
                          billing_term: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Billing Term
                    </option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annually">Annually</option>
                    <option value="Never">Never</option>
                  </CFormSelect>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_business_model_churn_rate">
                    Expected Monthly Churn Rate
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_business_model_churn_rate"
                    placeholder="Expected Monthly Churn Rate"
                    type="number"
                    value={data.inbound_sales_business_model?.churn_rate}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_business_model: {
                          ...data.inbound_sales_business_model,
                          churn_rate: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_business_model_lifetime_value">
                    Expected Lifetime Value
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_business_model_lifetime_value"
                    placeholder="Expected Lifetime Value"
                    type="number"
                    value={data.inbound_sales_business_model?.lifetime_value}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_business_model: {
                          ...data.inbound_sales_business_model,
                          lifetime_value: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Organic Traffic</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_conversion_to_paid">
                    Organic Traffic Conversion to Paid
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_conversion_to_paid"
                    placeholder="Organic Traffic Conversion to Paid"
                    type="number"
                    value={data.inbound_sales_conversion_to_paid}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_conversion_to_paid: e.target.value,
                      })
                    }
                  />
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Paid Traffic</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_paid_traffic_starting_marketing_budget">
                    Starting Marketing Budget
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_paid_traffic_starting_marketing_budget"
                    placeholder="Starting Marketing Budget"
                    type="number"
                    value={data.inbound_sales_paid_traffic?.starting_marketing_budget}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_paid_traffic: {
                          ...data.paid_traffic,
                          starting_marketing_budget: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_paid_traffic_marketing_budget_increase">
                    Monthly Marketing Budget Increase
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_paid_traffic_marketing_budget_increase"
                    placeholder="Monthly Marketing Budget Increase"
                    type="number"
                    value={data.inbound_sales_paid_traffic?.marketing_budget_increase}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_paid_traffic: {
                          ...data.inbound_sales_paid_traffic,
                          marketing_budget_increase: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_paid_traffic_maximum_paid_ads_budget">
                    Maximum Paid Ads Marketing Budget
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_paid_traffic_maximum_paid_ads_budget"
                    placeholder="Maximum Paid Ads Marketing Budget"
                    type="number"
                    value={data.inbound_sales_paid_traffic?.maximum_paid_ads_budget}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_paid_traffic: {
                          ...data.inbound_sales_paid_traffic,
                          maximum_paid_ads_budget: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_paid_traffic_expected_CAC">
                    Expected CAC, First Month
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_paid_traffic_expected_CAC"
                    placeholder="Expected CAC, First Month"
                    type="number"
                    value={data.inbound_sales_paid_traffic?.expected_CAC}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_paid_traffic: {
                          ...data.inbound_sales_paid_traffic,
                          expected_CAC: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_paid_traffic_monthly_CAC_change">
                    Monthly CAC change
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_paid_traffic_monthly_CAC_change"
                    placeholder="Monthly CAC change"
                    type="number"
                    value={data.inbound_sales_paid_traffic?.monthly_CAC_change}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_paid_traffic: {
                          ...data.inbound_sales_paid_traffic,
                          monthly_CAC_change: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_paid_traffic_minimum_CAC_possible">
                    Minimum CAC possible
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_paid_traffic_minimum_CAC_possible"
                    placeholder="Minimum CAC possible"
                    type="number"
                    value={data.inbound_sales_paid_traffic?.minimum_CAC_possible}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_paid_traffic: {
                          ...data.inbound_sales_paid_traffic,
                          minimum_CAC_possible: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Agents & Lead Nurturing</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_agent_lead_nurturing_leads_per_agent">
                    Leads a single sales agent can handle per month
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_agent_lead_nurturing_leads_per_agent"
                    placeholder="Leads a single sales agent can handle per month"
                    type="number"
                    value={data.inbound_sales_agent_lead_nurturing?.leads_per_agent}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_agent_lead_nurturing: {
                          ...data.inbound_sales_agent_lead_nurturing,
                          leads_per_agent: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_agent_lead_nurturing_role">
                    Position in charge of lead handling and conversion
                  </CFormLabel>
                  <CFormSelect
                    id="inbound_sales_agent_lead_nurturing_role"
                    value={data.inbound_sales_agent_lead_nurturing?.role}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_agent_lead_nurturing: {
                          ...data.inbound_sales_agent_lead_nurturing,
                          role: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="" disabled>
                      Select a Role
                    </option>
                    {data.team
                      .filter(({ category }) => category === 'Growth')
                      .map(({ role }, i) => (
                        <option value={role} key={i}>
                          {role}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Conversions</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="inbound_sales_lead_sale_conversion">
                    Lead to sale conversion rate
                  </CFormLabel>
                  <CFormInput
                    id="inbound_sales_lead_sale_conversion"
                    placeholder="Lead to sale conversion rate"
                    type="number"
                    value={data.inbound_sales_lead_sale_conversion}
                    onChange={(e) =>
                      setData({
                        ...data,
                        inbound_sales_lead_sale_conversion: e.target.value,
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
            <CCardHeader>
              <CRow>
                <CCol sm={6}>Outbound Sales</CCol>
                <CCol sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CFormSwitch
                    id="outbound_sales"
                    checked={data.outbound_sales}
                    onChange={(e) => setData({ ...data, outbound_sales: e.target.checked })}
                  />
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm className="row gx-3 gy-2 align-items-center">
                <CCol sm={12}>
                  <small>
                    <b>Business Model</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="outbound_sales_business_model_launch_date">
                    Expected Launch
                  </CFormLabel>
                  <CFormInput
                    id="outbound_sales_business_model_launch_date"
                    placeholder="Expected Launch"
                    type="date"
                    value={data.outbound_sales_business_model?.launch_date}
                    onChange={(e) =>
                      setData({
                        ...data,
                        outbound_sales_business_model: {
                          ...data.outbound_sales_business_model,
                          launch_date: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="outbound_sales_business_model_ARPU">ARPU</CFormLabel>
                  <CFormInput
                    id="outbound_sales_business_model_ARPU"
                    placeholder="ARPU"
                    type="number"
                    value={data.outbound_sales_business_model?.ARPU}
                    onChange={(e) =>
                      setData({
                        ...data,
                        outbound_sales_business_model: {
                          ...data.outbound_sales_business_model,
                          ARPU: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="outbound_sales_business_model_billing_term">
                    How will you primarily bill your customers
                  </CFormLabel>
                  <CFormSelect
                    id="outbound_sales_business_model_billing_term"
                    value={data.outbound_sales_business_model.billing_term}
                    onChange={(e) =>
                      setData({
                        ...data,
                        outbound_sales_business_model: {
                          ...data.outbound_sales_business_model,
                          billing_term: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Billing Term
                    </option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annually">Annually</option>
                    <option value="Never">Never</option>
                  </CFormSelect>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="outbound_sales_business_model_churn_rate">
                    Expected Monthly Churn Rate
                  </CFormLabel>
                  <CFormInput
                    id="outbound_sales_business_model_churn_rate"
                    placeholder="Expected Monthly Churn Rate"
                    type="number"
                    value={data.outbound_sales_business_model?.churn_rate}
                    onChange={(e) =>
                      setData({
                        ...data,
                        outbound_sales_business_model: {
                          ...data.outbound_sales_business_model,
                          churn_rate: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="outbound_sales_business_model_lifetime_value">
                    Expected Lifetime Value
                  </CFormLabel>
                  <CFormInput
                    id="outbound_sales_business_model_lifetime_value"
                    placeholder="Expected Lifetime Value"
                    type="number"
                    value={data.outbound_sales_business_model?.lifetime_value}
                    onChange={(e) =>
                      setData({
                        ...data,
                        outbound_sales_business_model: {
                          ...data.outbound_sales_business_model,
                          lifetime_value: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Outbound Reachout</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="outbound_sales_reachout_role">Position in Charge</CFormLabel>
                  <CFormSelect
                    id="outbound_sales_reachout_role"
                    value={data.outbound_sales_reachout?.role}
                    onChange={(e) =>
                      setData({
                        ...data,
                        outbound_sales_reachout: {
                          ...data.outbound_sales_reachout,
                          role: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="" disabled>
                      Select a Role
                    </option>
                    {data.team
                      .filter(({ category }) => category === 'Growth')
                      .map(({ role }, i) => (
                        <option value={role} key={i}>
                          {role}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="outbound_sales_reachout_number_of_new_agents">
                    New agents added per month
                  </CFormLabel>
                  <CFormInput
                    id="outbound_sales_reachout_number_of_new_agents"
                    placeholder="New agents added per month"
                    type="number"
                    value={data.outbound_sales_reachout?.number_of_new_agents}
                    onChange={(e) =>
                      setData({
                        ...data,
                        outbound_sales_reachout: {
                          ...data.outbound_sales_reachout,
                          number_of_new_agents: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="outbound_sales_reachout_maximum_number_of_agents">
                    Maximum Agents for Outbound Sales
                  </CFormLabel>
                  <CFormInput
                    id="outbound_sales_reachout_maximum_number_of_agents"
                    placeholder="Maximum Agents for Outbound Sales"
                    type="number"
                    value={data.outbound_sales_reachout?.maximum_number_of_agents}
                    onChange={(e) =>
                      setData({
                        ...data,
                        outbound_sales_reachout: {
                          ...data.outbound_sales_reachout,
                          maximum_number_of_agents: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="outbound_sales_reachout_deals_closed_per_month">
                    Deals closed per agent per month
                  </CFormLabel>
                  <CFormInput
                    id="outbound_sales_reachout_deals_closed_per_month"
                    placeholder="Deals closed per agent per month"
                    type="number"
                    value={data.outbound_sales_reachout?.deals_closed_per_month}
                    onChange={(e) =>
                      setData({
                        ...data,
                        outbound_sales_reachout: {
                          ...data.outbound_sales_reachout,
                          deals_closed_per_month: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="outbound_sales_reachout_sales_cycle_time">
                    Sales cycle expected time
                  </CFormLabel>
                  <CFormSelect
                    id="outbound_sales_reachout_sales_cycle_time"
                    value={data.outbound_sales_reachout?.sales_cycle_time}
                    onChange={(e) =>
                      setData({
                        ...data,
                        outbound_sales_reachout: {
                          ...data.outbound_sales_reachout,
                          sales_cycle_time: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="" disabled>
                      Select No. of Months
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="6">6</option>
                  </CFormSelect>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>SG&A</CCardHeader>
            <CCardBody>
              <CForm className="row gx-3 gy-2 align-items-center">
                <CCol sm={6}>
                  <CFormLabel htmlFor="sga_office_per_desk_cost">
                    Office {'>'} Per Desk Cost
                  </CFormLabel>
                  <CFormInput
                    id="sga_office_per_desk_cost"
                    placeholder="Office > Per Desk Cost"
                    type="number"
                    value={data.sga?.office_per_desk_cost}
                    onChange={(e) =>
                      setData({
                        ...data,
                        sga: {
                          ...data.sga,
                          office_per_desk_cost: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={12}>
                  <small>
                    <b>Tech Support/Customer Success</b>
                  </small>
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="sga_tech_support_customers_per_agent">
                    Customers an agent can handle
                  </CFormLabel>
                  <CFormInput
                    id="sga_tech_support_customers_per_agent"
                    placeholder="Customers an agent can handle"
                    type="number"
                    value={data.sga?.tech_support_customers_per_agent}
                    onChange={(e) =>
                      setData({
                        ...data,
                        sga: {
                          ...data.sga,
                          tech_support_customers_per_agent: e.target.value,
                        },
                      })
                    }
                  />
                </CCol>

                <CCol sm={6}>
                  <CFormLabel htmlFor="sga_tech_support_role">
                    Position in charge of support/success
                  </CFormLabel>
                  <CFormSelect
                    id="sga_tech_support_role"
                    value={data.sga?.tech_support_role}
                    onChange={(e) =>
                      setData({
                        ...data,
                        sga: {
                          ...data.sga,
                          tech_support_role: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="" disabled>
                      Select a Role
                    </option>
                    {data.team
                      .filter(({ category }) => category === 'Growth')
                      .map(({ role }, i) => (
                        <option value={role} key={i}>
                          {role}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ProfileSalesStep
