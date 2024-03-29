import React from 'react'

export default function DataWrapper(props) {
  return (
    <tr className="hover:bg-gray-500 dark:hover:bg-teal-900 border-t border-t-teal-700">
      {Object.entries(props.record).map(([key, value]) => {
        return (<td key={key} className="px-6 py-4 text-m dark:text-white">{value}</td>)
      })}
    </tr>
  )
}
