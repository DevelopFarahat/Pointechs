import {handleNavbarCloseOnToogle} from "../js/main.js";
import {changeApplicationStylesOnUserRequestOrChnageLang} from "../js/main.js";
async function fetchData() {
  try {
    const [response1, response2] = await Promise.all([
      fetch("../utils/locals/en.json"),
      fetch("../utils/locals/ar.json"),
    ]);

    const dataEn = await response1.json();
    const translationEN = dataEn;
    const dataAr = await response2.json();
    const translationAR = dataAr;

    return {
      en: translationEN,
      ar: translationAR,
    };
  } catch (error) {
    // handle error
  }
}

const translationsPromise = fetchData();

let translationBtn = document.querySelector(".btn-lang");
let translationBtnSpan = document.querySelector(".btn-lang > span");
let app = document.querySelector(".app");

translationBtn.addEventListener("click", async () => {
  let preferredLanguage = localStorage.getItem("lang");
  let lang = preferredLanguage != undefined ? preferredLanguage : "en";
  let language = lang == "en" ? "ar" : "en";
  localStorage.setItem("lang", language);
  translationBtnSpan.innerHTML = language == "en" ? "العربية" : "En";
  await setLanguage(language);
 
});

window.addEventListener("DOMContentLoaded", async () => {
  document.body.style.overflow = "hidden";
  setTimeout(async () => {
    let backdropWaiting = document.querySelector(".backdrop-waiting");
    if (backdropWaiting != undefined) app.removeChild(backdropWaiting);
    document.body.style.overflow = "auto";
  }, 1000);
  let lang = new URL(window.location.href).searchParams.get('lang');
  let language =
    localStorage.getItem("lang") == undefined
      ? lang
      : localStorage.getItem("lang");
      
  translationBtnSpan.innerHTML = language == "en" ? "العربية" : "En";
  await setLanguage(language);
  
});

export const setLanguage = async (lang) => {
  const trans = await fetchData();
  let elements = document.querySelectorAll("[data-trans]");
  elements.forEach((elem) => {
    let translationKey = elem.getAttribute("data-trans");
    elem.textContent = trans[lang][translationKey];
  });
  // update the URL with the new language parameter
  let newUrl = new URL(window.location.href);
  newUrl.searchParams.set('lang', lang);
  history.pushState(null, "", newUrl.href);
  document.dir = lang == "en" ? "ltr" : "rtl";
  try{
    changeApplicationStylesOnUserRequestOrChnageLang();
  }catch(error){
    console.log(error);
  }
  // chnage the direction of all buttons depends on the lang
 let buttons =  document.querySelectorAll("button");
    buttons.forEach((btn)=>{
  lang == 'ar'?btn.style.direction = 'ltr':btn.style.direction = 'ltr';
 });
  handleNavbarCloseOnToogle();
};


export default translationsPromise;




