const hamburgerMenu = document.querySelector("#hamburger-menu")
const mobileMenu = document.querySelector(".mobile-menu")
const header = document.querySelector("header")
let isMenuOpen = false;

hamburgerMenu.addEventListener("click", () => {
  if (isMenuOpen) {
    hamburgerMenu.textContent = "menu";
    mobileMenu.style.right = "-100%"
    header.style.position = "relative"
    enableScrolling()
    isMenuOpen = false;
  } else {
    hamburgerMenu.textContent = "close";
   header.style.position = "fixed"
    mobileMenu.style.right = "0"
    disableScrolling()
    isMenuOpen = true;
  }


});

function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}


const base_url = "http://localhost:3001";

///GET REQUEST RANGE

const getRange = document.querySelector(".range-cards");
const limit = 3
axios.get(`${base_url}/range`)
.then((res)=>{
    res.data.slice(0,limit).map((range) => {
        getRange.innerHTML += `
        <div class="card">
        <figure>
          <img
            src=${range.image}
            alt=""
          />
        </figure>
        <h4>${range.name}</h4>
        `
    })

    
})

///GET REQUEST RANGE
const getWorks = document.querySelector(".works-cards");

axios.get(`${base_url}/works`)
.then((res)=>{
    res.data.slice(0,limit).map((work) => {
        getWorks.innerHTML += `
        <div class="works-card">
              <figure>
                <img
                  class="main-img"
                  src=${work.image}
                  alt=""
                />
                <img class="group" src="../src/images/Group 109.png" alt="" />
              </figure>
              <div class="text">
                <h4>${work.name}</h4>
                <span
                  >${work.description}
                </span>
              </div>
            </div>
        `
    })

    
})