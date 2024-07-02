import React, { useContext, useState, useEffect } from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { AuthContext } from './loginComponents/AuthContext.jsx';


const navigation = [
  { name: 'Home', href: '/', current: window.location.pathname === '/' },
  { name: 'Facilities', href: '/facilities', current: window.location.pathname === '/facilities' },
  { name: 'Rooms', href: '/rooms', current: window.location.pathname === '/rooms' }
]

function classNames(...classes) {
  // If the array element is false, remove it from the array and join the rest
  return classes.filter(Boolean).join(' ')
}

function NavBar() {
  const {token, rol, logout, profileImage} = useContext(AuthContext);


  return (
    <Disclosure as="nav" className="bg-transparent absolute z-10 w-full">
        
      {({ open }) => (
        
        <>

          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

            <div className="relative flex h-20 sm:h-28 items-center justify-between">

                {/* Button to toggle disclosure info */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                    </Disclosure.Button>

              </div>

                
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">

              <div className="flex flex-shrink-0 items-center">
                <Link to="/">
                  <img
                    className="h-16 w-auto rounded-full"
                    src="../src/assets/logo/hazbin-logo.jpg"
                    alt="HAZBIN HOTEL"
                  />
                </Link>
              </div>
                {/* Hidden = Display: none.*/}
                {/* Always hidden, but if it's larger than sm, then display as block and visible */}

                <div className="hidden sm:ml-6 sm:block sm:my-auto">

                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}

                    {rol === 'admin' && (
                      <a
                        href="/dashboard"  // Make sure the link is correct
                        className={classNames(
                          'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        Dashboard
                      </a>
                    )}

                    {token !== null && (
                      <Link
                        to="/rooms/myreservations"
                        className={classNames(
                          'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        My Reservations
                      </Link>
                    )}
                  </div>

                </div>
                
              </div>


              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 ">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800  hover:brightness-75 transition-all duration-300 ease-in-out">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {profileImage ? (
                        <img
                          className="object-cover h-8 w-8 rounded-full"
                          src={`data:image/jpeg;base64,${profileImage}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="h-8 w-8 rounded-full"
                          src="src/assets/images/no_profile_image.png"
                          alt=""
                        />
                      )}
                      
                    </Menu.Button>
                  </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>


                      {token === null ? (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/login"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign in
                            </Link>
                          )}
                        </Menu.Item>



                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <>
                            <a
                              href="#"
                              onClick={logout}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </a>
                            <a
                              href="/MyAccount"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              My Account
                            </a>
                            </>
                          )}
                        </Menu.Item>
                      )}
                      
                    
                    </Menu.Items>
                  </Transition>
                </Menu>

              </div>
            </div>
          </div>



          {/* Hidden for small screens and above */}
          <Disclosure.Panel className="sm:hidden bg-secondary bg-opacity-70 rounded-lg"> 
            <div className="space-y-1 px-2 pb-3 pt-2">

              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white bg-opacity-60' : 'text-gray-300 hover:bg-gray-700 bg-opacity-60 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              {rol === 'admin' && (
                <Disclosure.Button
                  as="a"
                  href="/dashboard"
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  Dashboard
                </Disclosure.Button>
              )}

            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    
  )
}

export default NavBar;