import ServiceResponse from './ServiceResponse';
import { AxiosRequestConfig } from 'axios';
import APIServices from './ApiServices';
import GenUtil from '../utils/GenUtil';
import ReactPath from '../utils/ReactPath';

class WorkSpaceServices {

  public static async fetchAllWorkSpace(): Promise<ServiceResponse<any>> {
    const axiosConfig: AxiosRequestConfig = {
      url: `${ReactPath.HOST}/api/v1/user/workspaces`,
      method: 'Get',
      headers: GenUtil.getHeaders(),
    };
    return await APIServices.request<boolean>(axiosConfig);
  }

  // public static async fetchSlackUsers(workspaceId: string): Promise<ServiceResponse<any>> {
  //     const axiosConfig: AxiosRequestConfig = {
  //         url: `${HOST}/api/v1/slack-user/fetch-users`,
  //         params: {workspaceId},
  //         method: 'Get',
  //         headers: GenUtil.getHeaders()
  //     };
  //     return await APIServices.request<boolean>(axiosConfig);
  // }

  public static async setWorkspaceSetting({ workspaceId = '', startTime = '', holidayDates = [], endTime = '', updatedBy = '', weekOffDays = [] }: any): Promise<ServiceResponse<any>> {
    const axiosConfig: AxiosRequestConfig = {
      url: `${ReactPath.HOST}/api/v1/app-settings`,
      method: 'Post',
      data: {
        workspaceId, startTime, holidayDates, endTime, updatedBy, weekOffDays,
      },
      headers: GenUtil.getHeaders(),
    };
    const sr = APIServices.request(axiosConfig);
    return sr;
  }

  public static async getWorkspaceSetting(workspaceId = ''): Promise<ServiceResponse<any>> {
    const axiosConfig: AxiosRequestConfig = {
      url: `${ReactPath.HOST}/api/v1/app-settings`,
      method: 'Get',
      params: {
        workspaceId,
      },
      headers: GenUtil.getHeaders(),
    };
    const sr = APIServices.request(axiosConfig);
    return sr;
  }

  public static async editWorkspaceSetting({ workspaceId = '', startTime = '', holidayDates = [], endTime = '', updatedBy = '', weekOffDays = [] }: any): Promise<ServiceResponse<any>> {
    const axiosConfig: AxiosRequestConfig = {
      url: `${ReactPath.HOST}/api/v1/app-settings`,
      method: 'Put',
      data: {
        workspaceId, startTime, holidayDates, endTime, updatedBy, weekOffDays,
      },
      headers: GenUtil.getHeaders(),
    };
    const sr = APIServices.request(axiosConfig);
    return sr;
  }

  public static async getLoggedInUserId(): Promise<ServiceResponse<any>> {
    const axiosConfig: AxiosRequestConfig = {
      url: `${ReactPath.HOST}/api/v1/user/id`,
      method: 'Get',
      headers: GenUtil.getHeaders(),
    };
    const sr = APIServices.request<any>(axiosConfig);
    return sr;
  }

}

export default WorkSpaceServices;
