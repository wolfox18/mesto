const elementsList = document.querySelector('.elements__list');

//popups control
const closePopupByClick = (e) => {
    popupElement = document.querySelector('.popup_opened');
    if (e.target === e.currentTarget) {
        closePopup(popupElement);
    }
}
const closePopupByEsc = (e) => {
    popupElement = document.querySelector('.popup_opened');
    if (e.code === "Escape") {
        closePopup(popupElement);
    }
}
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    popupElement.addEventListener('click', closePopupByClick); 
    document.addEventListener('keydown', closePopupByEsc);
}
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    popupElement.removeEventListener('click', closePopupByClick);
    document.removeEventListener('keydown', closePopupByEsc);
}
//profile edit popup
const profilePopup = document.querySelector('.popup_type_profile');
const profileFormElement = profilePopup.querySelector('.popup__container');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__close-btn');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
const profileSubmitButton = profilePopup.querySelector('.popup__save-btn');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
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
editProfileBtn.addEventListener('click', openProfilePopup);
profilePopupCloseBtn.addEventListener('click', function (e) {
    closePopup(profilePopup);
});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

//big image popup
const bigImagePopup = document.querySelector('.popup_type_image');
const bigImage = bigImagePopup.querySelector('.popup__image');
const bigImageName = bigImagePopup.querySelector('.popup__image-name');
const bigImaagePopupCloseBtn = bigImagePopup.querySelector('.popup__close-btn');
bigImaagePopupCloseBtn.addEventListener('click', function () {
    closePopup(bigImagePopup);
});

//new post popup
const newElementPopup = document.querySelector('.popup_type_new-element');
const newElementForm = newElementPopup.querySelector('.popup__container');
const newElementPopupCloseBtn = newElementPopup.querySelector('.popup__close-btn');
const placeInput = newElementPopup.querySelector('.popup__input_type_place');
const urlInput = newElementPopup.querySelector('.popup__input_type_url');
const newElementSubmitButton = newElementPopup.querySelector('.popup__save-btn');
const newElementButton = document.querySelector('.profile__post-add')
function openNewElementPopup() {
    openPopup(newElementPopup);
    placeInput.value = '';
    urlInput.value = '';
    disableButton(newElementSubmitButton);
}
function newElementFormSubmitHandler(evt) {
    evt.preventDefault();
    elementsList.prepend(createCard(placeInput.value, urlInput.value));
    closePopup(newElementPopup);
}
newElementButton.addEventListener('click', openNewElementPopup);
newElementPopupCloseBtn.addEventListener('click', function (e) {
    closePopup(newElementPopup);
});
newElementForm.addEventListener('submit', newElementFormSubmitHandler);

//new element feature
const elementTemplate = document.querySelector('#element-template').content;

function createCard(elementPlace, elementUrl) {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true);
    const newElementImage = newElement.querySelector('.element__image');
    newElementImage.src = elementUrl;
    newElement.querySelector('.element__title').textContent = elementPlace;
    newElementImage.alt = "Миниаютюра «" + elementPlace + "»";

    //card like feature
    const elementLikeButton = newElement.querySelector('.element__like');
    elementLikeButton.addEventListener('click', function () {
        elementLikeButton.classList.toggle('element__like_active');
    });

    //card delete feature
    const cardDeleteButton = newElement.querySelector('.element__delete-button');
    cardDeleteButton.addEventListener('click', function (event) {
        const parent = event.target.parentElement;
        parent.remove();
    });

    //big picture feature
    const smallPicture = newElement.querySelector('.element__image');
    smallPicture.addEventListener('click', function () {
        bigImage.src = elementUrl;
        bigImage.alt = "Фотография «" + elementPlace + "»";
        bigImageName.textContent = elementPlace;
        openPopup(bigImagePopup);
    })
    return newElement;
}

initialCards.forEach((initialCard) => {
    elementsList.append(createCard(initialCard.name, initialCard.link));
});