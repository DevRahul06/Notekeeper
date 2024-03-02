/**
 * @copyright devRahul06 2024
 */

"use strict";

/**
 * Toggles the theme between 'light' and 'dark'.
 * Manages the theme setting in the DOM and local storage
 */

const toggleTheme = function () {
  const /** {string} */ currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
  const /** {string} */ newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

/**
 * Initialize the theme
 */

const /** {string | null} */ storedTheme = localStorage.getItem("theme");
console.log("🚀 ~ file:theme.js:13 ~ storedTheme:", storedTheme);

const /** {Boolean} */ systemThemeIsDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
console.log("🚀 ~ file:theme.js:16 ~ systemThemeIsDark:", systemThemeIsDark);

const /** { String} */ initialTheme =
    storedTheme ?? (systemThemeIsDark ? "dark" : "light");
console.log("🚀 ~ file:theme.js:21 ~ initialTheme:", initialTheme);

document.documentElement.setAttribute("data-theme", initialTheme);

/**\
 * Attach toggleTheme to theme button click event
 */

window.addEventListener("DOMContentLoaded", function () {
  const /** {HTMLElement} */ themeBtn =
      this.document.querySelector("[data-theme-btn]");

  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
});
