export const authorize = async () => {
    await window.Main.requestAuthorization();
}

export const logCurrentTrack = () => {
    window.Main.logCurrentTrack();
}