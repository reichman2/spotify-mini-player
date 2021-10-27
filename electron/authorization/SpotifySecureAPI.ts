/// <reference types="spotify-api" />

import SpotifyWebApi from "spotify-web-api-node";
import { SpotifyAuth } from "./spotify-auth";


type RepeatState = 'track' | 'context' | 'off';

export interface SpotifyStatus {
    shuffle?: boolean;
    repeatState?: RepeatState;

    track?: SpotifyApi.CurrentlyPlayingObject;
}



/**
 * The point of this class is only to expose "safe" apis to the renderer.
 * This class was going to be useful, but then electron was suck so now it's just redundant 
 * and will be removed soon.
 * @deprecated
 */
export class SpotifySecureAPI {
    private spotifyAuth: SpotifyAuth | undefined;
    private api: SpotifyWebApi;
    private statusCache: SpotifyStatus;


    constructor(api: SpotifyWebApi, spotifyAuth?: SpotifyAuth) {
        this.spotifyAuth = spotifyAuth;
        this.api = api;
        this.statusCache = { };
    }


    public async resumePlayback() {
        let res = await this.api.play();
    }

    public async pausePlayback() {
        let res = await this.api.pause();
    }

    public async togglePlayback() {
        let res = await this.getCurrentPlaybackState();

        if (res.is_playing) {
            this.pausePlayback()
        } else {
            this.resumePlayback();
        }
    }

    public async getCurrentPlaybackState(): Promise<SpotifyApi.CurrentPlaybackResponse> {
        let res = await this.api.getMyCurrentPlaybackState();
        this.statusCache.track = res.body;
        this.statusCache.repeatState = res.body.repeat_state;
        this.statusCache.shuffle = res.body.shuffle_state;

        return res.body;        
    }


    public async skipToNextTrack(): Promise<void> {
        let res = await this.api.skipToNext();
    }

    public async skipToPreviousTrack(): Promise<void> {
        let res = await this.api.skipToPrevious();
    }

    public async restartTrack() {
        this.seek(0);
    }

    public async seek(timeMs: number): Promise<void> {
        let res = await this.api.seek(timeMs);
    }


    public async enableShuffle(): Promise<void> {
        let res = await this.api.setShuffle(true);
        this.statusCache.shuffle = true;
    }

    public async disableShuffle(): Promise<void> {
        let res = await this.api.setShuffle(false);
        this.statusCache.shuffle = false;
    }

    public async toggleShuffle() {
        if (this.statusCache.shuffle) {
            this.disableShuffle();
        } else {
            this.enableShuffle();
        }
    }


    public async setRepeat(state: RepeatState) {
        await this.api.setRepeat(state);
    }

    public async toggleRepeat(): Promise<void> {
        switch (this.statusCache.repeatState) {
            case "track":
                await this.setRepeat("context");
                break;
            case "context":
                await this.setRepeat("off");
                break;
            case "off":
                await this.setRepeat("track");
                break;
        }
    }


    public async addToQueue() {

    }

    public async removeFromQueue() {

    }

    public async reorderQueue() {

    }

    public async clearQueue() {

    }

    public async searchForTrack(name: string): Promise<SpotifyApi.SearchResponse> {
        let res = await this.api.search(name, ["track"]);
        
        return res.body;
    }
}