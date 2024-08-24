import { useContext } from 'react';
import { UserAuthContext } from '../context/User';
const useAuthContext = () => {
	const context = useContext(UserAuthContext);
	if (!context) {
		console.log('You should not use AuthContext');
		return;
	}
	return context;
};
export default useAuthContext;
