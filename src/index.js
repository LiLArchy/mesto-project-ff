import './pages/index.css'; 
import { createCard, handleLikeClick } from './components/card.js'; 
import { openModal, closeModal, addEventListeners } from './components/modal.js'; 
import { enableValidation, clearValidation } from './components/validation.js'; 
import { getUserInfo, getInitialCards, updateProfile, addCard, updateAvatar, deleteCard } from './components/api.js'; 


const profileImage = document.querySelector('.profile__image');
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editPopup = document.querySelector('.popup_type_edit');
const editProfileForm = editPopup.querySelector('form[name="edit-profile"]');
const nameInput = editPopup.querySelector('input[name="name"]');
const descriptionInput = editPopup.querySelector('input[name="description"]');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('form[name="new-place"]');
const placeNameInput = newCardForm.querySelector('input[name="place-name"]');
const placeLinkInput = newCardForm.querySelector('input[name="link"]');
const updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
const updateAvatarForm = updateAvatarPopup.querySelector('form[name="update-avatar"]');
const avatarInput = updateAvatarForm.querySelector('input[name="avatar"]');
const imagePopup = document.querySelector('.popup_type_image');
const placesList = document.querySelector('.places__list');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let currentUserId;


Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    updateUserInfo(userData);
    cards.forEach(card => {
      const newCard = createCard(card, currentUserId, handleLikeClick, handleImageClick, handleDelete);
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных с сервера:', err);
  });


function handleDelete(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.error('Ошибка при удалении карточки:', err);
    });
}

function updateUserInfo(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

function handleImageClick(evt) {
  const imgSrc = evt.target.src;
  const imgAlt = evt.target.alt;
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = imgSrc;
  popupImage.alt = imgAlt;
  popupCaption.textContent = imgAlt;

  openModal(imagePopup);
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = editProfileForm.querySelector(validationConfig.submitButtonSelector);
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  updateProfile({ name: newName, about: newDescription })
    .then((updatedUser) => {
      updateUserInfo(updatedUser);
      closeModal(editPopup);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
}


function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = newCardForm.querySelector(validationConfig.submitButtonSelector);
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  addCard({ name, link })
    .then((card) => {
      const newCard = createCard(card, currentUserId, handleLikeClick, handleImageClick, handleDelete);
      placesList.prepend(newCard);
      closeModal(newCardPopup);
      newCardForm.reset();
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = updateAvatarForm.querySelector(validationConfig.submitButtonSelector);
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  const avatarUrl = avatarInput.value;

  updateAvatar(avatarUrl)
    .then((updatedUser) => {
      updateUserInfo(updatedUser);
      closeModal(updateAvatarPopup);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

editProfileButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  descriptionInput.value = document.querySelector('.profile__description').textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editPopup);
});

addPlaceButton.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openModal(newCardPopup);
});

profileImage.addEventListener('click', () => {
  updateAvatarForm.reset();
  clearValidation(updateAvatarForm, validationConfig);
  openModal(updateAvatarPopup);
});

editProfileForm.addEventListener('submit', handleFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);
updateAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

addEventListeners(editPopup);
addEventListeners(newCardPopup);
addEventListeners(imagePopup);
addEventListeners(updateAvatarPopup);


enableValidation(validationConfig);