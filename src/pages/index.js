import { Card } from "../components/Card.js";
import { initialCards } from "../utils/initial-cards.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css";
import { validationConfig, formValidators, popupsConfig } from "../utils/constants.js";
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__description",
});
const userPopup = new PopupWithForm(popupsConfig, ".popup_type_profile", {
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
const popupWithImage = new PopupWithImage(popupsConfig, ".popup_type_image");
popupWithImage.setEventListeners();
const openImagePreviewPopup = (cardData) => {
  popupWithImage.open(cardData);
};
//функция создания карточки
const createCard = (data) => {
  const newCard = new Card(
    data,
    "#element-template",
    openImagePreviewPopup
  );
  return newCard.generateCard();
}
//создание первоначальных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".elements__list"
);
cardList.renderItems();
const newElementPopup = new PopupWithForm(popupsConfig, ".popup_type_new-element", {
  handleFormSubmit: (inputData) => {
    cardList.addItem(createCard(inputData));
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