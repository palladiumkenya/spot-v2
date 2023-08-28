import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Store } from '../redux/Store';

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOAD_FACILITY_METRICS_INFO': {
			return {
				...state,
				metrics: action.payload,
			};
		}
	}
};

const FacilityMetricsContext = createContext({
	metrics: [],
	getFacility: () => {},
});

export const FacilityMetricsProvider = ({ settings, children }) => {
	const [state, dispatch] = useReducer(reducer, []);

	const getFacilityMetrics = async () => {
		try {
			let code = Store.getState().reducers.code ?? '';
			const res = await axios.get(`metrics/${code}`);
			dispatch({
				type: 'LOAD_FACILITY_METRICS_INFO',
				payload: res.data.metrics,
			});
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getFacilityMetrics();
	}, []);

	return (
		<FacilityMetricsContext.Provider
			value={{
				metrics: state.metrics,
				getFacilityMetrics,
			}}
		>
			{children}
		</FacilityMetricsContext.Provider>
	);
};

export default FacilityMetricsContext;
