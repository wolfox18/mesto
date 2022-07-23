import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { disableButton } from "./validate.js";
const elementsList = document.querySelector(".elements__list");

//popups control
const closePopupByClick = (e) => {
  const popupElement = document.querySelector(".popup_opened");
  if (e.target === e.currentTarget) {
    closePopup(popupElement);
  }
};
const closePopupByEsc = (e) => {
  const popupElement = document.querySelector(".popup_opened");
  if (e.code === "Escape") {
    closePopup(popupElement);
  }
};
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("click", closePopupByClick);
  document.addEventListener("keydown", closePopupByEsc);
  popupElement
    .querySelector(".popup__close-btn")
    .addEventListener("click", function () {
      closePopup(popupElement);
    });
}
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  popupElement.removeEventListener("click", closePopupByClick);
  document.removeEventListener("keydown", closePopupByEsc);
}
//profile edit popup
const profilePopup = document.querySelector(".popup_type_profile");
const profileFormElement = profilePopup.querySelector(".popup__container");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close-btn");
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const descriptionInput = profilePopup.querySelector(
  ".popup__input_type_description"
);
const editProfileBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
function openProfilePopup() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  profileName.textContent = name;
  const description = descriptionInput.value;
  profileDescription.textContent = description;
  closePopup(profilePopup);
}
editProfileBtn.addEventListener("click", openProfilePopup);
profilePopupCloseBtn.addEventListener("click", function (e) {
  closePopup(profilePopup);
});
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//new post popup
const newElementPopup = document.querySelector(".popup_type_new-element");
const newElementForm = newElementPopup.querySelector(".popup__container");
const newElementPopupCloseBtn =
  newElementPopup.querySelector(".popup__close-btn");
const placeInput = newElementPopup.querySelector(".popup__input_type_place");
const urlInput = newElementPopup.querySelector(".popup__input_type_url");
const newElementSubmitButton =
  newElementPopup.querySelector(".popup__save-btn");
const newElementButton = document.querySelector(".profile__post-add");
function openNewElementPopup() {
  openPopup(newElementPopup);
  placeInput.value = "";
  urlInput.value = "";
  disableButton(newElementSubmitButton);
}

newElementButton.addEventListener("click", openNewElementPopup);
newElementPopupCloseBtn.addEventListener("click", function (e) {
  closePopup(newElementPopup);
});
newElementForm.addEventListener("submit", newElementFormSubmitHandler);

const openImagePreviewPopup = (cardData) => {
  const imagePreviewPopup = document.querySelector(".popup_type_image");
  imagePreviewPopup.querySelector(".popup__image-name").textContent =
    cardData.name;
  const imagePreviewElement = imagePreviewPopup.querySelector(".popup__image");
  imagePreviewElement.alt = "Фотография «" + cardData.name + "»";
  imagePreviewElement.src = cardData.imageUrl;
  openPopup(imagePreviewPopup);
  
};

const renderCard = (cardData, cardTemplateSelector) => {
  const newCard = new Card(cardData, cardTemplateSelector, openImagePreviewPopup);
  elementsList.prepend(newCard.generateCard());
};

function newElementFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeInput.value,
    imageUrl: urlInput.value,
  };
  renderCard(newCardData, "#element-template");
  closePopup(newElementPopup);
}

initialCards.forEach((initialCard) => {
  renderCard(initialCard, "#element-template");
});
