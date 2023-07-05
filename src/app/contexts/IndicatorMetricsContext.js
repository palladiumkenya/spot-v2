import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Store } from '../redux/Store';

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOAD_INDICATOR_METRICS': {
			return {
				...state,
				metrics: action.payload,
			};
		}
	}
};

const IndicatorMetricsContext = createContext({
	metrics: {},
	getIndicatorMetrics: () => {},
});

export const IndicatorMetricsProvider = ({ settings, children }) => {
	const [state, dispatch] = useReducer(reducer, []);

	const getIndicatorMetrics = async (code) => {
		try {
			code = Store.getState().reducers.code ?? '';
			const res = await axios.get(`indicators/${code}`);
			dispatch({
				type: 'LOAD_INDICATOR_METRICS',
				payload: res.data.indicators,
			});
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getIndicatorMetrics();
	}, []);

	return (
		<IndicatorMetricsContext.Provider
			value={{
				metrics: state.metrics,
				getIndicatorMetrics,
			}}
		>
			{children}
		</IndicatorMetricsContext.Provider>
	);
};

export default IndicatorMetricsContext;
