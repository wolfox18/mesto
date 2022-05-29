//popup elements
let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let popupCloseBtn = popup.querySelector('.popup__close-btn');
let nameInput = popup.querySelector('.popup__input_type_name');
let descriptionInput = popup.querySelector('.popup__input_type_description');
let submitButton = popup.querySelector('.popup__save-btn');

//profile elements
let editProfileBtn = document.querySelector('.profile__edit-btn');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}
function closePopup() {
    popup.classList.remove('popup_opened');
}

editProfileBtn.addEventListener('click', function () {
    openPopup();
})

popup.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        closePopup();
    }
})

//form submit
function formSubmitHandler(evt) {
    evt.preventDefault();
    if (submitButton === evt.submitter) {
        let name = nameInput.value;
        profileName.textContent = name;
        let description = descriptionInput.value;
        profileDescription.textContent = description;
    }
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 