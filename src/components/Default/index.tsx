import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import './Default.scss'

const Default = () => {
  return (
    <>
      <main className="mainContainer">
        <Header />
        <div className="mainContainer__content">
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Default
