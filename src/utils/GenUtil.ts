class GenUtil {
    static accessToken = "";

    static getAccessToken() {
        return this.accessToken || localStorage.getItem('jwt');
    }

    static setAccessToken(token: string) {
        localStorage.setItem('jwt', token);
        this.accessToken = token;
    }

    static getHeaders() {
        return {
            "jwt": GenUtil.getAccessToken(),
        };
    }

}

export default GenUtil;
