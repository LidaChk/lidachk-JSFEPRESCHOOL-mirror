

window.onload = function() {

  console.log("index.js");

  document.querySelectorAll("a.language__link").forEach(element =>
    element.addEventListener("click", function() {
      if (!this.classList.contains('active')) {
        document.querySelector("a.language__link.active").classList.remove("active");
        this.classList.add("active");
      }
      return true;
    }));
};