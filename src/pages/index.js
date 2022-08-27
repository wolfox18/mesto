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
} from "../utils/constants.js";
const cardList = new Section((item) => {
  cardList.addItem(createCard(item), false);
}, ".elements__list");
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

//изменение данных пользователя
const userPopup = new PopupWithForm(popupsConfig, ".popup_type_profile", {
  handleFormSubmit: (inputData, showLoading, handleCloseForm) => {
    showLoading(true);
    api
      .patchUserInfo(inputData)
      .then((data) => {
        userInfo.setUserInfo(data);
        handleCloseForm();
      })
      .catch((err) => {
        console.log("Ошибка API при обновлении данных пользователя!", err);
      })
      .finally(() => {
        showLoading(false);
      });
  },
});
//работа попапа изменения данных пользователя
userPopup.setEventListeners();
document
  .querySelector(".profile__edit-btn")
  .addEventListener("click", (evt) => {
    userPopup.setInputValues(userInfo.getUserInfo());
    formValidators["profile-form"].resetValidation();
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
      handleDeleteClick: (card, cardId) => {
        popupConfirmDeleteCard.open(() => {
          api
            .deleteCard(cardId)
            .then(() => card.deleteCard())
            .catch((err) => console.log("Ошибка при удалении карточки!", err));
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
    userInfo.id
  );
  return newCard.generateCard();
};

//создание первоначальных карточек и заполнение данных пользователя
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log("Ошибка API при загрузке первоначальных данных!", err);
  });

//добавление новой карточки
const newElementPopup = new PopupWithForm(
  popupsConfig,
  ".popup_type_new-element",
  {
    handleFormSubmit: (inputData, showLoading, handleCloseForm) => {
      showLoading(true);
      api
        .postNewCard(inputData)
        .then((data) => {
          cardList.addItem(createCard(data), true);
          handleCloseForm();
        })
        .catch((err) => {
          console.log("Ошибка API при загрузке карточек!", err);
        })
        .finally(() => {
          showLoading(false);
        });
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
const avatarPopup = new PopupWithForm(
  popupsConfig,
  ".popup_type_change-avatar",
  {
    handleFormSubmit: (inputData, showLoading, handleCloseForm) => {
      showLoading(true);
      api
        .changeAvatar(inputData.link)
        .then(() => {
          userInfo.setUserInfo({ avatar: inputData.link });
          handleCloseForm();
        })
        .catch((err) => {
          console.log("Ошибка API при обновлении аватара!", err);
        })
        .finally(() => {
          showLoading(false);
        });
    },
  }
);
avatarPopup.setEventListeners();
document
  .querySelector(".profile__change-avatar")
  .addEventListener("click", (evt) => {
    formValidators["avatar-form"].resetValidation();
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
