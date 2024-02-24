import React from 'react'

export default function Inventory() {
  return (
    <div className="w-svw py-6">
      <div className="p-0.5 w-1/3 ml-auto mr-5 relative bg-gradient-to-br from-green-400 to-blue-600 rounded-3xl">
        <div class="absolute inset-y-0 left-2.5 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span class="sr-only">Search icon</span>
        </div>
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2 ps-12 text-m outline-none text-gray-900 group-hover:bg-opacity-0 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
          placeholder="Search anything... (Enter to search)"
        />
      </div>
    </div>
  )
}
