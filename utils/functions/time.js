export function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const t = [
        hours > 0 ? `${hours}hr` : '',
        minutes > 0 ? `${minutes}m` : '',
        `${remainingSeconds.toFixed(hours > 0 || minutes > 0 ? 0 : 0)}s`
    ].join('');
  
    return t;
}

export function formatTimeMs(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const milliseconds = Math.floor((remainingSeconds - Math.floor(remainingSeconds)) * 100); // Extract milliseconds and convert to integer

    const t = [
        hours > 0 ? `${hours}hr` : '',
        minutes > 0 ? `${minutes}m` : '',
        `${Math.floor(remainingSeconds)}.${milliseconds.toFixed(0).padStart(2, '0')}s`
    ].join('');

    return t;
}
