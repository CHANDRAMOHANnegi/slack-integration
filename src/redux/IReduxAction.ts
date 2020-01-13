import ReduxActionType from './ReduxActionType';

interface IReduxAction {
  type: ReduxActionType;
  params: any;
}

export default IReduxAction;
