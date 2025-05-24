// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки

function cardAdd (cardItems, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item ').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = cardItems.link;
    cardElement.querySelector('.card__image').alt = cardItems.name;
    cardElement.querySelector('.card__title').src = cardItems.name;

    deleteButton.addEventListener('click', deleteCard);

    return cardElement;

}

// @todo: Функция удаления карточки

const deleteCard = (evt) => {
    evt.target.closest('.card').remove();
};
// @todo: Вывести карточки на страницу

initialCards.forEach((items => {
    const card = cardAdd(items, deleteCard);
    cardList.append(card);
}));