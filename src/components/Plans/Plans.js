import React from 'react'
import PropTypes from 'prop-types'
import {
  CRow,
  CCol,
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CListGroup,
  CListGroupItem,
  CCardLink,
  CCardSubtitle,
  CButton,
} from '@coreui/react'
import planProfiles from './planProfiles'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilXCircle } from '@coreui/icons'

const Plans = ({ action, current }) => {
  return (
    <>
      <CRow className="mb-4">
        {planProfiles.map(({ name, description, color, features }, i) => {
          const featureGroups = Object.keys(features)
          return (
            <CCol key={i} sm={6} md={6} xl={3}>
              <CCard color={color} className="mb-4 text-white">
                {/* <CCardImage orientation="top" src="/images/react.jpg" /> */}
                <CCardBody>
                  <CCardTitle>{name}</CCardTitle>
                  <CCardText>{description}</CCardText>
                </CCardBody>
                {featureGroups.map((groupName, i) => {
                  return (
                    <div key={i}>
                      <CCardSubtitle className="p-3 mt-2 text-white">{groupName}</CCardSubtitle>
                      <CListGroup flush>
                        {Object.entries(features[groupName]).map(([key, value], i) => (
                          <CListGroupItem key={i} color={color}>
                            <CRow>
                              <CCol sm={8}>{key}</CCol>
                              <CCol sm={4} style={{ textAlign: 'right' }}>
                                <CIcon
                                  className={value ? 'text-success' : 'text-danger'}
                                  icon={value ? cilCheckCircle : cilXCircle}
                                />
                              </CCol>
                            </CRow>
                          </CListGroupItem>
                        ))}
                      </CListGroup>
                    </div>
                  )
                })}
                <CCardBody className="text-center">
                  <CButton
                    color="light"
                    onClick={() => action({ index: i, name, description, features })}
                    disabled={current === i ? true : false}
                  >
                    Get Started
                  </CButton>
                </CCardBody>
              </CCard>
            </CCol>
          )
        })}
      </CRow>
    </>
  )
}

Plans.propTypes = {
  action: PropTypes.func,
  current: PropTypes.number,
}

export default Plans
