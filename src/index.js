import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";
import "./styles/index.css";
import { validationConfig, formValidators } from "./constants.js";
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__description",
});
const userPopup = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  openedClass: "popup_opened",
  closeButtonSelector: ".popup__close-btn",
  inputSelector: ".popup__input",
  formSelector: ".popup__form",
  handleFormSubmit: (inputData) => {
    userInfo.setUserInfo(inputData);
  },
});
userPopup.setEventListeners();
document
  .querySelector(".profile__edit-btn")
  .addEventListener("click", (evt) => {
    userPopup.setInputValues(userInfo.getUserInfo());
    userPopup.open();
  });
//работа попапа с превью
const popupWithImage = new PopupWithImage({
  popupSelector: ".popup_type_image",
  openedClass: "popup_opened",
  closeButtonSelector: ".popup__close-btn",
  nameSelector: ".popup__image-name",
  imageSelector: ".popup__image",
});
popupWithImage.setEventListeners();
const openImagePreviewPopup = (cardData) => {
  popupWithImage.open(cardData);
};
//создание первоначальных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(
        item,
        "#element-template",
        openImagePreviewPopup
      );
      const cardElement = newCard.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".elements__list"
);
cardList.renderItems();
const newElementPopup = new PopupWithForm({
  popupSelector: ".popup_type_new-element",
  openedClass: "popup_opened",
  closeButtonSelector: ".popup__close-btn",
  inputSelector: ".popup__input",
  formSelector: ".popup__form",
  handleFormSubmit: (inputData) => {
    const newCard = new Card(
      inputData,
      "#element-template",
      openImagePreviewPopup
    );
    const cardElement = newCard.generateCard();
    cardList.addItem(cardElement);
  },
});
newElementPopup.setEventListeners();
document
  .querySelector(".profile__post-add")
  .addEventListener("click", (evt) => {
    formValidators["card-form"].resetValidation();
    newElementPopup.open();
  });

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
