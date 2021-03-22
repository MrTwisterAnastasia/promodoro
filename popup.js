
openBtn.onclick = function entry() {
   document.getElementById('entry').style.display = "block";
}

window.onclick = function (e) {
   if (e.target == document.getElementById('entry')) {
      document.getElementById('entry').style.display = "none";
   }
}

cancelBtn.onclick = function () {
   document.getElementById('entry').style.display = "none";
}

applyBtn.addEventListener('click', () => {
   document.getElementById('entry').style.display = "none"
})