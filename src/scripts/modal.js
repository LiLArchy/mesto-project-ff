function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeClose);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeClose);
}

export function modalListeners() {
  const popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        closeModal(popup);
      }
      if (evt.target.classList.contains("popup__close")) {
        closeModal(popup);
      }
    });
  });
}