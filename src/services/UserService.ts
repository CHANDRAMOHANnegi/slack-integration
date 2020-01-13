import ServiceResponse from './ServiceResponse';
import { AxiosRequestConfig } from 'axios';
import APIServices from './ApiServices';
import GenUtil from '../utils/GenUtil';
import { toast } from 'react-toastify';
import ReactPath from '../utils/ReactPath';

class UserServices {
  public static async signup(name = '', email = '', password = ''): Promise<ServiceResponse<boolean>> {
    const axiosConfig: AxiosRequestConfig = {
      url: `${ReactPath.HOST}/api/v1/user`,
      data: {
        name,
        email,
        password,
      },
      method: 'POST',
    };
    return await APIServices.request<boolean>(axiosConfig);
  }

  public static async login(email = '', password = ''): Promise<ServiceResponse<any>> {
    const axiosConfig: AxiosRequestConfig = {
      url: `${ReactPath.HOST}/api/v1/user`,
      data: {
        email,
        password,
      },
      method: 'POST',
    };

    const sr: ServiceResponse<any> = await APIServices.request<boolean>(axiosConfig);
    console.log(sr);
    const { data } = sr;
    if (data && data.success) {
      const { jwt } = data.data;
      localStorage.removeItem('jwt');
      GenUtil.setAccessToken(jwt);
    } else {
      toast.error('invalid details');
    }
    return sr;
  }
}

export default UserServices;
