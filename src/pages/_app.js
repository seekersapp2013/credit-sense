import '../scss/style.scss'
import { Provider } from 'react-redux'
import store from 'src/store'
import DefaultLayout from 'src/layout/DefaultLayout'
import routes from 'src/routes'
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import AccountContext from 'src/components/AccountContext'
import { appwrite, objectifySubStrings } from 'src/functions/appwrite'
import planProfiles from 'src/components/Plans/planProfiles'
import Loader from 'src/components/Loader'
import Layout from 'src/layout/Layout'

const initialState = {
  isAuthenticated: false,
  account: null,
  plan: null,
  loading: true,
  accessToken: null,
  profile: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_loading':
      return { ...state, loading: action.data }
    case 'set_account':
      return { ...state, account: action.data }
    case 'set_plan':
      return { ...state, isAuthenticated: true, plan: action.data }
    case 'set_profile':
      return { ...state, loading: false, profile: action.data }
    case 'set_token':
      return { ...state, accessToken: action.data }
    case 'logout':
      return {
        isAuthenticated: false,
        account: null,
        plan: null,
        loading: false,
        accessToken: null,
      }
    default:
      throw new Error()
  }
}

function MyApp({ Component, pageProps }) {
  // console.log(
  //   routes.filter(({ path }) => (path === '/' ? true : path.startsWith(useRouter().asPath))),
  // )
  const [state, dispatch] = useReducer(reducer, initialState)

  const setLoading = (data) => dispatch({ type: 'set_loading', data })
  const setAccount = (data) => dispatch({ type: 'set_account', data })
  const setPlan = (data) => dispatch({ type: 'set_plan', data })
  const setProfile = (data) => dispatch({ type: 'set_profile', data })
  const setToken = (data) => dispatch({ type: 'set_token', data })
  const logout = () => dispatch({ type: 'logout' })
  const router = useRouter()

  const getProps = () => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      setToken(jwt)

      appwrite
        .getAccount()
        .then((res) => {
          console.log('Account: ', res)
          setAccount(res)
        })
        .catch((error) => {
          console.log('Acount Fetch Error: ', error.code)
          if (error.code === 401 && Component.noAuth !== true) {
            logout()
          }
        })

      appwrite
        .fetchPlan()
        .then((res) => {
          console.log('Plan: ', res)
          setPlan(res)
        })
        .catch((error) => {
          console.log(error.code)
        })

      appwrite
        .fetchUser()
        .then((res) => {
          console.log('Profile: ', res)
          setProfile(objectifySubStrings(res))
        })
        .catch((error) => {
          console.log(error.code)
          setProfile(null)
        })
    } else {
      logout()
    }
  }

  useEffect(getProps, [])

  if (state.loading) {
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
        <Loader />
      </div>
    )
  }

  // return JSON.stringify(state.plan)

  return (
    <AccountContext.Provider
      value={{
        ...state,
        setLoading,
        setAccount,
        setPlan,
        setProfile,
        getProps,
        logout,
      }}
    >
      <Provider store={store}>
        <Layout
          auth={!Component.noAuth}
          isAuthenticated={state.isAuthenticated}
          // loading={state.loading}
          layout={Component.noLayout ? false : true}
          needProfile={Component.profile}
          profile={state.profile}
        >
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AccountContext.Provider>
  )

  // const [account, setAccount] = useState(null)
  // const [plan, setPlan] = useState(null)
  // const [loading, setLoading] = useState(true)

  // const getAccountInfo = async () => {
  //   try {
  //     const data = await appwrite.getAccount()
  //     setAccount(data)
  //     console.log('Account: ', data)

  //     try {
  //       const plan = await appwrite.fetchPlan()
  //       setPlan(objectifySubStrings(plan))
  //       console.log('Plan: ', objectifySubStrings(plan))

  //       // if (plan.index === 0) {
  //       //   if (Date.now() - plan.subscription_date > planProfiles[0].duration * 24 * 60 * 60 * 1000) {
  //       //     return router.push('/select-a-plan')
  //       //   }
  //       // }

  //       if (
  //         plan.index === 0 &&
  //         Date.now() - plan.subscription_date > planProfiles[0].duration * 24 * 60 * 60 * 1000
  //       ) {
  //         return router.push('/select-a-plan')
  //       } else if (
  //         Date.now() - plan.subscription_date >
  //         planProfiles[plan.index].duration * 24 * 60 * 60 * 1000
  //       ) {
  //         const debit = await debitWallet('USD', planProfiles[plan.index].price.USD)
  //         if (debit !== true) {
  //           try {
  //             const res = await appwrite.updatePlan(
  //               stringifySubObjects({ ...plan, status: 'OWING' }),
  //             )

  //             console.log('New Plan: ', res)
  //           } catch (error) {
  //             console.log(error)
  //           }

  //           alert(debit)
  //         }
  //       }
  //     } catch (error) {
  //       return router.push('/select-a-plan')
  //     } finally {
  //       setLoading(false)
  //     }
  //   } catch (error) {
  //     return router.push('/auth')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   getAccountInfo()
  // }, [])

  // if (!Component.noAuth && state.loading) {
  //   return (
  //     <>
  //       <div
  //         style={{
  //           width: '100vw',
  //           height: '100vh',
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}
  //       >
  //         Loading...
  //       </div>
  //     </>
  //   )
  // }

  //   return (
  //     <AccountContext.Provider
  //       value={{
  //         ...state,
  //         setLoading,
  //         setAccount,
  //         setPlan,
  //       }}
  //     >
  //       <Provider store={store}>
  //         <Layout
  //           auth={!Component.noAuth}
  //           isAuthenticated={state.isAuthenticated}
  //           loading={state.loading}
  //           layout={!Component.noLayout}
  //         >
  //           <Component {...pageProps} />
  //         </Layout>
  //       </Provider>
  //     </AccountContext.Provider>
  //   )
}

// const Layout = ({
//   auth = true,
//   isAuthenticated = false,
//   layout = true,
//   loading = true,
//   children,
// }) => {
//   const router = useRouter()

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
//   return layout ? <DefaultLayout>{children}</DefaultLayout> : children
// }

export default MyApp
