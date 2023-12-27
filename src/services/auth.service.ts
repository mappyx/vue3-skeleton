import ApiService from "./api.service";
import AuthenticationError from "../exceptions/AuthenticationError";
import TokenService from "./token.service";
import { AxiosRequestConfig } from "axios";
import UserSignIn from "../models/UserSignIn";
import config from "../config";

const AuthService = {
    signIn: async function(signInData: UserSignIn) {
        const requestData: AxiosRequestConfig = {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            url: "auth/sign_in",
            data: JSON.stringify({
                email: signInData.email,
                password: signInData.password,
            })
        };

        try {
            const response = await ApiService.customRequest(requestData);
            TokenService.saveToken(response.headers["access-token"]);
            if (!config.APP_DEVELOPMENT_MODE && TokenService.getToken()?.access_token == "") {
                this.signOut();
                return;
            }
            ApiService.setHeader();
            ApiService.mount401Interceptor();
            return response.data.data;
        } catch (error) {
            this.catchError(error);
        }
    },
    signOut: function() {
        TokenService.removeToken();
        ApiService.removeHeader();
        ApiService.unmount401Interceptor();
    },
    catchError: function(error: any) {
        let status;
        let description;

        if (error.response === undefined) {
            status = error.message;
            description = error.message;
        } else {
            status = error.response.status;
            description = error.response.data.error_description;
        }

        throw new AuthenticationError(status, description);
    }
}

export default AuthService;