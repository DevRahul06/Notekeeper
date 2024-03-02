/**
 * @copyright devRahul06 2024
 */

"use strict";

/**
 * module import
 */

import { addEventOnElements, getGreetingMsg } from "./utils.js";

/**
 * Toogle sidebar in small screen
 */

const /** {HTML Element} */ sidebar = document.querySelector("[data-sidebar]");
const /**  {Array<HTML Element}*/ sideBarTooglers = document.querySelectorAll(
    "[data-sidebar-toggler]"
  );
const /** {HTMl Element} */ overlay = document.querySelector(
    "[data-sidebar-overlay]"
  );

addEventOnElements(sideBarTooglers, "click", function () {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

/**
 * Show greeting message on homepage
 */

const /** {HTMLElement} */ greetElement =
    document.querySelector("[data-greeting]");
const /** {number} */ currentHour = new Date().getHours();
greetElement.textContent = getGreetingMsg(currentHour);

/**
 * Show current date on homepage
 */

const /** {HTMLElement} */ currentDateElement = document.querySelector(
    "[data-current-data]"
  );
currentDateElement.textContent = new Date().toDateString().replace(" ", ", ");
