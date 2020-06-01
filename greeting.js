const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    deleting = document.querySelector(".js-deleting");

const USER_LS = "currentUser",
    SHOWING_CN = "showing",
    DELETING_CN = "deleting";

function hideDeleteBtn() {
    deleting.classList.add(DELETING_CN);
    deleting.classList.remove(SHOWING_CN);
}

function refresh() {
    greeting.classList.remove(SHOWING_CN);
    hideDeleteBtn();
    form.classList.add(SHOWING_CN);
}

function handleDeleteBtn(event) {
    localStorage.removeItem(USER_LS);
    refresh();
}

function showDeleteBtn() {
    deleting.classList.remove(DELETING_CN);
    deleting.classList.add(SHOWING_CN);
    deleting.addEventListener("click", handleDeleteBtn);
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
    showDeleteBtn();
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();