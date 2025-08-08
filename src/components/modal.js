
const handleEscKeyDown = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};


export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyDown);
};


export const closeModal= (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyDown);
};


export const addEventListeners = (popupElement) => {
  const closeButton = popupElement.querySelector('.popup__close');
  closeButton.addEventListener("click", () => {
    closeModal(popupElement);
  });
  popupElement.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closeModal(popupElement);
    }
  });
}