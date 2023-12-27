import Token from "../models/Token";

const ACCESS_TOKEN = "access_token" as string;

export const getToken = (): Token | null => {
    const tokenRaw = localStorage.getItem(ACCESS_TOKEN);
    if (tokenRaw === null) return null;
    const token: Token = JSON.parse(tokenRaw);
    return token;
};

/**
 * @description save token into localStorage from the headers
 * @param accessToken: string
 */
export const saveToken = (accessToken: string = ''): void => {
  const token = {
    "access_token": accessToken
  };
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(token));
};

export const removeToken = (): void => {
    localStorage.removeItem(ACCESS_TOKEN);
};

const TokenService = { getToken, saveToken, removeToken };

export default TokenService;