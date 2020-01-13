import { Component } from 'react';
import { Dispatch } from 'redux';
import IReduxAction from '../IReduxAction';
import ReduxActionType from '../ReduxActionType';
import ILoginStateEnum from '../../constants/ILoginStateEnum';
import UserServices from '../../services/UserService';
import ServiceResponse from '../../services/ServiceResponse';
import { toast as Toast } from 'react-toastify';

class UserAction extends Component {

  public static loginAction({ email = '', password = '' }) {
    return async (dispatch: Dispatch<IReduxAction>) => {
      const serviceResponse: ServiceResponse<any> = await UserServices.login(email, password);
      if (serviceResponse.success) {
        dispatch({
          type: ReduxActionType.LOGIN_ACTION,
          params: {
            loggedIn: ILoginStateEnum.LOGGEDIN_SUCCESS,
            currentUser: localStorage.getItem('jwt'),
          },
        });
        Toast.success('login successful');
      } else {
        dispatch({
          type: ReduxActionType.LOGIN_ACTION,
          params: { loggedIn: ILoginStateEnum.LOGIN_FAILED },
        });
        Toast.error('login failed');
      }
    };
  }

  static logoutAction = () => async (dispatch: Dispatch<IReduxAction>) => {
    dispatch({
      type: ReduxActionType.LOGOUT_ACTION,
      params: { currentUser: null, loggedIn: ILoginStateEnum.LOGIN_NOTATTEMPTED },
    });
  };

  public static currentWorkspace = ({ createdAt = '', id = '', name = '', status = '', UpdatedAt = '' }) =>
    async (dispatch: Dispatch<IReduxAction>) => {
      dispatch({
        type: ReduxActionType.CURRENTWORKSPACE,
        params: {
          currentWorkspace: { createdAt, id, name, status, UpdatedAt },
        },
      });
    };
}


export default UserAction;
