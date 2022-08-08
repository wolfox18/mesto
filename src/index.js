import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";
import "./styles/index.css";
import { validationConfig, formValidators } from "./constants.js";
//поиск DOM элементов
// const elementsList = document.querySelector(".elements__list");
const openImagePreviewPopup = (cardData) => {
  //пока ниче не делаем, потом функция открытия попапа с картинкой
};
//создание новой карточки

//создание первоначальных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(
        item,
        '#element-template',
        openImagePreviewPopup
      );
      const cardElement = newCard.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".elements__list"
);
cardList.renderItems();
// initialCards.forEach((initialCard) => {
//   renderCard(initialCard, "#element-template");
// });

// //блок констант
//
// //image preview popup consts
// const imagePreviewPopup = document.querySelector(".popup_type_image");
// const imagePreviewElement = imagePreviewPopup.querySelector(".popup__image");
// const previewImageName = imagePreviewPopup.querySelector(".popup__image-name");
// //profile popup consts
// const profilePopup = document.querySelector(".popup_type_profile");
// const profileFormElement = profilePopup.querySelector(".popup__container");
// const profilePopupCloseBtn = profilePopup.querySelector(".popup__close-btn");
// const nameInput = profilePopup.querySelector(".popup__input_type_name");
// const descriptionInput = profilePopup.querySelector(
//   ".popup__input_type_description"
// );
// const editProfileBtn = document.querySelector(".profile__edit-btn");
// const profileName = document.querySelector(".profile__name");
// const profileDescription = document.querySelector(".profile__description");
// //new element popup consts
// const newElementPopup = document.querySelector(".popup_type_new-element");
// const newElementForm = newElementPopup.querySelector(".popup__form");
// const newElementPopupCloseBtn =
//   newElementPopup.querySelector(".popup__close-btn");
// const placeInput = newElementPopup.querySelector(".popup__input_type_place");
// const urlInput = newElementPopup.querySelector(".popup__input_type_url");
// const newElementButton = document.querySelector(".profile__post-add");
// //validation consts

// //общее управление попапами
// const closePopupByClick = (e) => {
//   if (e.target === e.currentTarget) {
//     closePopup(e.currentTarget);
//   }
// };
// const closePopupByEsc = (e) => {
//   if (e.code === "Escape") {
//     const popupElement = document.querySelector(".popup_opened");
//     closePopup(popupElement);
//   }
// };
// function openPopup(popupElement) {
//   popupElement.classList.add("popup_opened");
//   popupElement.addEventListener("mousedown", closePopupByClick);
//   document.addEventListener("keydown", closePopupByEsc);
// }
// function closePopup(popupElement) {
//   popupElement.classList.remove("popup_opened");
//   popupElement.removeEventListener("mousedown", closePopupByClick);
//   document.removeEventListener("keydown", closePopupByEsc);
// }

// //profile edit popup
// function openProfilePopup() {
//   openPopup(profilePopup);
//   nameInput.value = profileName.textContent;
//   descriptionInput.value = profileDescription.textContent;
// }
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   const name = nameInput.value;
//   profileName.textContent = name;
//   const description = descriptionInput.value;
//   profileDescription.textContent = description;
//   closePopup(profilePopup);
// }
// editProfileBtn.addEventListener("click", openProfilePopup);
// profilePopupCloseBtn.addEventListener("click", function (e) {
//   closePopup(profilePopup);
// });
// profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// //new post popup
// function openNewElementPopup() {
//   openPopup(newElementPopup);
//   newElementForm.reset();
//   formValidators["card-form"].resetValidation();
// }
// newElementButton.addEventListener("click", openNewElementPopup);
// newElementPopupCloseBtn.addEventListener("click", function (e) {
//   closePopup(newElementPopup);
// });
// newElementForm.addEventListener("submit", handleNewElementFormSubmit);

// //preview popup
// imagePreviewPopup
//   .querySelector(".popup__close-btn")
//   .addEventListener("click", () => {
//     closePopup(imagePreviewPopup);
//   });

// function handleNewElementFormSubmit(evt) {
//   evt.preventDefault();
//   const newCardData = {
//     name: placeInput.value,
//     imageUrl: urlInput.value,
//   };
//   renderCard(newCardData, "#element-template");
//   closePopup(newElementPopup);
// }

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
