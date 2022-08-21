import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css";
import {
  validationConfig,
  formValidators,
  popupsConfig,
  userId,
} from "../utils/constants.js";

//подключаем апи
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    authorization: "dc2c7972-8fda-44b9-92f6-abe481f1c75c",
    "Content-Type": "application/json",
  },
});

//данные пользователя
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

//заполняем данными с сервера
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log("Ошибка API при загрузке данных пользователя!", err);
  });

//изменение данных пользователя
const userPopup = new PopupWithForm(popupsConfig, ".popup_type_profile", {
  handleFormSubmit: (inputData, showLoading) => {
    showLoading(true);
    api
      .patchUserInfo(inputData)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log("Ошибка API при обновлении данных пользователя!", err);
      }).finally(showLoading(false));
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

//работа попапа подтверждения удаления карточки
const popupConfirmDeleteCard = new PopupWithConfirmation(
  popupsConfig,
  ".popup_type_confirm"
);
popupConfirmDeleteCard.setEventListeners();

//функция создания карточки
const createCard = (data) => {
  const newCard = new Card(
    data,
    "#element-template",
    {
      handleCardClick: openImagePreviewPopup,
      handleDeleteClick: (cardElement, cardId) => {
        popupConfirmDeleteCard.open(() => {
          cardElement.remove();
          api.deleteCard(cardId);
        });
      },
      changeLike: (cardData, isLiked, likeCallback) => {
        if (isLiked) {
          api
            .deleteLike(cardData._id)
            .then((data) => {
              likeCallback(data.likes);
            })
            .catch((err) => {
              console.log("Ошибка API при удалении лайка!", err);
            });
        } else {
          api
            .addLike(cardData._id)
            .then((data) => {
              likeCallback(data.likes);
            })
            .catch((err) => {
              console.log("Ошибка API при установке лайка!", err);
            });
        }
      },
    },
    userId
  );
  return newCard.generateCard();
};

//создание первоначальных карточек
const cardList = new Section(
  {
    items: {},
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".elements__list"
);
api
  .getInitialCards()
  .then((data) => {
    data.forEach((item) => cardList.addItem(createCard(item), false));
  })
  .catch((err) => {
    console.log("Ошибка API при загрузке карточек!", err);
  });

//добавление новой карточки
const newElementPopup = new PopupWithForm(
  popupsConfig,
  ".popup_type_new-element",
  {
    handleFormSubmit: (inputData, showLoading) => {
      showLoading(true);
      api
        .postNewCard(inputData)
        .then((data) => {
          console.log("Новая карточка ", data);
          cardList.addItem(createCard(data), true);
        })
        .catch((err) => {
          console.log("Ошибка API при загрузке карточек!", err);
        })
        .finally(showLoading(false));
    },
  }
);
newElementPopup.setEventListeners();
document
  .querySelector(".profile__post-add")
  .addEventListener("click", (evt) => {
    formValidators["card-form"].resetValidation();
    newElementPopup.open();
  });

//аватар
const avatarElement = document.querySelector(".profile__avatar");
const avatarPopup = new PopupWithForm(
  popupsConfig,
  ".popup_type_change-avatar",
  {
    handleFormSubmit: (inputData, showLoading) => {
      showLoading(true);
      api
        .changeAvatar(inputData.link)
        .then(() => {
          avatarElement.src = inputData.link;
        })
        .catch((err) => {
          console.log("Ошибка API при обновлении аватара!", err);
        })
        .finally(showLoading(false));
    },
  }
);
avatarPopup.setEventListeners();
document
  .querySelector(".profile__change-avatar")
  .addEventListener("click", (evt) => {
    avatarPopup.open();
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
