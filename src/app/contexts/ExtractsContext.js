import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Store } from '../redux/Store';

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOAD_EXTRACTS': {
			return {
				...state,
				manifests: action.payload,
			};
		}
	}
};

const ExtractContext = createContext({
	manifests: [],
	getManifests: () => {},
});

export const ManifestProvider = ({ settings, children }) => {
	const [state, dispatch] = useReducer(reducer, []);

	const getManifests = async (code) => {
		try {
			code = Store.getState().reducers.code ?? '';
			const res = await axios.get(`manifests/${code}`);
			dispatch({
				type: 'LOAD_EXTRACTS',
				payload: res.data.manifests,
			});
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getManifests();
	}, []);

	return (
		<ExtractContext.Provider
			value={{
				manifests: state.manifests,
				getManifests,
			}}
		>
			{children}
		</ExtractContext.Provider>
	);
};

export default ExtractContext;
