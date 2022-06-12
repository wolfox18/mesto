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



//profile edit popup
let profilePopup = document.querySelector('.popup_type_profile');
let profileFormElement = profilePopup.querySelector('.popup__container');
let profilePopupCloseBtn = profilePopup.querySelector('.popup__close-btn');
let nameInput = profilePopup.querySelector('.popup__input_type_name');
let descriptionInput = profilePopup.querySelector('.popup__input_type_description');
let profileSubmitButton = profilePopup.querySelector('.popup__save-btn');
let editProfileBtn = document.querySelector('.profile__edit-btn');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
function openProfilePopup() {
    profilePopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}
function closeProfilePopup() {
    profilePopup.classList.remove('popup_opened');
}
function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    let name = nameInput.value;
    profileName.textContent = name;
    let description = descriptionInput.value;
    profileDescription.textContent = description;
    closeProfilePopup();
}
editProfileBtn.addEventListener('click', openProfilePopup);
profilePopupCloseBtn.addEventListener('click', closeProfilePopup);
profileFormElement.addEventListener('submit', profileFormSubmitHandler);

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
    bigImagePopup.classList.remove('popup_opened');
});

//new post popup
let newElementPopup = document.querySelector('.popup_type_new-element');
let newElementForm = newElementPopup.querySelector('.popup__container');
let newElementPopupCloseBtn = newElementPopup.querySelector('.popup__close-btn');
let placeInput = newElementPopup.querySelector('.popup__input_type_place');
let urlInput = newElementPopup.querySelector('.popup__input_type_url');
let newElementSubmitButton = newElementPopup.querySelector('.popup__save-btn');
let newElementButton = document.querySelector('.profile__post-add')
function openNewElementPopup() {
    newElementPopup.classList.add('popup_opened');
    placeInput.value = '';
    urlInput.value = './images/elbrus.jpg';
}
function closeNewElementPopup() {
    newElementPopup.classList.remove('popup_opened');
}
function newElementFormSubmitHandler(evt) {
    evt.preventDefault();
    addNewElement(placeInput.value, urlInput.value);
    closeNewElementPopup();
}
newElementButton.addEventListener('click', openNewElementPopup);
newElementPopupCloseBtn.addEventListener('click', closeNewElementPopup);
newElementForm.addEventListener('submit', newElementFormSubmitHandler);

//new element feature
const elementTemplate = document.querySelector('#element-template').content;
function addNewElement(elementPlace, elementUrl) {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true);
    newElement.querySelector('.element__image').src = elementUrl;
    newElement.querySelector('.element__title').textContent = elementPlace;
    
    //card like feature
    let elementLikeButton = newElement.querySelector('.element__like');
    elementLikeButton.addEventListener('click', function () {
        elementLikeButton.classList.toggle('element__like_active');
    });

    //card delete feature
    const cardDeleteButton = newElement.querySelector('.element__delete-button');
    cardDeleteButton.addEventListener('click', function (event) {
        let parent = event.target.parentElement;
        parent.remove();
    });

    //big picture feature
    const smallPicture = newElement.querySelector('.element__image');
    smallPicture.addEventListener('click', function(){
        bigImage.src = elementUrl;
        bigImage.alt = elementPlace;
        bigImageName.textContent = elementPlace;
        bigImagePopup.classList.add('popup_opened');
    })
    elementsList.prepend(newElement);
}

//add initial cards
for (let i = 0; i < initialCards.length; i++) {
    addNewElement(initialCards[i].name, initialCards[i].link);
}