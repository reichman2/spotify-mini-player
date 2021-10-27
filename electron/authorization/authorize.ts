import { BrowserWindow } from "electron";
import SpotifyWebApi from "spotify-web-api-node";
import { SpotifyAuth } from "./spotify-auth";


let authWindow: BrowserWindow | null;
let spotifyAuth: SpotifyAuth;

export let spotifyApi: SpotifyWebApi;


interface TokenQueryResponse {
    code?: string, 
    state?: string, 

    [key: string]: string | undefined
}

const createAuthWindow = (): BrowserWindow => {
    return new BrowserWindow({
        width: 400,
        height: 800,
        show: false,
        webPreferences: {
            nodeIntegration: false
        }
    });
}

export const beginAuthorization = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        authWindow = createAuthWindow();
        spotifyAuth = new SpotifyAuth();


        authWindow.loadURL(spotifyAuth.getAuthUrl());
        authWindow.show();

        const { session: { webRequest } } = authWindow.webContents;
        
        const filter = {
            urls: [
                "http://localhost/oauth/authorize*"
            ]
        }

        authWindow.on('closed', () => {
            authWindow = null;
        });

        webRequest.onBeforeRequest(filter, async ({ url }) => {
            let query = getUrlQueryParams(url);

            await spotifyAuth.setTokens(query.code!);
            spotifyApi = spotifyAuth.spotifyWebApi;
            return resolve(destroyAuthWindow());
        });

    });
}

const destroyAuthWindow = (): boolean => {
    if (!authWindow)
        return false;
    
    authWindow.close();
    authWindow = null;

    return true;
}

const getUrlQueryParams = (url: string): TokenQueryResponse => {
    let obj: TokenQueryResponse = { };
    
    url.split("?")[1].split("&").forEach(elem => {
        let keyVal = elem.split("=");
        obj[keyVal[0]] = keyVal[1];
    });

    return obj;
}