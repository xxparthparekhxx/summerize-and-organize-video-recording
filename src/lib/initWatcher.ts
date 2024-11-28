import { VideoWatcher } from './fileWatcher';
import { WATCH_CONFIG } from '../config/watcherConfig';

export function initializeWatcher() {
  const watcher = new VideoWatcher(WATCH_CONFIG.path);
  return watcher;
}
