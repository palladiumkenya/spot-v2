import { UPDATE_CODE } from '../actions/actions';

const initialState = {
	code: '', // Initialize code value as an empty string or with a default value
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CODE:
			return {
				...state,
				code: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
