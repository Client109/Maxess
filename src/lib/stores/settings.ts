import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'maxess.showPointsGraph';

const initial = browser
  ? localStorage.getItem(STORAGE_KEY) === 'true'
  : false;

export const showPointsGraph = writable<boolean>(initial);

if (browser) {
  showPointsGraph.subscribe(v => {
    localStorage.setItem(STORAGE_KEY, String(v));
  });
}
