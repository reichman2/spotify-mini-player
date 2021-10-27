import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import { beginAuthorization, spotifyApi } from './authorization/authorize';
import { loadEnv } from './store/environment';
import path from 'path'
import { apiRequest } from './authorization/spotify-bridge-handler';


let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow () {
  const envPath = path.join(process.cwd(), ".env");
  
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    // frame: false,
    // alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // enableRemoteModule: ,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  });

  /**
   * For completing Spotify oauth.
   */
  ipcMain.handle('request-authorization', async (event, arg) => {
    let res = await beginAuthorization();
    return "stinky";
  });

  /**
   * For refreshing spotify credentials with the refresh-token.
   */
  ipcMain.on('request-authorization-refresh', (_) => {
    
  });

  // --------- SPOTIFY API BRIDGE ---------
  ipcMain.handle("spotify", async (event, action: string, ...args: any[]) => {
    return await apiRequest(action, ...args);
  });

  

  // --------- DEBUG ----------
  ipcMain.on('log-current-track', async (_) => {
    console.log((await spotifyApi.getMyCurrentPlayingTrack()).body.item!.name);
  });

  
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // dotenv.config()

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


