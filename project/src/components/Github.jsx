import React, { useEffect, useState } from 'react'

function Github() {
	const [data,setData] = useState([])
	useEffect(()=>{
		fetch('https://api.github.com/users/keshavchoudhary7')
		.then(response => response.json())
		.then(data => {
			setData(data)
		})
	},[])
  return (
	<>
	<div>
		<h1 className='text-center m-4 bg-gray-700 text-white p-4 text-3xl'>Github Followers: {data.followers} </h1>
	</div>
	</>
  )
}

export default Github
