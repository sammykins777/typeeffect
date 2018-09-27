const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//Type Method
TypeWriter.prototype.type = function() {
  // current index of word
  const current = this.wordIndex % this.words.length;
  // get full text of curren word

  const fullTxt = this.words[current];

  //check if deleting
  if (this.isDeleting) {
    // remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //add characater
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // interst txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // type speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // complete word?

  if (!this.isDeleting && this.txt === fullTxt) {
    //pauses at end
    typeSpeed = this.wait;
    //set delete true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // move to next word
    this.wordIndex++;
    //pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

//Init On Dom load

document.addEventListener("DOMContentLoaded", init);

//Init app

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  //init typewriter
  new TypeWriter(txtElement, words, wait);
}
