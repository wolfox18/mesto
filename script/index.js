const initialCards = [
    {
        name: 'Амстердам',
        link: './images/amsterdam.jpg'
    },
    {
        name: 'Киев',
        link: './images/kyiv.jpg'
    },
    {
        name: 'Массачусетский технологический институт',
        link: './images/MIT.jpg'
    },
    {
        name: 'Осака',
        link: './images/osaka.jpg'
    },
    {
        name: 'Сингапур',
        link: './images/singapore.jpg'
    },
    {
        name: 'Тбилиси',
        link: './images/tbilisi.jpg'
    }
];

const elementsList = document.querySelector('.elements__list');
//popup control
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
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

/* popup.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        closePopup();
    }
}) */

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
}
function closeNewElementPopup() {
    newElementPopup.classList.remove('popup_opened');
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
    newElement.querySelector('.element__image').src = elementUrl;
    newElement.querySelector('.element__title').textContent = elementPlace;
    newElement.querySelector('.element__image').alt = "Миниаютюра «" + elementPlace + "»";

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
        bigImagePopup.classList.add('popup_opened');
    })
    return newElement;
}

//add initial cards
for (let i = 0; i < initialCards.length; i++) {
    elementsList.append(createCard(initialCards[i].name, initialCards[i].link));
}