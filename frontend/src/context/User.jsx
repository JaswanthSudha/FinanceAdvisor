import { useReducer, createContext, useEffect } from 'react';

export const UserAuthContext = createContext();
const reducerFn = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				user: null,
			};
	}
};
export const UserAuthContextProvider = ({ children }) => {
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));

		if (user !== null) {
			dispatch({ type: 'LOGIN', payload: user });
		} else {
			console.log('Null');
		}
	}, []);
	const [state, dispatch] = useReducer(reducerFn, {
		user: null,
	});
	return (
		<UserAuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</UserAuthContext.Provider>
	);
};
