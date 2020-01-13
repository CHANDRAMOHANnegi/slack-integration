import ServiceResponse from './ServiceResponse';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class APIServices<T> {
  static async request<T>(axiosConfig: AxiosRequestConfig): Promise<ServiceResponse<T>> {
    try {
      const response: AxiosResponse = await Axios.request(axiosConfig);
      if (response.status >= 200 && response.status < 400) {

        return ServiceResponse.success(response.data, '');
      } else {
        return ServiceResponse.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
      return ServiceResponse.error('Something went wrong');
    }
  }
}

export default APIServices;
