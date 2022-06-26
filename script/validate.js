const showInputError = (formElement, inputElement, errorMessage, classNames) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classNames.inputErrorClass);
  errorElement.textContent = errorMessage;
  console.log(errorElement.clientHeight);
  console.log(errorElement.style);
};

const hideInputError = (formElement, inputElement, classNames) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classNames.inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, classNames) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classNames);
  } else {
    hideInputError(formElement, inputElement, classNames);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, classNames) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(classNames.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(classNames.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, classNames) => {
  const inputList = Array.from(formElement.querySelectorAll(classNames.inputSelector));
  const buttonElement = formElement.querySelector(classNames.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, classNames);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, classNames);
      toggleButtonState(inputList, buttonElement, classNames);
    });
  });
};

const enableValidation = (classNames) => {
  const formList = Array.from(document.querySelectorAll(classNames.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, classNames);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error"
});
