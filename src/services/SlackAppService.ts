import ServiceResponse from "./ServiceResponse";
import {AxiosRequestConfig} from "axios";
import GenUtil from "../utils/GenUtil";
import APIServices from "./ApiServices";
import ReactPath from "../utils/ReactPath";

class SlackAppService {

    public static async fetchSlackApps(): Promise<ServiceResponse<any>> {
        const axiosConfig: AxiosRequestConfig = {
            url: `${ReactPath.HOST}/api/v1/slack-apps`,
            method: 'Get',
            headers: GenUtil.getHeaders()
        };
        const sr: ServiceResponse<any> = await APIServices.request<boolean>(axiosConfig);
        console.log(sr);
        return sr;
    }

    public static async integrateWithSlack(code:any = "", appId = ""): Promise<ServiceResponse<any>> {
        console.log(code, appId)
        const axiosConfig: AxiosRequestConfig = {
            url: `${ReactPath.HOST}/api/v1/slack-apps/integrate-slack-app`,
            data: {
                appId,
                code,
            },
            method: 'POST',
            headers: GenUtil.getHeaders()
        };

        return await APIServices.request<boolean>(axiosConfig);
    }

}

export default SlackAppService;
