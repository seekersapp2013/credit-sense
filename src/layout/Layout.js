import { useRouter } from 'next/router'
import DefaultLayout from './DefaultLayout'

const Layout = ({
  auth = true,
  isAuthenticated = false,
  layout = true,
  loading = true,
  children,
  needProfile = true,
  profile = false,
}) => {
  const router = useRouter()

  if (auth && !isAuthenticated) {
    router.push(`/auth?redirect=${router.asPath}`)
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Redirecting to the login page...
      </div>
    )
  }

  if (isAuthenticated && needProfile && !profile) {
    console.log("isAuthenticated", isAuthenticated)
    console.log("needProfile", needProfile)
    console.log("profile", profile)
    router.push('/profile')
    // window.location = '/profile'
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Redirecting to the profile page...
      </div>
    )
  }

  //   if (auth) {
  //     if (!isAuthenticated) {
  //       if (!loading) {
  //         router.replace(`/auth?redirect=${router.asPath}`)
  //       }
  //       return (
  //         <div
  //           style={{
  //             width: '100vw',
  //             height: '100vh',
  //             display: 'flex',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}
  //         >
  //           Loading...
  //         </div>
  //       )
  //     }
  //   }
  return layout ? <DefaultLayout>{children}</DefaultLayout> : children
}

export default Layout
