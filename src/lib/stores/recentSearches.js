import { writable } from 'svelte/store';

const KEY = 'recent_pokemon_searches_v1';

function read() {
  if (typeof sessionStorage === 'undefined') return [];
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

function write(list) {
  if (typeof sessionStorage === 'undefined') return;
  sessionStorage.setItem(KEY, JSON.stringify(list));
}

export const recentSearches = writable([]);

export function initRecentSearches() {
  recentSearches.set(read());
}

export function addRecentSearch({ name, types }) {
  const cleanName = String(name ?? '').trim().toLowerCase();
  if (!cleanName) return;

  const cleanTypes = Array.isArray(types) ? types : [];

  const current = read();

  // ta bort dubbletter (case-insensitive)
  const withoutDupes = current.filter((x) => x.name.toLowerCase() !== cleanName);

  // lägg först (nyast först)
  const next = [{ name: cleanName, types: cleanTypes }, ...withoutDupes].slice(0, 5);

  write(next);
  recentSearches.set(next);
}
