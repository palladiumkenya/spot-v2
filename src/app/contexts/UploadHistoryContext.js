import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Store } from '../redux/Store';

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOAD_HISTORY': {
			return {
				...state,
				history: action.payload,
			};
		}
	}
};

const UploadHistoryContext = createContext({
	history: [],
	getHistory: () => {},
});

export const UploadHistoryProvider = ({ settings, children }) => {
	const [state, dispatch] = useReducer(reducer, []);

	const getHistory = async (code) => {
		try {
			code = Store.getState().reducers.code ?? '';
			const res = await axios.get(`manifests/history/${code}`);
			dispatch({
				type: 'LOAD_HISTORY',
				payload: res.data.history,
			});
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getHistory();
	}, []);

	return (
		<UploadHistoryContext.Provider
			value={{
				history: state.history,
				getHistory,
			}}
		>
			{children}
		</UploadHistoryContext.Provider>
	);
};

export default UploadHistoryContext;
