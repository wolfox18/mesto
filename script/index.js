import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { FormValidator } from "./FormValidator.js";

const elementsList = document.querySelector(".elements__list");
const imagePreviewPopup = document.querySelector(".popup_type_image");
const imagePreviewElement = imagePreviewPopup.querySelector(".popup__image");

//popups control
const closePopupByClick = (e) => {
  const popupElement = document.querySelector(".popup_opened");
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget);
  }
};
const closePopupByEsc = (e) => {
  if (e.code === "Escape") {
    const popupElement = document.querySelector(".popup_opened");
    closePopup(popupElement);
  }
};
const addCloseByCrossListener = (popupElement) => {
  popupElement
    .querySelector(".popup__close-btn")
    .addEventListener("click", function () {
      closePopup(popupElement);
    });
};
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("mousedown", closePopupByClick);
  document.addEventListener("keydown", closePopupByEsc);
}
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  popupElement.removeEventListener("mousedown", closePopupByClick);
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
addCloseByCrossListener(profilePopup);
profilePopupCloseBtn.addEventListener("click", function (e) {
  closePopup(profilePopup);
});
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//new post popup
const newElementPopup = document.querySelector(".popup_type_new-element");
const newElementForm = newElementPopup.querySelector(".popup__form");
const newElementPopupCloseBtn =
  newElementPopup.querySelector(".popup__close-btn");
const placeInput = newElementPopup.querySelector(".popup__input_type_place");
const urlInput = newElementPopup.querySelector(".popup__input_type_url");
const newElementButton = document.querySelector(".profile__post-add");
function openNewElementPopup() {
  openPopup(newElementPopup);
  newElementForm.reset();
  formValidators["card-form"].resetValidation();
}
addCloseByCrossListener(newElementPopup);
newElementButton.addEventListener("click", openNewElementPopup);
newElementPopupCloseBtn.addEventListener("click", function (e) {
  closePopup(newElementPopup);
});
newElementForm.addEventListener("submit", handleNewElementFormSubmit);

const openImagePreviewPopup = (cardData) => {
  imagePreviewPopup.querySelector(".popup__image-name").textContent =
    cardData.name;
  imagePreviewElement.alt = "Фотография «" + cardData.name + "»";
  imagePreviewElement.src = cardData.imageUrl;
  addCloseByCrossListener(imagePreviewPopup);
  openPopup(imagePreviewPopup);
};

//создание новой карточки
const createCard = (cardData, cardTemplateSelector) => {
  const newCard = new Card(
    cardData,
    cardTemplateSelector,
    openImagePreviewPopup
  );
  return newCard.generateCard();
};

const renderCard = (cardData, cardTemplateSelector) => {
  elementsList.prepend(createCard(cardData, cardTemplateSelector));
};

function handleNewElementFormSubmit(evt) {
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

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
};

const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);