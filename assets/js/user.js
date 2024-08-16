// ------ Variables ------ \\
let overlay = document.querySelector(".overlay"),
  startBox = document.querySelector(".start-box"),
  yourName = document.getElementById("yourName"),
  chooseAvatar = document.getElementById("uploadAvatar"),
  startGame = document.getElementById("start-game");

let yourAvatar;

// Upload User Avatar
chooseAvatar.onchange = function () {
  const file = new FileReader();
  file.readAsDataURL(chooseAvatar.files[0]);
  file.addEventListener("load", () => (yourAvatar = file.result));
  document
    .querySelectorAll(".style-svg")
    .forEach((e) => e.classList.add("active"));
};

startGame.addEventListener("click", () => {
  const dataUser = {
    name: yourName.value || "Unknown",
    avatar: yourAvatar || "./assets/images/user.png",
  };
  document.querySelectorAll(".userAvatar").forEach((e) => {
    e.src = dataUser.avatar;
  });
  document.querySelectorAll(".userName").forEach((e) => {
    e.innerHTML = dataUser.name;
  });
});
