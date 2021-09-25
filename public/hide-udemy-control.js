console.log("Loaded 'Hide Udemy Video Control'");

let isShown = true;

function udemyExec() {
  var controlBtn = document.createElement("BUTTON");
  controlBtn.style = [
    "font-size: 10px",
    "opacity: 0.5",
    "position: fixed",
    "right: 40px",
    "top: 0",
    "background-color: blue",
    "width: 40px",
    "height: 20px",
    "color: white",
    "z-index: 99999"
  ].join(";");

  controlBtn.innerHTML = isShown ? "HIDE" : "SHOW";
  controlBtn.onclick = () => {
    isShown = !isShown;
    isShown ? udemyShow() : udemyHide();
    controlBtn.innerHTML = isShown ? "HIDE" : "SHOW";
  };
  document.body.appendChild(controlBtn);
}

function udemyHide() {
  document
    .querySelectorAll('[data-purpose="video-control-bar"]')
    .forEach((s) => (s.style.display = "none"));

  document
    .querySelectorAll('[data-purpose="video-play-button-initial"]')
    .forEach((s) => (s.closest("div").style.display = "none"));

  document
    .querySelectorAll("[class^='user-activity--hide-when-user-inactive']")
    .forEach((s) => (s.style.display = "none"));
}

function udemyShow() {
  document
    .querySelectorAll('[data-purpose="video-control-bar"]')
    .forEach((s) => (s.style.display = "flex"));

  document
    .querySelectorAll('[data-purpose="video-play-button-initial"]')
    .forEach((s) => (s.closest("div").style.display = "block"));

  document
    .querySelectorAll("[class^='user-activity--hide-when-user-inactive']")
    .forEach((s) => (s.style.display = "block"));
}

udemyExec();
