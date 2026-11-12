export type Theme = "light" | "dark";

const THEME_KEY = "elp-theme";

/** Map stored values to Mist (light) / Noir (dark). Legacy aliases normalize to dark. */
export function resolveTheme(stored: string | null): Theme {
  if (
    stored === "dark" ||
    stored === "noir" ||
    stored === "navy" ||
    stored === "charcoal" ||
    stored === "night"
  ) {
    return "dark";
  }
  return "light";
}

export function readStoredTheme(): Theme {
  try {
    return resolveTheme(localStorage.getItem(THEME_KEY));
  } catch {
    return "light";
  }
}

export function writeStoredTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Private mode / blocked storage — theme still applies for the session.
  }
}
