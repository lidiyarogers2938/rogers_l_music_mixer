const information = document.querySelector('.instructions');
const toggle1 = document.querySelector('#info');

toggle1.addEventListener("click", () => {
        information.classList.toggle("question");
      });