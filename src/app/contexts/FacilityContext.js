import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Store } from '../redux/Store';

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOAD_FACILITY_INFO': {
			return {
				...state,
				facility: action.payload,
			};
		}
	}
};

const FacilityContext = createContext({
	facility: {},
	getFacility: () => {},
});

export const FacilityProvider = ({ settings, children }) => {
	const [state, dispatch] = useReducer(reducer, []);

	const getFacility = async (code) => {
		try {
			code = Store.getState().reducers.code ?? '';
			const res = await axios.get(`facilities/${code}`);
			dispatch({
				type: 'LOAD_FACILITY_INFO',
				payload: res.data.facility,
			});
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getFacility();
	}, []);

	return (
		<FacilityContext.Provider
			value={{
				facility: state.facility,
				getFacility,
			}}
		>
			{children}
		</FacilityContext.Provider>
	);
};

export default FacilityContext;
