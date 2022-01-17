

window.onload = function() {

  console.log("index.js");

  document.querySelectorAll("a.language__link").forEach(element =>
    element.addEventListener("click", function() {
      if (!this.classList.contains('switch_on')) {
        document.querySelector("a.language__link.switch_on").classList.remove("switch_on");
        this.classList.add("switch_on");
      }
      return true;
    }));
};