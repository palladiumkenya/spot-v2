import { combineReducers } from 'redux';
import NotificationReducer from './NotificationReducer';
import reducer from './reducer';

const RootReducer = combineReducers({
	notifications: NotificationReducer,
	reducers: reducer,
});

export default RootReducer;
