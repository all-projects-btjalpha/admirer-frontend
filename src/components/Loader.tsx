import React from 'react'

const LoaderCode = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7b48a5] mb-4"></div>
      <p className="text-lg font-bold text-gray-800">
        Loading your experience, please wait...
      </p>
    </div>
  </div>
  )
}

export default LoaderCode;