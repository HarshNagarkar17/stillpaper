import { useEffect, useState } from "react";

interface UserPreferences {
  darkMode: boolean;
  toolbarHidden: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  darkMode: false,
  toolbarHidden: false,
};

interface Prefernce {
  preferences: UserPreferences;
  toggleDarkMode: () => void;
  toggleToolbarHidden: () => void;
}

export function useUserPreferences(): Prefernce {
  const [preferences, setPreferences] =
    useState<UserPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const storedPreferences: UserPreferences = {
      darkMode: localStorage.getItem("darkMode") === "true",
      toolbarHidden: localStorage.getItem("toolbarHidden") === "true",
    };

    setPreferences(storedPreferences);
  }, []);

  const toggleDarkMode = () =>
    setPreferences((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  const toggleToolbarHidden = () =>
    setPreferences((prev) => ({ ...prev, toolbarHidden: !prev.toolbarHidden }));

  useEffect(() => {
    if (preferences.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem(
      "toolbarHidden",
      JSON.stringify(preferences.toolbarHidden)
    );
    localStorage.setItem("darkMode", JSON.stringify(preferences.darkMode));
  }, [preferences]);

  return { preferences, toggleDarkMode, toggleToolbarHidden };
}
