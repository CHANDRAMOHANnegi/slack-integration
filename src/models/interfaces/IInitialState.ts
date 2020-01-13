import ILoginStateEnum from "../../constants/ILoginStateEnum";
import IUser from "./IUser";
import IWorkspace from "./IWorkspace";

interface IInitialState {
    loggedIn: ILoginStateEnum;
    currentUser: IUser | null;
    currentWorkspace: IWorkspace | null

}

export default IInitialState;
