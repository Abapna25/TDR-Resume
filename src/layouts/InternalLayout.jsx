import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import InternalNav from '../components/InternalNav'

export default function InternalLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <a href="#internal-main" className="skip-link">
        Skip to main content
      </a>
      <InternalNav />
      <main id="internal-main" tabIndex={-1}>
        <Outlet />
      </main>
    </>
  )
}