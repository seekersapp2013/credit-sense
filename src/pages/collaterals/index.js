import { CButton, CCard, CCardBody, CCol, CRow, CTable } from '@coreui/react'
import Link from 'next/link'
import { useState } from 'react'

const Collaterals = () => {
  const [data, setData] = useState(null)

  const columns = [
    { key: 'class', _props: { scope: 'col' } },
    { key: 'heading_1', label: 'Heading', _props: { scope: 'col' } },
    { key: 'heading_2', label: 'Heading', _props: { scope: 'col' } },
  ]

  const items = [
    {
      class: 'Default',
      heading_1: 'Cell',
      heading_2: 'Cell',
      _cellProps: { class: { scope: 'row' } },
    },
    {
      class: 'Primary',
      heading_1: 'Cell',
      heading_2: 'Cell',
      _cellProps: { class: { scope: 'row' } },
      _props: { color: 'primary' },
    },
    {
      class: 'Secondary',
      heading_1: 'Cell',
      heading_2: 'Cell',
      _cellProps: { class: { scope: 'row' } },
      _props: { color: 'secondary' },
    },
    {
      class: 'Success',
      heading_1: 'Cell',
      heading_2: 'Cell',
      _cellProps: { class: { scope: 'row' } },
      _props: { color: 'success' },
    },
    {
      class: 'Danger',
      heading_1: 'Cell',
      heading_2: 'Cell',
      _cellProps: { class: { scope: 'row' } },
      _props: { color: 'danger' },
    },
    {
      class: 'Warning',
      heading_1: 'Cell',
      heading_2: 'Cell',
      _cellProps: { class: { scope: 'row' } },
      _props: { color: 'warning' },
    },
    {
      class: 'Info',
      heading_1: 'Cell',
      heading_2: 'Cell',
      _cellProps: { class: { scope: 'row' } },
      _props: { color: 'info' },
    },
    {
      class: 'Light',
      heading_1: 'Cell',
      heading_2: 'Cell',
      _cellProps: { class: { scope: 'row' } },
      _props: { color: 'light', onClick: () => alert('Cell') },
    },
    {
      class: 'Dark',
      heading_1: 'Cell',
      heading_2: 'Cell',
      _cellProps: { class: { scope: 'row' } },
      _props: { color: 'dark' },
    },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol xs={12} className="text-right">
              <Link href="/collaterals/create">
                <CButton>Create</CButton>
              </Link>
            </CCol>
            <CCol xs={12}>
              <CTable hover columns={columns} items={[]} />
              {!data ? <p className="text-center">No Collaterals</p> : ''}
            </CCol>
            <CCol xs={12} className="text-right">
              <Link href="/collaterals/create">
                <CButton>Create</CButton>
              </Link>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Collaterals
