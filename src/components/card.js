import { likeCard, unlikeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;


export function handleLikeClick(cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeMethod = isLiked ? unlikeCard : likeCard;

  likeMethod(cardId)
    .then(updatedCard => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCount.textContent = updatedCard.likes.length;
    })
    .catch(err => {
      console.error(
        isLiked
          ? 'Ошибка при снятии лайка:'
          : 'Ошибка при добавлении лайка:',
        err
      );
    });
}


export function createCard(cardData, currentUserId, handleLike, handleClick, handleDelete) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  
  if (cardData.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  
  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      handleDelete(cardData._id, cardElement);
    });
  }

  
  likeButton.addEventListener('click', () => {
    handleLike(cardData._id, likeButton, likeCount);
  });

  cardImage.addEventListener('click', handleClick);

  return cardElement;
}