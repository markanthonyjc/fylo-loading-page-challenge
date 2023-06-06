const INVALID_TEXT_EMAIL = {
    message: "Please check your email",
    invalidClass: "invalid-text",
    modifiers: {
        default: "--default",
        free: "--free"
    }
}

class InputEmail {
    constructor(form, name) {
        this.name = name;
        this.element = form.elements[this.name];
        this.parent = this.element.parentElement;
        this.invalidClass = "invalid-input";
    }
}

const getStartedForm = document.querySelector(".loading-page__get-started-form");
const freeGetStartedForm = document.querySelector(".loading-page__free-get-started-form");

const inputEmailDefault = new InputEmail(
    getStartedForm,
    "get-started-email"
);

const inputEmailFree = new InputEmail(
    freeGetStartedForm,
    "free-get-started-email"
);

const createInvalidEmailElement = () => {
    const invalidEmail = document.createElement('span');
    invalidEmail.innerText = INVALID_TEXT_EMAIL.message;
    invalidEmail.classList.add(INVALID_TEXT_EMAIL.invalidClass);

    return invalidEmail;
};
const clearFormState = inputEmail => {
    inputEmail.element.classList.remove(inputEmail.invalidClass);

    const invalidEmail = inputEmail.parent.querySelector(".invalid-text");
    if (invalidEmail) {
        inputEmail.parent.removeChild(invalidEmail);
    }
};
const isEmailFormInvalid = inputEmail => !inputEmail.element.value.includes("@");
const setFormToInvalidState = inputEmail => {
    const invalidEmail = createInvalidEmailElement();

    inputEmail.element.classList.add(inputEmail.invalidClass);

    if (inputEmail.name.includes('free')) {
        invalidEmail.classList.add(`${INVALID_TEXT_EMAIL.invalidClass}${INVALID_TEXT_EMAIL.modifiers.free}`);
    } else {
        invalidEmail.classList.remove(`${INVALID_TEXT_EMAIL.invalidClass}${INVALID_TEXT_EMAIL.modifiers.free}`)
        invalidEmail.classList.add(`${INVALID_TEXT_EMAIL.invalidClass}${INVALID_TEXT_EMAIL.modifiers.default}`);
    }

    inputEmail.parent.appendChild(invalidEmail);
};

getStartedForm.addEventListener("submit", (event) => {
    event.preventDefault();

    clearFormState(inputEmailDefault);

    if (isEmailFormInvalid(inputEmailDefault)) {
        setFormToInvalidState(inputEmailDefault);
        return;
    }
});
freeGetStartedForm.addEventListener('submit', (event) => {
    event.preventDefault();

    clearFormState(inputEmailFree);

    if (isEmailFormInvalid(inputEmailFree)) {
        setFormToInvalidState(inputEmailFree);
        return;
    }
});
