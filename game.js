const leds = document.querySelectorAll(".led");

function clicado(event) {
  const index = event.dataset.id;

  if (leds[index].classList.contains("on")) {
    leds[index].classList.remove("on");
  } else {
    leds[index].classList.add("on");
  }
}