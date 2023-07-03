import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOAD_PROFILES': {
			return {
				...state,
				profiles: action.payload,
			};
		}
		case 'CLEAR_PROFILES': {
			return {
				...state,
				notifications: action.payload,
			};
		}
		default: {
			return { ...state };
		}
	}
};

const ProfileContext = createContext({
	profiles: [],
	getProfiles: () => {}
});

export const ProfileProvider = ({ settings, children }) => {
	const [state, dispatch] = useReducer(reducer, []);

	const getProfiles = async () => {
		try {
			const res = await axios.get('profiles/');
			dispatch({
				type: 'LOAD_PROFILES',
				payload: res.data.profiles,
			});
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getProfiles();
	}, []);

	return (
		<ProfileContext.Provider
			value={{
				profiles: state.profiles,
				getProfiles,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export default ProfileContext;
