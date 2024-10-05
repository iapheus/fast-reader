import React from 'react'

function NotFound() {
  return (
    <div className='text-5xl text-center mt-56 space-y-5'>
      <p className='font-semibold'>404</p>
      <p className='font-medium'>Page Not Found</p>
      <button 
        className='bg-slate-600 text-white p-5 rounded-xl'
        onClick={() => {window.location.href = '/'}}
      >Back to Homepage</button>
    </div>
  )
}

export default NotFound