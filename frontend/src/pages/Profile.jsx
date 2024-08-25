import React, { useEffect, useState } from 'react';
import useAuthContext from '../hooks/UseContext';
import profileImage from '../images/frontend.jpeg';
// import { url } from '../constants/url';
// import FileUploadButton from '../components/FileUploadButton';
import { url } from '../constants/url';
// import upload from '../../../backend/middleware/multer2';

const Profile = () => {
	const { dispatch, user } = useAuthContext();
	const username = user?.email.replace('@gmail.com', '');
	const uploadImage = async (e) => {
		e.preventDefault();
		if (!e.target.files[0]) {
			console.log('No File Uploaded');
			return;
		}
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('profile', file);
		const response = await fetch(`${url}/api/v1/message/profileImage`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
			},
			body: formData,
		});
		const json = await response.json();
		dispatch({ type: 'PROFILEIMAGE', payload: json.url });
		const person = JSON.parse(localStorage.getItem('user'));
		person.image = json.url;
		localStorage.setItem('user', JSON.stringify(person));
	};

	// console.log(email.replace('@gmail.com', ''));
	return (
		<div className='px-24'>
			<div className='flex justify-center flex-col items-center m-4'>
				<img
					className='rounded-md h-[200px] w-[200px]'
					src={user?.image}
					alt={profileImage}
				/>

				<div
					// onClick={uploadImage}
					className='text-center bg-red-500 px-4 py-2 m-2 rounded-sm text-white hover:bg-red-200'>
					<label for='upload'>Upload</label>
					<input
						type='file'
						class='hidden'
						id='upload'
						onChange={uploadImage}
					/>
				</div>
			</div>
			<div className='flex flex-col justify-start items-center  w-3/4'>
				<div className='grid grid-cols-2 w-2/4'>
					<h1 className='text-2xl font-serif m-2'>UserName:</h1>
					<input
						type='text'
						placeholder='username'
						value={username}
						className='border-b-2 decoration-3 text-lg '
					/>
				</div>
				<div className='grid grid-cols-2 w-2/4'>
					<h1 className='text-2xl font-serif m-2'>Email:</h1>
					<input
						className='border-b-2 '
						type='email'
						placeholder='email'
						value={user?.email}
					/>
				</div>
				<div className='grid grid-cols-2  w-2/4 '>
					<h1 className='text-2xl font-serif m-2'>Contact:</h1>
					<input
						className='border-b-2'
						style={{
							textDecoration: 'none',
						}}
						type='text'
						placeholder='number'
						value={user?._id}
					/>
				</div>
			</div>
		</div>
	);
};

export default Profile;
