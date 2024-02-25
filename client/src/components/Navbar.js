import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import UserInfo from './UserInfo'
import SignIn from './SignIn'

export default function Navbar() {
  const location = useLocation()
  const [infoHidden, setInfoHidden] = useState('hidden')
  const [navHidden, setNavHidden] = useState('hidden')
  const infoToggler = () => {
    setNavHidden('hidden')
    if (infoHidden === '') setInfoHidden('hidden')
    else setInfoHidden('')
  }
  const navToggler = () => {
    setInfoHidden('hidden')
    if (navHidden === '') setNavHidden('hidden')
    else setNavHidden('')
  }

  let isSignedIn = true // Checks whether the user is signed in or not
  
  const activeLink = "block py-2 px-3 text-white bg-teal-700 rounded md:bg-transparent md:text-tea-700 md:p-0 md:dark:text-teal-300"
  const passiveLink = "block py-2 px-3 text-teal-950 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-tea-700 md:p-0 dark:text-white md:dark:hover:text-teal-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"

  return (
    <nav className="bg-white border-gray-200 dark:bg-teal-950">
      <div className="flex flex-wrap items-center justify-between mx-auto md:px-12 p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          /> 
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Invento
          </span>
        </Link>
        
        {/* { isSignedIn ? <UserInfo infoToggler={infoToggler} infoHidden={infoHidden} navToggler={navToggler} /> : <SignIn toggler={navToggler} /> } */}
        { isSignedIn && <UserInfo infoToggler={infoToggler} infoHidden={infoHidden} navToggler={navToggler} />}

        <div
          className={`items-center ${navHidden} justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-teal-950 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={ location.pathname === '/' ? activeLink : passiveLink }
                aria-current="page"
                >
                {isSignedIn ? 'Dashboard' : 'Home'}
              </Link>
            </li>
            {isSignedIn &&
            <li>
              <Link
                to='/inventory'
                className={ location.pathname === '/inventory' ? activeLink : passiveLink }
              >
                Inventory
              </Link>
            </li>}
            <li>
              <a
                href="/"
                className={ location.pathname === '/services' ? activeLink : passiveLink }
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/"
                className={ location.pathname === '/pricing' ? activeLink : passiveLink }
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/"
                className={ location.pathname === '/contact' ? activeLink : passiveLink }
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}
