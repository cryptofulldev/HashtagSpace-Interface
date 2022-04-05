import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Footer } from './components/Footer'
import Loader from './components/Loader'
import { ToastWrapper } from './styles/components'
import GlobalStyles from './styles/globalStyles'
// import UserRouting from './views/UserRouting'

const Header = lazy(() => import('./components/Header/HeaderMain'))
const Home = lazy(() => import('./views/Home'))
const SignIn = lazy(() => import('./views/Login/SignIn'))
const SignUp = lazy(() => import('./views/Login/SignUp'))
const UserRouting = lazy(() => import('./views/UserRouting'))

const AnimatedSwitch = withRouter(() => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <Route path={['/prospect', '/domains']} component={UserRouting} />
  </Switch>
))

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <ToastWrapper
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'colored'}
      />
      <Suspense fallback={<Loader />}>
        <Header />
        <AnimatedSwitch />
        <Footer />
      </Suspense>
    </>
  )
}

export default App
