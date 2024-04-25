import { Outlet } from 'react-router-dom'
import './Default.scss'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const Default = () => {
  return (
    <>
      <main className="mainContainer">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  )
}

export default Default
