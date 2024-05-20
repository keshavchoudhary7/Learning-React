import React from 'react'
import { useParams } from 'react-router-dom'
function user() {
	const {userid} = useParams()
  return (
	<>
	<div className='bg-gray-700 py-3 pb-3 my-3 text-center text-white'>
	<h1>User: {userid} </h1>
	</div>
	</>
  )
}

export default user
