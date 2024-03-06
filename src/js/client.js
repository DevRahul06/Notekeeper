/**
 * @copyright devRahul06 2024
 */

"use strict";

/**
 * Import module
 */
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
import { Card } from "./components/Card.js";

const /** {HTMLElement} */ sidebarList = document.querySelector(
    "[data-sidebar-list]"
  );

const /** {HTMLElement} */ notePanelTitle = document.querySelector(
    "[data-note-panel-title]");
const /** {HTMLElement} */ notePanel = document.querySelector('[data-note-panel]');

/**
 * The client object manages interactions with the user interface (UI) to create, Read, update and delete notebook and notes.
 * it provides functions for performinh these operations and updating the UI accordingly
 *
 * @namespace
 * @property {object} notebook - functions for managing notebook in the UI.
 * @property {object} note - function for managing notes in the UI>
 *
 */

export const client = {
  notebook: {
    /**
     * Create a new notebook in the UI,Based on provided notebook data.
     * @param {Object} notebookData - Data representing the view notebook.
     */

    create(notebookData) {
      const /** {HTMLElement} */ navItem = NavItem(
          notebookData.id,
          notebookData.name
        );
      sidebarList.appendChild(navItem);
      activeNotebook.call(navItem);
      notePanelTitle.textContent = notebookData.name;
    },

    /**
     * Reads and display a list of notebooks in the UI
     *
     * @param {Array<Object>} notebookList -List of notebook data to display
     */

    read(notebookList) {
      notebookList.forEach((notebookData, index) => {
        const /** {HTMLElement} */ navItem = NavItem(
            notebookData.id,
            notebookData.name
          );

        if (index === 0) {
          activeNotebook.call(navItem);
          notePanelTitle.textContent = notebookData.name;
        }

        sidebarList.appendChild(navItem);
      });
    },

    /**
     * Updates the UI to reflect changes in a notebook.
     *
     * @param {String} notebookId - ID of the notebook to update.
     * @param {Object} notebookData - New data for the notebook.
     */

    update(notebookId, notebookData) {
      const /** {HTMLElement} */ oldNotebook = document.querySelector(
          `[data-notebook="${notebookId}"]`
        );
      const /** {HTMLElement} */ newNotebook = NavItem(
          notebookData.id,
          notebookData.name
        );

      notePanelTitle.textContent = notebookData.name;
      sidebarList.replaceChild(newNotebook, oldNotebook);
      activeNotebook.call(newNotebook);
    },

    /**
     * Deletes a notebook from the UI
     *
     * @param {string} notebookId -ID of the notebook to delete
     */

    delete(notebookId) {
      const /** {HTMLElement} */ deletedNotebook = document.querySelector(
          `[data-notebook='${notebookId}']`
        );
      const /** {HTMLElement | null} */ activeNavItem =
          deletedNotebook.nextElementSibling ??
          deletedNotebook.previousElementSibling;

          if(activeNavItem){
            activeNavItem.click();
          } else{
            notePanelTitle.innerHTML = '';
            notePanel.innerHTML = '';

          }

      deletedNotebook.remove();
    },
  },


  note:{

    /**
     * Create a new note card in the UI based on provided note daata.
     * 
     * @param {Object} noteData - Data representing the new note.
     */

    create(noteData) {
      
      // Append card in notePanel
      const /** {HTMLElement} */ card = Card(noteData);
      notePanel.appendChild(card);
      
    }

  }

};
