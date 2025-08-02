const cardTemplate = document.querySelector("#card-template").content;

export function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function handleDelete(evt) {
  evt.target.closest(".card").remove();
}

export function createCard(
  cardData,
  handleImageClick,
  handleLike,
  handleDelete
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  deleteButton.addEventListener("click", handleDelete);

  likeButton.addEventListener("click", handleLike);
  cardImage.addEventListener("click", () => {
    handleImageClick(cardData);
  });
  return cardElement;
}