
const circle = document.querySelector('.progress-ring__circle');
const container = document.querySelector('.content');
const applyBtn = document.querySelector('.submit');

const liContainer = document.querySelectorAll('li');
const fontsContainer = document.querySelectorAll('.font');
const accentColorsContainer = document.querySelectorAll('.accent-color');

const promodDiv = document.querySelector('#promodoro');
const shortBreak = document.querySelector('#shortBreak');
const longBreak = document.querySelector('#longBreak');
const minutesPromodoro = document.querySelector('input[name=promodoro-minutes]');
const minutesShortBreak = document.querySelector('input[name=short-break-minutes]');
const minutesLongBreak = document.querySelector('input[name=long-break-minutes]');

const arrowsPlus = document.querySelectorAll('.arrow-plus');
const arrowsMinus = document.querySelectorAll('.arrow-minus');

const openBtn = document.getElementById('popup-open');
const cancelBtn = document.getElementById('popup-close');


class Promodoro {
   constructor(name, time) {
      this.name = name;
      this.promodoro = time;
      this.number = time;
      this.time = this.promodoro * 60;
   }

   static counterPromodoro = 0;

   static countPromodoroTimer(name) {
      if (name == 'promodoro') {
         this.counterPromodoro++;
      }
   }

   radius = circle.r.baseVal.value;
   circumference = 2 * Math.PI * this.radius;

   countDownTimer = -1;


   timer(text, btn) {
      this.countDownTimer = setInterval(() => {
         let minutes = Math.floor(this.time / 60);
         let seconds = this.time % 60;
         seconds = seconds < 10 ? '0' + seconds : seconds;
         let percent = 100 - ((100 * minutes) / this.number);
         this.setProgress(percent);

         if (minutes == 0 && seconds == 0) {
            Promodoro.countPromodoroTimer(this.name);
            clearInterval(this.countDownTimer);
            btn.innerHTML = 'restart';
            this.pause();
         }

         text.innerHTML = `${minutes}:${seconds}`;
         this.time--;
      }, 1000);

      this.preventFail();
   }
   pause() {
      let userPauseTime = 60;
      this.userPause = setInterval(() => {
         userPauseTime--;
         if (userPauseTime == 0) {
            clearInterval(this.userPause);
            this.switcher();
         }
      }, 100);
   }
   preventFail() {
      liContainer.forEach(el => {
         el.addEventListener('click', () => {
            clearInterval(this.countDownTimer);
            clearInterval(this.userPause);
            this.countDownTimer = -1;
         });
      });
      openBtn.addEventListener('click', () => {
         clearInterval(this.countDownTimer);
         clearInterval(this.userPause);
         this.countDownTimer = -1;
      });
   }

   switcher() {
      switch (this.name) {
         case 'promodoro':
            if (4 <= Promodoro.counterPromodoro) {
               Promodoro.counterPromodoro = 0;
               addClassActive(longBreak, liContainer);
               creatLongBreakTimer();
               alert("You've done it!!! Take a long break and enjoy yourself))");
            } else if (Promodoro.counterPromodoro < 4) {
               addClassActive(shortBreak, liContainer);
               creatShortBreakTimer();
            }
            break
         default:
            addClassActive(promodDiv, liContainer);
            creatPromodoroTimer();
      }
   }
   addEvent(time, btn) {
      btn.addEventListener('click', () => {
         if (this.countDownTimer == -1) {
            btn.innerHTML = 'PAUSE';
            this.timer(time, btn);
            clearInterval(this.userPause);
         } else if (btn.innerHTML == 'restart') {
            let again = new Promodoro(`${this.name}`, this.number);
            clearInterval(this.userPause);
            again.creatContent();
         } else {
            btn.innerHTML = 'START';
            clearInterval(this.countDownTimer);
            this.countDownTimer = -1;
         }
      });
   }
   setProgress(percent) {
      const offset = this.circumference - percent / 100 * this.circumference;
      circle.style.strokeDashoffset = offset;
   }
   creatContent() {
      container.innerHTML = '';
      let time = document.createElement('div'),
         btn = document.createElement('button');

      time.innerHTML = `${this.promodoro}:00`;
      btn.innerHTML = 'start';
      circle.style.strokeDasharray = ` ${this.circumference} ${this.circumference}`;
      circle.style.strokeDashoffset = this.circumference;
      container.appendChild(time);
      container.appendChild(btn);

      this.addEvent(time, btn);

   }

}

function addClassActive(el, container) {
   if (!el.classList.contains('active')) {
      for (let i = 0; i < container.length; i++) {
         container[i].classList.remove('active');
      }
      el.classList.add('active');
   }
}

function addingStyle(el, index) {
   let firstItem,
      secondItem;
   if (index == 0) {
      firstItem = el.id;
      secondItem = document.body.classList[index + 1];
   } else {
      firstItem = document.body.classList[index - 1];
      secondItem = el.id;
   }
   document.body.classList = '';
   document.body.classList.add(firstItem, secondItem);
}

function creatPromodoroTimer() {
   let promodoro = new Promodoro('promodoro', minutesPromodoro.value);
   promodoro.creatContent();
}
function creatShortBreakTimer() {
   let shortBreak = new Promodoro('shortBreak', minutesShortBreak.value);
   shortBreak.creatContent();
}
function creatLongBreakTimer() {
   let longBreak = new Promodoro('longBreak', minutesLongBreak.value);
   longBreak.creatContent();
}
