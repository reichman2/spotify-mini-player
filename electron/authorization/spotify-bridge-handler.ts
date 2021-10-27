import { spotifyApi } from './authorize';

// TODO make the types here more specific.
type ApiFunctions = {
    [key: string]: (...args: any[]) => any;
};

export const apiRequest = (action: string, ...args: any[]) => {
    try {
        return apiFunctions[action](...args);
    } catch (err) {
        console.error("invalid api function");
        throw err;
    }
}

const apiFunctions: ApiFunctions = {
    play: async (...args: any[]) => {
        return spotifyApi.play();
    },

    pause: async () => {
        return spotifyApi.pause();
    },

    skipToNext: async () => {
        return spotifyApi.skipToNext();
    },

    skipToPrev: async () => {
        return spotifyApi.skipToPrevious();
    },

    setShuffle: async (state: boolean) => {
        // TODO add parameter safety check
        return spotifyApi.setShuffle(state);
    },

    seek: async (positionMs: number) => {
        // TODO add parameter safety check
        return spotifyApi.seek(positionMs);
    },

    setRepeat: async (state: "track" | "context" | "off") => {
        // TODO add parameter safety check
        return spotifyApi.setRepeat(state)
    },

    getSongInfo: async (): Promise<SpotifyApi.CurrentlyPlayingObject> => {
        return new Promise<SpotifyApi.CurrentlyPlayingObject>((resolve, reject) => {
            spotifyApi.getMyCurrentPlayingTrack()
                .catch(err => reject(err))
                .then(res => resolve(res!.body));
        });
    }
}