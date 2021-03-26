window.onload = () => {
   minutesPromodoro.value = 25;
   minutesShortBreak.value = 5;
   minutesLongBreak.value = 15;
   creatPromodoroTimer()
}
promodoro.addEventListener('click', () => {
   creatPromodoroTimer()
})
shortBreak.addEventListener('click', () => {
   creatShortBreakTimer()
})
longBreak.addEventListener('click', () => {
   creatLongBreakTimer()
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

arrowsPlus.forEach((el => {
   el.addEventListener('click', (el) => el.target.parentNode.parentNode.querySelector('[type=number]').stepUp())
}))
arrowsMinus.forEach((el => {
   el.addEventListener('click', (el) => el.target.parentNode.parentNode.querySelector('[type=number]').stepDown())
}))

applyBtn.addEventListener('click', () => {
   document.querySelector('.active').click();
})

