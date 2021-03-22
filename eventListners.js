window.onload = () => {
   minutesPromodoro.value = 25;
   minutesShortBreak.value = 5;
   minutesLongBreak.value = 15;
   let promodoro = new Promodoro(minutesPromodoro.value);
   promodoro.creatContent();
}
promodoro.addEventListener('click', () => {
   let promodoro = new Promodoro(minutesPromodoro.value);
   promodoro.creatContent();
})
shortBreak.addEventListener('click', () => {
   let shortBreak = new Promodoro(minutesShortBreak.value);
   shortBreak.creatContent();
})
longBreak.addEventListener('click', () => {
   let longBreak = new Promodoro(minutesLongBreak.value);
   longBreak.creatContent();
})

liContainer.forEach(el => {
   el.addEventListener('click', () => addClassActive(el, liContainer));
})
fontsContainer.forEach(el => {
   el.addEventListener('click', () => addClassActive(el, fontsContainer));
   el.addEventListener('click', () => addingStyle(el, 0));
})
accentColorsContainer.forEach(el => {
   el.addEventListener('click', () => addClassActive(el, accentColorsContainer));
   el.addEventListener('click', () => addingStyle(el, 1));
})

applyBtn.addEventListener('click', () => {
   document.querySelector('.active').click();
})