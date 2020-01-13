import IReduxAction from '../IReduxAction';
import ReduxActionType from '../ReduxActionType';
import InitialState from '../state/InitialState';


const RootReducer = (state = InitialState, action: IReduxAction) => {

  switch (action.type) {
    case ReduxActionType.LOGIN_ACTION: {
      return {
        ...state,
        ...action.params,
      };
    }
    case ReduxActionType.LOGOUT_ACTION: {
      return {
        ...state,
        ...action.params,
      };
    }
    case ReduxActionType.CURRENTWORKSPACE: {
      return {
        ...state,
        ...action.params,
      };
    }
    default:
      return state;
  }
};


export default RootReducer;
