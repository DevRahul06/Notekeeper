/**
 * @copyright devRahul06 2024
 */

"use strict";

const /** {HTMLElement} */ overlay = document.createElement("div");
overlay.classList.add("overlay", "modal-overlay");

/**
 * Create and manages a modal for adding or editing notes. The Modal allow user to input a note's title and text,
 * and provides functionality to submit and save the note.
 *
 * @param {string} [title='Untitled'] -The default title for the note.
 * @param {string} [text = 'Add Your note..'] - The default text for the note.
 * @param {string} [time = ''] - The time associated with the note.
 * @returns {Object} - An object containing functions to open the modal, close the modal, and handle note submission.
 */

const NoteModal = function (
  title = "Untitled",
  text = "Add your Note.....",
  time = ""
) {
  const /** {HTMLElement} */ modal = document.createElement("div");
  modal.classList.add("model");

  modal.innerHTML = `
    <button class="icon-btn large" aria-label="Close modal" data-close-btn>
      <span class="material-symbols-rounded" aria-hidden="true">close</span>
      <div class="state-layer"></div>
    </button>

    <input
      type="text"
      placeholder="Untitled"
      value="${title}"
      data-note-field
      class="model-title text-title-medium"
    />

    <textarea
      placeholder="Take a note..."
      class="model-text text-body-large custom-scrollbar"
      data-note-field
    >${text}</textarea>

    <div class="model-footer">
      <span class="time text-label-large">${time}</span>
      <button class="btn text" data-submit-btn>
        <span class="text-label-large"> Save </span>
        <div class="state-layer"></div>
      </button>
    </div>
  `;

  const /** {HTMLElement} */ submitBtn = modal.querySelector('[data-submit-btn]')
  submitBtn.disabled = true;

  const /** {HTMLElement} */ [titleField, textField] = modal.querySelectorAll('[data-note-field]');

  const enableSubmit = function (){
    submitBtn.disabled = !titleField.value && !textField.value;
  }

  textField.addEventListener('keyup', enableSubmit)
  titleField.addEventListener('keyup', enableSubmit)

  /**
   * Opens the note modal by appending it to the document body and setting focus on the title field.
   */

  const open = function () {
    document.body.appendChild(modal);
    document.body.appendChild(overlay);
    titleField.focus();
  }

  /**
   * closes the note modal by removing it form the document body.
   */

  const close = function (){
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  }

  // Attach click event to closeBtn, Whne click call the close modal function
  const /**{HTMLEleme} */ closeBtn = modal.querySelector('[data-close-btn]')

  closeBtn.addEventListener('click', close);

  /**
   * Handles the submission of a note within the modal
   * 
   * @param {Function} callback - The callback function to execute with the submitted note data.
   */

  const onSubmit = function(callback) {

    submitBtn.addEventListener('click', function() {
      const /** {Object} */ noteData = {
        title: titleField.value,
        text: textField.value
      }

      callback(noteData);

    });

  }

  return { open, close, onSubmit }

};

/**
 * Creates and manages a modal for confirming the deletion of an item.
 *
 * @param {String} title - The title of the item to be deleted.
 * @returns {Object} - An object containing functions to open the modal, close the model, and handle confirmation.
 */
const DeleteConfirmModal = function (title) {
  const /** {HTMLElement} */ modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
  <div class="overlay modal-overlay" data-modal-overlay></div>

  <div class="model">
    <h3 class="modal-title text-title-medium">
      Are you sure you want to delete <strong>"${title}"</strong>?
    </h3>

    <div class="model-footer">
      <button class="btn text" data-action-btn="flase">
        <span class="text-label-large"> Cancel </span>
        <div class="state-layer"></div>
      </button>

      <button class="btn fill" data-action-btn="true">
        <span class="text-label-large"> Delete </span>
        <div class="state-layer"></div>
      </button>
    </div>
  </div>
  `;

  /**
   * Opens the delete confimation modal by appending it to the document body
   */

  const open = function () {
    document.body.appendChild(modal);
    document.body.appendChild(overlay);
  };

  /**
   * CLoses the delete confirmation modal by removing it from the document body
   */

  const close = function () {
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  };

  const /** {Array<HTMLElement>} */ actionBtns =
      modal.querySelectorAll("[data-action-btn]");

  /**
   * Handles the submission of the delete confirmation
   *
   * @param {Function} callback -The callback function to execute with the confirmation result (true for confirmation, false for cancel).
   */

  const onSUbmit = function (callback) {
    actionBtns.forEach((btn) =>
      btn.addEventListener("click", function () {
        const /** {Boolean} */ isConfrim =
            this.dataset.actionBtn === "true" ? true : false;

        callback(isConfrim);
      })
    );
  };

  return { open, close, onSUbmit };
};

export { DeleteConfirmModal, NoteModal };
