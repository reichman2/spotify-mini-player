import SpotifyWebApi from "spotify-web-api-node";
import { v4 } from 'uuid';
import { envvars } from '../store/environment';
import Store from "../store/Store";


export const redirectURI = "http://localhost/oauth/authorize";

export const scopes = [
    "app-remote-control",
    "user-modify-playback-state",
    "user-read-currently-playing"
];

export const authStore = new Store("user-data");


/** 
 * This class is redundant and will be eventually removed
 * (TODO: remove this class)
 * @deprecated
 */
export class SpotifyAuth {
    private _spotifyWebApi: SpotifyWebApi;
    private _state: string;
    private _expiresIn: number | undefined;

    constructor() {
        
        this._spotifyWebApi = new SpotifyWebApi({
            clientId: envvars.CLIENT_ID,
            clientSecret: envvars.CLIENT_SECRET,
            redirectUri: redirectURI
        });
        
        // Check if a refresh token is saved
        if (authStore.get("refreshToken")) 
            this.spotifyWebApi.setRefreshToken(authStore.get('refreshToken'));
        
        this._state = v4(); // State to use for CSRF
    }


    get accessToken() {
        return this.spotifyWebApi.getAccessToken();
    }

    get refreshToken() {
        return this.spotifyWebApi.getRefreshToken();
    }

    get spotifyWebApi() {
        return this._spotifyWebApi;
    }

    get state() {
        return this._state;
    }

    get expiresIn() {
        return this._expiresIn;
    }

    getAuthUrl() {
        return this.spotifyWebApi.createAuthorizeURL(scopes, this.state, true);
    }

    async setTokens(code: string) {
        try {
            const res = await this.spotifyWebApi.authorizationCodeGrant(code);

            this.spotifyWebApi.setAccessToken(res.body.access_token);
            this.spotifyWebApi.setRefreshToken(res.body.refresh_token);
            this._expiresIn = res.body.expires_in;

            authStore.set('refreshToken', res.body.refresh_token);
        } catch (err) {
            console.log("An error occurred while granting authorization.", err);
        }
    }

    async refreshAccess() {
        try {
            const res = await this.spotifyWebApi.refreshAccessToken();

            this.spotifyWebApi.setAccessToken(res.body.access_token);
            this._expiresIn = res.body.expires_in;
        } catch (err) {
            console.log("An error occurred while refreshing access.", err);
        }
    }
}

