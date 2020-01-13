import ILoginStateEnum from '../../constants/ILoginStateEnum';
import IInitialState from '../../models/interfaces/IInitialState';


const InitialState: IInitialState = {
  currentUser: null,
  loggedIn: !!localStorage.getItem('jwt') ? ILoginStateEnum.LOGGEDIN_SUCCESS : ILoginStateEnum.LOGIN_NOTATTEMPTED,
  currentWorkspace: null,
};

export default InitialState;
