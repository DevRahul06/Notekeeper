/**
 * @copyright devRahul 2024
 */

"use strict";

/**
 * Attaches an event listener to a collection of DOM elements.
 *
 * @param {Array<HTMLElement>} element - An array of DOM elements. to attach the event lister to
 * @param {string} eventType - The type of event to listen for (e.g. 'click', 'mouseover').
 * @param {Function} callback - The function to be executed when the event occurs.
 */

const addEventOnElements = function (elements, eventType, callback) {
  // console.log(elements);
  elements.forEach((element) => element.addEventListener(eventType, callback));
};

/**
 *  Generates a greeting message based on the current hour of the day.
 *
 *
 * @param {number} currentHour - The current hour (0-23) to determine the appropriate greeting.
 * @returns {string} A Greeting message with salutation corresponding to the time of day
 */

const getGreetingMsg = function (currentHour) {
    const /** { string} */ greeting = 
    currentHour < 5  ? 'Night' :
    currentHour < 12 ? 'Morning' :
    currentHour < 15 ? 'Noon' :
    currentHour < 17 ? 'Afternoon' : 
    currentHour < 20 ? 'Evening' :
    'Night';

    return `Good ${greeting}`;

};

export { addEventOnElements, getGreetingMsg };
