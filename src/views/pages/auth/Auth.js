import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { appwrite } from 'src/functions/appwrite'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Auth = () => {
  const router = useRouter()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [rightPanel, setRightPanel] = useState(false)

  const signIn = async () => {
    const res = await appwrite.login(userData.email, userData.password)

    console.log(res)

    if (res) {
      router.push('/dashboard')
    } else {
      alert('Error')
    }
  }

  const signUp = async () => {
    if (
      !userData.email ||
      !userData.name ||
      userData.password.length < 5
      // userData.password !== userData.confirmPassword
    ) {
      console.log(userData)
      // console.log(
      //   !userData.email,
      //   !userData.name,
      //   userData.password.length < 5,
      //   userData.password !== userData.confirmPassword,
      // )
      return alert('Invalid Data')
    }

    const res = await appwrite.register(userData.email, userData.password, userData.name)

    console.log(res)

    if (res) {
      alert('Account created successfully!')
      router.push('/dashboard')
    } else {
      alert("An error occured, couldn't create account.")
    }
  }

  return (
    <>
      {/* <h2>Weekly Coding Challenge #1: Sign in/up Form</h2> */}
      <div className={styles.body}>
        <div
          className={`${styles.container} ${rightPanel ? styles.rightPanelActive : ''}}`}
          id="container"
        >
          <div
            className={`${styles.formContainer} ${styles.signUpContainer}`}
            style={rightPanel ? { transform: 'translateX(100%)', opacity: 1, zIndex: 5 } : null}
          >
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              <h1>Create Account</h1>
              {/* <div className={styles.socialContainer}>
                <a href="#" className={styles.social}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={styles.social}>
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className={styles.social}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span> */}
              <br />
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              {/* <input
                type="password"
                placeholder="Repeat Password"
                onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
              /> */}
              <br />
              <button onClick={() => signUp()}>Sign Up</button>
              <a className={styles.mobileToggle} onClick={() => setRightPanel(false)}>
                Sign In
              </a>
            </form>
          </div>
          <div
            className={`${styles.formContainer} ${styles.signInContainer}`}
            style={rightPanel ? { transform: 'translateX(100%)' } : null}
          >
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              <h1>Sign in</h1>
              {/* <div className={styles.socialContainer}>
                <a href="#" className={styles.social}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={styles.social}>
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className={styles.social}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span> */}
              <br />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              <a href="#">Forgot your password?</a>
              <button onClick={() => signIn()}>Sign In</button>
              <a className={styles.mobileToggle} onClick={() => setRightPanel(true)}>
                Sign Up
              </a>
            </form>
          </div>
          <div
            className={styles.overlayContainer}
            style={rightPanel ? { transform: 'translateX(-100%)' } : null}
          >
            <div
              className={styles.overlay}
              style={rightPanel ? { transform: 'translateX(50%)' } : null}
            >
              <div
                className={`${styles.overlayPanel} ${styles.overlayLeft}`}
                style={rightPanel ? { transform: 'translateX(0)' } : null}
              >
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className={styles.ghost} id="signIn" onClick={() => setRightPanel(false)}>
                  Sign In
                </button>
              </div>
              <div
                className={`${styles.overlayPanel} ${styles.overlayRight}`}
                style={rightPanel ? { transform: 'translateX(20%)' } : null}
              >
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className={styles.ghost} id="signUp" onClick={() => setRightPanel(true)}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={() => signIn()}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link href="/register" passHref>
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Auth
