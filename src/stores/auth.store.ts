import { defineStore } from 'pinia';
import AuthService from "../services/auth.service";
import AuthenticationError from "../exceptions/AuthenticationError";
import TokenService from "../services/token.service";

interface authData {
    user: {},
    authenticating: false,
    accessToken: string,
    authenticationErrorCode: 0,
    authenticationError: ""
}

export const auth = defineStore('auth', {
	state: () => {
		return {
			authData: {} as authData
		};
	},
	getters: {
        authenticationErrorCode: state => {
            return state.authData.authenticationErrorCode;
        },
        authenticationError: state => {
            return state.authData.authenticationError;
        },
        authenticating: state => {
            return state.authData.authenticating;
        },
        user: state => {
            return state.authData.user;
        }
	},
	actions: {
        async signIn(context: any, signInData: any) {
            return new Promise((resolve, reject) => {
                AuthService.signIn(signInData).then((res: any) => {
                    console.log(res);
                    context.commit("signInSuccess", res);
                    context.commit("setUser", res);
                    resolve(res);
                    window.location.reload();
                }).catch((err: any)  => {
                    if (err instanceof AuthenticationError) {
                        context.commit("signInError", {
                            errorCode: err.errorCode,
                            errorMessage: err.message
                        });
                        reject(err.message);
                    }
                });
            });
        },
        signOut(context: any) {
            return new Promise<void>((resolve) => {
                AuthService.signOut();
                context.commit("processSuccess");
                resolve();
                window.location.reload();
            });
        },
        setAuthenticatingStatus(context: any, status: any) {
            context.commit("setAuthenticatingStatus", status);
        },
        cleanState(context: any) {
            context.commit("cleanState");
        }
	}
});