import { contextBridge, ipcRenderer } from 'electron'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */

  sendMessage: (message: string) => { 
    ipcRenderer.send('message', message)
  },

  /**
   * Provide an easier way to listen to events
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },

  requestAuthorization: async () => {
    await ipcRenderer.invoke('request-authorization');
  },

  logCurrentTrack: () => {
    ipcRenderer.send('log-current-track');
  },

  // Me trying to streamline this as much as possible :(
  spotifyApi: {
    play: () => {
      return spotifyRequest("play");
    },

    pause: () => {
      return spotifyRequest("pause");
    },

    skipToNext: () => {
      return spotifyRequest("skipToNext");
    },

    skipToPrev: () => {
      return spotifyRequest("skipToPrev");
    },

    seek: (positionMs: number) => {
      return spotifyRequest("seek", positionMs);
    },

    setShuffle: (state: boolean) => {
      return spotifyRequest("setShuffle", state);
    },

    setRepeat: (state: "track" | "context" | "off") => {
      return spotifyRequest("setRepeat", state);
    },

    getSongInfo: () => {
      return spotifyRequest("getSongInfo");
    }
  }
}

const spotifyRequest = async (action: string, ...args: any[]) => {
  console.log('dingus at bridge');
  return await ipcRenderer.invoke('spotify', action, args);
}


contextBridge.exposeInMainWorld('Main', api)