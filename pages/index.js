const editProfileBtn = document.querySelector('.profile__edit-btn');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');

function closePopup(){
    popup.classList.remove('popup_opened');
}

editProfileBtn.addEventListener('click', function () {
    popup.classList.add('popup_opened');
})

popupCloseBtn.addEventListener('click', function () {
    closePopup();
})

popup.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        console.log(1);
        closePopup();
    }
    console.log(2);
})
