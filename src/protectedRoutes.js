import React from 'react';
import UserProfile from './components/Userprofile/UserProfile';

const protectedRoutes = [
	{
		name: 'user',
		exact: true,
		path: '/user',
		main: props => <UserProfile {...props} />,
		public: false,
	},
];

export default protectedRoutes;