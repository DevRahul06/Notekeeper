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
    "[data-note-panel-title]"
  );
const /** {HTMLElement} */ notePanel =
    document.querySelector("[data-note-panel]");                            // data-note-create-btn
const /** {Array<HTMLElement} */ noteCreateBtns = document.querySelectorAll('[data-note-create-btn]');
const /** {string} */ emptyNoteTemplate = `
  <div class="empty-notes">
        <span class="material-symbols-rounded" aria-hidden="true"
          >note_stack</span
        >

        <div class="text-headline-small">No notes</div>
      </div> 

`;


/**
 * Enables or disables "Create Note" buttons based on whether there are any notebooks.
 * 
 * @param {boolean} isThereAnyNotebooks - Indicates whether there are any notebooks.
 */
const disableNoteCreateBtns = function (isThereAnyNotebooks) {
  noteCreateBtns.forEach(item => {
    item[isThereAnyNotebooks ? 'removeAttribute' : 'setAttribute'] ('disabled', '');
  }); 
}

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
      const /** {HTMLElement} */ navItem = NavItem(notebookData.id,notebookData.name);
      sidebarList.appendChild(navItem);
      activeNotebook.call(navItem);
      notePanelTitle.textContent = notebookData.name;
      notePanel.innerHTML = emptyNoteTemplate;
      disableNoteCreateBtns(true);
    },

    /**
     * Reads and display a list of notebooks in the UI
     *
     * @param {Array<Object>} notebookList -List of notebook data to display
     */

    read(notebookList) {
      disableNoteCreateBtns(notebookList.length);
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

      if (activeNavItem) {
        activeNavItem.click();
      } else {
        notePanelTitle.innerHTML = "";
        notePanel.innerHTML = "";
        disableNoteCreateBtns(false);
      }

      deletedNotebook.remove();
    },
  },

  note: {
    /**
     * Create a new note card in the UI based on provided note daata.
     *
     * @param {Object} noteData - Data representing the new note.
     */

    create(noteData) {
      // Clear 'emptynotesTemplate' from 'notePanel' if there is no note exists

      if(!notePanel.querySelector('[data-note]')) notePanel.innerHTML = '' ;

      // Append card in notePanel
      const /** {HTMLElement} */ card = Card(noteData);
      notePanel.prepend(card);
    },

    /**
     * Reads and displays a list of notes in the UI.
     *
     * @param {Array<Object>} noteList - List of note data to display.
     */

    read(noteList) {
      if (noteList.length) {
        notePanel.innerHTML = "";

        noteList.forEach((noteData) => {
          const /** {HTMLELement} */ card = Card(noteData);
          notePanel.appendChild(card);
        });
      } else {
        notePanel.innerHTML = emptyNoteTemplate;
      }
    },

    /**
     * Updates a note card in the UI Based on provided note data.
     * 
     * @param {String4} noteId - ID Of the note to update.
     * @param {*} noteData -New data for the note.
     */

    update(noteId, noteData) {

      const /** {HTMLElement} */ oldnote = document.querySelector(`[data-note = "${noteId}"]`);
      const /** {HTMLElement} */ newnote = Card(noteData);
      notePanel.replaceChild(newnote, oldnote);
    },

    /**
     * Deletes a note card from the UI
     * 
     * @param {String} noteId - ID of the note to delete.
     * @param {boolean} isNoteExists - Indicates whether other notes still exist.
     */

    delete(noteId, isNoteExists) {
      document.querySelector(`[data-note = "${noteId}"]`).remove();
      if (!isNoteExists) notePanel.innerHTML = emptyNoteTemplate;
    }

  },
};
