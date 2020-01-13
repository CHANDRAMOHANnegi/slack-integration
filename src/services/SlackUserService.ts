import ServiceResponse from './ServiceResponse';
import { AxiosRequestConfig } from 'axios';
import GenUtil from '../utils/GenUtil';
import APIServices from './ApiServices';
import ReactPath from '../utils/ReactPath';


class SlackUserService {

  public static async fetchSlackUsers(workspaceId: string, offset: number, limit: number): Promise<ServiceResponse<any>> {

    const axiosConfig: AxiosRequestConfig = {
      url: `${ReactPath.HOST}/api/v1/slack-users`,
      method: 'Get',
      params: { workspaceId, offset, limit },
      headers: GenUtil.getHeaders(),
    };
    const sr: ServiceResponse<any> = await APIServices.request<boolean>(axiosConfig);
    return sr;
  }

  public static async updateSlackUsers(appId: string, workspaceId: string): Promise<ServiceResponse<any>> {
    const axiosConfig: AxiosRequestConfig = {
      url: `${ReactPath.HOST}/api/v1/slack-users`,
      method: 'Put',
      data: { workspaceId, appId },
      headers: GenUtil.getHeaders(),
    };
    const sr: ServiceResponse<any> = await APIServices.request<any>(axiosConfig);
    console.log(sr);
    return sr;
  }

  public static async fetchSlackUserAttendance(slackId = '') {
    const axiosConfig: AxiosRequestConfig = {
      url: `${ReactPath.HOST}/api/v1/slack-users/attendance`,
      method: 'Get',
      params: { slackId },
      headers: GenUtil.getHeaders(),
    };
    const sr = await APIServices.request(axiosConfig);
    return sr;
  }

  public static async fetchSlackUserAttendanceByMonthAndYear(month: number, year: number, slackId = '') {
    const axiosConfig: AxiosRequestConfig = {
      url: `${ReactPath.HOST}/api/v1/slack-users/attendance`,
      method: 'Get',
      params: { month, slackId, year },
      headers: GenUtil.getHeaders(),
    };
    const sr = await APIServices.request(axiosConfig);
    return sr;
  }
}


export default SlackUserService;
