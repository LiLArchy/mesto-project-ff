import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import { openModal, closeModal, modalListeners } from "./scripts/modal.js";
import { createCard, handleLike, handleDelete } from "./scripts/card.js";

const popupTypeEdit = document.querySelector(".popup_type_edit");
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewPlace = document.forms["new-place"];
const placeNameInput = formNewPlace.elements["place-name"];
const linkInput = formNewPlace.elements.link;
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaptionImage = popupTypeImage.querySelector(".popup__caption");

function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaptionImage.textContent = cardData.name;
  openModal(popupTypeImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  const cardElement = createCard(
    cardData,
    handleImageClick,
    handleLike,
    handleDelete
  );
  placesList.prepend(cardElement);
  closeModal(popupTypeNewCard);
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPlace.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  formNewPlace.reset();
  openModal(popupTypeNewCard);
});

initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    handleImageClick,
    handleLike,
    handleDelete
  );
  placesList.append(cardElement);
});

modalListeners();