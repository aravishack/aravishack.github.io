//Global Vars
var lettersArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
window.addEventListener("load", mainCall);

function mainCall() {
  setTimeout(() => {
    document.getElementById("main-content").style.display = "block";
    document.getElementById("loader").style.display = "none";
    document.getElementsByTagName("body")[0].classList.add("loaded");
    letterShuffle();
  }, 2000);
  setTimeout(() => {
    aboutMe();
  }, 5000);
}

function letterShuffle() {
  var time = 0;
  $(".title-name")
    .find("span")
    .each(function(i) {
      var obj = $(this);
      setTimeout(function() {
        shuffleText(obj, obj.text(), 5, 1500);
      }, time);
      time = time + 100;
    });
}

function shuffleText(obj, letter, shuffles, frames) {
  var i = 0,
    loop = setInterval(function() {
      if (i++ < shuffles) {
        var random = Math.floor(Math.random() * (lettersArray.length + 1));
        obj.text(lettersArray[random]);
      } else {
        myClear(loop);
        for (var e = 0; e < lettersArray.length; e++) {
          if (letter == lettersArray[e]) {
            obj.text(lettersArray[e]);
            return false;
          }
        }
      }
    }, frames / shuffles);
}

function myClear(loop) {
  window.clearInterval(loop);
}

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

function aboutMe() {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000}";
  document.body.appendChild(css);
}
