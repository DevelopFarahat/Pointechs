import translationsPromise from "../utils/translation.js";
import {setLanguage} from "../utils/translation.js";
import {changeFAQsStyles} from "./FAQs.js";
import {changeTermsAndConditionsStyles} from "./terms-and-conditions.js";
const linksArr = [
  { id: 0, href: "#home", data: "Home" },
  { id: 1, href: "#about-us", data: "About us" },
  { id: 2, href: "#our-features", data: "Our features" },
  { id: 3, href: "#why-us", data: "Why us?" },
  { id: 4, href: "#how-it-works", data: "How it works" },
  { id: 5, href: "#contact-us", data: "Contact us" },
];
const featuresArr = [
  {
    id: 0,
    title: "Digital Loyalty Cards",
    details: "feature_1",
    moreDetails: ["feature_1", "feature_1_detial_2", "feature_1_detial_3"],
  },
  {
    id: 1,
    title: "Points, Stamps, and Discount Coupons Programs",
    details: "feature_2",
    moreDetails: [
      "feature_2",
      "feature_2_details_2",
      "feature_2_details_3",
      "feature_2_details_4",
      "feature_2_details_5",
    ],
  },
  {
    id: 2,
    title: "Referral and New Customer Growth",
    details: "feature_3",
    moreDetails: ["feature_3", "feature_3_details_2"],
  },
  {
    id: 3,
    title: "Promotional Offers",
    details: "feature_4",
    moreDetails: [
      "With Pointechs you can publish your offers (e.g.  seasonal offers, new product launches, menu, promotions, etc.) to all Pointechs app users (Not only your customers) for maximum visibility and they will get notified for it.   ",
    ],
  },
  {
    id: 4,
    title: "Tiers Program",
    details: "feature_5",
    moreDetails: [
      "Pointechs Allow you to categorize your customers based on their spendings to know them well and to customize your loyalty program accordingly, all designed to increase your customers’ retention and satisfaction.",
    ],
  },
  {
    id: 5,
    title: "Customer Analytics",
    details: "feature_6",
    moreDetails: ["feature_6", "feature_6_details_2"],
  },
  {
    id: 6,
    title: "Business Information",
    details: "feature_7",
    moreDetails: [
      "Publish your business information, including contact numbers and your branches’ locations, to all app users.",
    ],
  },
  {
    id: 7,
    title: "Customer Feedback",
    details: "feature_8",
    moreDetails: ["feature_8", "feature_8_details_2"],
  },
];
let navLinks = document.querySelector("#navLinksCont");
let selectedLinkId = 0;
export const createNavbarLinks = () => {
  linksArr
    .map(
      (link) =>
        (navLinks.innerHTML += `<a href=${link.href} data-trans="${link.data}"   class='nav-link' id=${link.id}>${link.data}</a>`)
    )
    .join(" ");
  let navbarLinks = document.querySelectorAll("#navLinksCont > a");
  navbarLinks.forEach((navLink) => {
    navLink.addEventListener("click", (event) => {
      handleNavbarLinkSelected(event, navLink);
      handleNavbarCloseOnToogle();
      navbarLinks.forEach((nLink) => {
        nLink.id == selectedLinkId
          ? nLink.classList.add("activated-link")
          : nLink.classList.remove("activated-link");
      });
    });
  });
};

createNavbarLinks();

const handleNavbarLinkSelected = (event, nLink) => {
  event.preventDefault();
  selectedLinkId = nLink.id;
  let targetSectionId = nLink.getAttribute("href").substring(1);
  let targetSection = document.getElementById(targetSectionId);
  if (targetSection != null) {
    let newUrl = new URL(window.location.href);
    newUrl.searchParams.set('section', targetSectionId);
    history.pushState(null, "", newUrl.href);
  } else {
   let lang = new URL(window.location.href).searchParams.get('lang');
        window.location.href = `../index.html?lang=${lang}&section=${targetSectionId}`;
  }

  onHnadleScrollToTargetSection(targetSectionId);
  changeAppTitleOnUserSelectNavbarLink(selectedLinkId);
};
const onHnadleScrollToTargetSection = (sectionId) => {
  let targetSectionId = sectionId;
  let targetSection = document.getElementById(targetSectionId);
  targetSection.scrollIntoView({
    block: "start",
    inline: "start",
    behavior: "smooth",
  });
};
const highLightActivatedNavbarLink = (activatedNavLinkId) => {
  selectedLinkId = activatedNavLinkId;
  document.getElementById(activatedNavLinkId).classList.add("activated-link");
  
  
};
const changeAppTitleOnUserSelectNavbarLink = async(id,name)=>{
  if(translation == undefined)
  translation = await getTranslation();
  let lang = new URL(window.location.href).searchParams.get('lang');
  let titleName;
  if(id != undefined)
    titleName = linksArr[Number(id)].href.substring(1);
  let title = document.getElementsByTagName("title")[0];
  let newTitle = titleName != undefined?`Pointechs | ${titleName}`:name;
  title.setAttribute("data-trans",newTitle);
  title.innerHTML =  translation[lang][newTitle];
  let ogTitle = document.querySelector("[property='og:title']");
  let twitterTitle = document.querySelector("[name='twitter:title']");
  twitterTitle.setAttribute("data-trans",newTitle);
  ogTitle.setAttribute("data-trans",newTitle);
  
  if(featuresArr.includes(name)){
    let featureObjiId = new URL(window.location.href).searchParams.get('id');
    let searchEngineDescription = document.querySelector("[name='description']");
    let SchemaDotOrgDescription = document.querySelector("[itemprop='description']");
    let openGraphGeneralDescription = document.querySelector("[property='og:description']");
    let twitterDecription = document.querySelector("[name='twitter:description']");
    searchEngineDescription.setAttribute("data-trans",featuresArr[featureObjiId].moreDetails[0]);
    SchemaDotOrgDescription.setAttribute("data-trans",featuresArr[featureObjiId].moreDetails[0]);
    openGraphGeneralDescription.setAttribute("data-trans",featuresArr[featureObjiId].moreDetails[0]);
    twitterDecription.setAttribute("data-trans",featuresArr[featureObjiId].moreDetails[0]);
  }
}
document.addEventListener("DOMContentLoaded", async() => {
  let navLink
  let lang = new URL(window.location.href).searchParams.get('lang');
  const urlParams = new URLSearchParams(window.location.search);
  for (const [key, value] of urlParams) {
    if (key == "section") {
       navLink = document.querySelector(`[href="#${value}"]`);
      setTimeout(() => {
        onHnadleScrollToTargetSection(value);
        highLightActivatedNavbarLink(navLink.id);
        changeAppTitleOnUserSelectNavbarLink(navLink.id);
      }, 1000);
    }else if(key == 'feature'){
      let id = new URL(window.location.href).searchParams.get('id');
      let sectionId = new URL(window.location.href).searchParams.get('sec');
      navLink = document.querySelector(`[href="#${sectionId}"]`);
      setTimeout(()=>{
        onHnadleScrollToTargetSection(sectionId);
        highLightActivatedNavbarLink(navLink.id);
        changeAppTitleOnUserSelectNavbarLink(navLink.id);
        setTimeout(() => {
          $("#readMoreModal").modal("show");
          createReadmoreFeatures(id);
        },500);
      },1000);
    }else if (key == "status"){
      navLink = document.querySelector(`[href="#${value}"]`);
      
      createUrlFor_Signup_login_Popup(value);
      $(`#${value}`).modal("show");

    }
  }
  
 let categoryArr = [];

  getCountriesDialCode().then((data)=>{
    lang == 'en'?categoryArr = [{ id: 0, categoryName: "Restaurants" },{id:1,categoryName:"Cafes"}]:categoryArr = [{ id: 0, categoryName: "مطاعم" },{id:1,categoryName:"كافيهات"}];
    createPhoneSelectOptions(data);
    createCountryAndCategorySelectOptions(data,"name",".basic-select-countries-names");
    createCountryAndCategorySelectOptions(categoryArr,"categoryName",".basic-categories-select-names");
   })
 

  if (urlParams.size <= 1) highLightActivatedNavbarLink(0);
});
let pointechsLogoLink = document.querySelector("[href='#']");
const handleNavigationToTheRoot = (event) => {
  event.preventDefault();
  let lang = new URL(window.location.href).searchParams.get('lang');
  let path = window.location.pathname;
  let queryString = window.location.search.split('&')[0];
  let relativeUrl = path + queryString;
  let baseUrl = window.location.protocol + '//' + window.location.host+relativeUrl;
  let newUrl = new URL(baseUrl);
  if(path != "/index.html")
  window.location.href = window.location.protocol + '//' + window.location.host+`/index.html?lang=${lang}`;
  else{
    newUrl.searchParams.set('section', "home");
    history.pushState(null, "", newUrl.href);
  }
  selectedLinkId = 0;
  let navbarLinks = document.querySelectorAll("#navLinksCont > a");
  navbarLinks.forEach((nLink) => {
    nLink.id == selectedLinkId
      ? nLink.classList.add("activated-link")
      : nLink.classList.remove("activated-link");
  });
  onHnadleScrollToTargetSection("home");
  changeAppTitleOnUserSelectNavbarLink(0);
};
let navbar = document.querySelector(".navbar");
const handleDropShadowOnScroll = () => {
  if (window.scrollY >= 56) {
    navbar.classList.add("drop-shadow");
  } else if (window.scrollY < 56) {
    navbar.classList.remove("drop-shadow");
  }
};
window.addEventListener("scroll", handleDropShadowOnScroll);
pointechsLogoLink.addEventListener("click", handleNavigationToTheRoot);
// add bacdrop to navbar and collapse the navbar every time the use made an action on mobile and taplet screens
var navbarToggler = document.querySelector(".navbar-toggler");
var navbarCollapse = document.querySelector(".navbar-collapse");
document.addEventListener("DOMContentLoaded", function () {
  navbarToggler.addEventListener("click", function () {
    if (navbarCollapse.classList.contains("show")) {
      navbar.classList.remove("navbar-expanded");
      navbar.classList.remove("drop-shadow");
    } else {
      navbar.classList.add("navbar-expanded");
      navbar.classList.add("drop-shadow");
    }
  });
});
export const handleNavbarCloseOnToogle = () => {
  navbarCollapse.classList.remove("show");
};
let pointechsFeaturesSection = document.getElementById("pointechs-features");
const createPointechsFeatures = () => {
  try {
    featuresArr.map(
      (feature) =>
        (pointechsFeaturesSection.innerHTML += `
          <div  class="feature">
            <section>
              <div class="feature-icon-container">
                <img src='../assets/images/feature.svg' loading="lazy" alt="feature" />
              </div>
              <h6  data-trans="${feature.title}">
                ${feature.title}
              </h6>
              <p data-trans="${feature.details}">
              ${feature.details}
            </p>
            </section>
            <section>
            ${feature.moreDetails.length > 1 ? `<span  data-bs-toggle='modal' id=${feature.id} data-bs-target='#readMoreModal' data-trans="Read More....">Read More....</span>` : ""}</section>
          </div>`)
    ).join(" ");
   let readMores =  document.querySelectorAll("[data-bs-target='#readMoreModal']");
   readMores.forEach((rm)=>{
    let id = rm.getAttribute("id");
    rm.addEventListener('click',()=>createReadmoreFeatures(id));
   })            
  } catch (error) {
    console.log(error);
  }
};
let featuresList = document.getElementById("features-list-of-features");
let feature_read_more_title = document.getElementById("feature-read-more-title");
const createReadmoreFeatures = async(id)=>{
  getBackToTheRootOfThePage("onOpen");
  let featureObji = featuresArr[Number(id)];
  let lang = new URL(window.location.href).searchParams.get('lang');
  let newUrl = new URL(window.location.href);
  newUrl.searchParams.set('feature',featureObji.title);
  newUrl.searchParams.set('id',id);
  newUrl.searchParams.set('sec',"our-features");
  history.pushState(null, "", newUrl.href);
  let featureObjiId = new URL(window.location.href).searchParams.get('id');
  featureObji = featuresArr[Number(featureObjiId)];
  feature_read_more_title.innerHTML = featureObji.title;
  feature_read_more_title.setAttribute("data-trans",featureObji.title)
  featuresList.innerHTML = "";
  featureObji?.moreDetails.map((fDetails)=>(
  featuresList.innerHTML += `<li>
   <img src="/assets/images/dot.png" alt="dot_icon"/>
   <p data-trans="${fDetails}">
     ${fDetails}
   </p>
 </li>`
  ));
  changeAppTitleOnUserSelectNavbarLink(undefined,featureObji.title);
await  setLanguage(lang);
}
const onCloseReadMoreFeature = ()=>{
  getBackToTheRootOfThePage("onClose");
}
let readmoreClose = document.querySelector(".feature-modal-header > span");
try{
  readmoreClose.addEventListener('click',onCloseReadMoreFeature);
}catch(error){
  console.log(error);
}
createPointechsFeatures();
const howPointechsWorksStepsArr = [
  {
    id: 0,
    icon: "../assets/images/how-01.svg",
    step: "how-pointechs-works-p1",
  },
  {
    id: 1,
    icon: "../assets/images/how-02.svg",
    step: "how-pointechs-works-p2",
  },
  {
    id: 2,
    icon: "../assets/images/how-03.svg",
    step: "how-pointechs-works-p3",
  },
  {
    id: 3,
    icon: "../assets/images/how-04.svg",
    step: "how-pointechs-works-p4",
  },
  {
    id: 4,
    icon: "../assets/images/how-05.svg",
    step: "how-pointechs-works-p5",
  },
];
let howPointechsWorksSection = document.getElementById(
  "how-pointechs-works-steps-section"
);

const createHowPointechsWorksSteps = () => {
  try {
    howPointechsWorksStepsArr
      .map(
        (step) =>
          (howPointechsWorksSection.innerHTML += `
        <div>
        <div>
          <img
            src=${step.icon}
            loading="lazy"
            alt=${
              step.icon.substr(step.icon.lastIndexOf("/") + 1).split(".")[0]
            }
          />
        </div>
        <p data-trans="${step.step}">
          ${step.step}
        </p>
      </div>`)
      )
      .join(" ");
  } catch (error) {
    console.log(error);
  }
};
createHowPointechsWorksSteps();
let contactusData = {
  fullname: "",
  email: "",
  message: "",
};
let contactusDataErrors = {
  fullnameError: "",
  emailError: "",
  messageError: "",
};
const handleContactUsData = async(event) => {
  contactusData = {
    ...contactusData,
    [event.target.name]: event.target.value,
  };
  await handleContactusErrors(event.target.name, event.target.value);
  contactusErrorsMessages.forEach((errorMessage) => {
    errorMessage.innerHTML =
      contactusDataErrors[errorMessage.getAttribute("name")];
      errorMessage.setAttribute("data-trans",contactusDataErrors[errorMessage.getAttribute("name")])
  });
  contactusInputs.forEach((cInput) => {
    contactusDataErrors[cInput.getAttribute("name") + "Error"]
      ? cInput.classList.add("input-is-invalid-contactus")
      : cInput.classList.remove("input-is-invalid-contactus");
    cInput.value = contactusData[cInput.getAttribute("name")];
  });
};
const handleContactusErrors = async(field, value) => {
  let lang = new URL(window.location.href).searchParams.get('lang');
  if(translation == undefined)
  translation = await getTranslation();
  if (field == "fullname") {
    const fullnameRegx = /[a-z A-Z]{3,}\s*$/;
    contactusDataErrors = {
      ...contactusDataErrors,
      fullnameError:
        value.length == 0
          ?translation[lang]["fullname is required"]
          : fullnameRegx.test(value)
          ? ""
          : translation[lang]["Name must consist of only uppercase or lowercase letters"],
    };
  } else if (field == "email") {
    const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i;
    contactusDataErrors = {
      ...contactusDataErrors,
      emailError:
        value.length == 0
          ? translation[lang]["email is required"]
          : emailRegx.test(value)
          ? ""
          : translation[lang]["email address should have the format username@domain.com and should not contain any spaces or special characters other than . - _ +"],
    };
  } else {
    contactusDataErrors = {
      ...contactusDataErrors,
      messageError: value.length == 0 ? translation[lang]["message is Required"] : "",
    };
  }
};
let contactUsForm = document.querySelector(".contactus-form");
let contactusInputs = document.querySelectorAll(
  ".contactus-form > div > [data-name]"
);
let contactusErrorsMessages = document.querySelectorAll(
  ".contactus-form > div > small"
);
contactusInputs.forEach((input) => {
  input.addEventListener("keyup", handleContactUsData);
  input.addEventListener("blur", handleContactUsData);
});

const handleContactusSubmit = (event) => {
  event.preventDefault();
  for (let key in contactusData) {
    if (contactusData[key] == "") return;
  }

  for (let key in contactusDataErrors) {
    if (contactusDataErrors[key] != "") return;
  }
  console.log(contactusData);
  resetAllContactusFormCharacteristics();
};
contactUsForm.addEventListener("submit", handleContactusSubmit);
const resetAllContactusFormCharacteristics = ()=>{
   contactusData = {
    fullname: "",
    email: "",
    message: "",
  };
   contactusDataErrors = {
    fullnameError: "",
    emailError: "",
    messageError: "",
  };
  contactusErrorsMessages.forEach((errorMessage) => {
    errorMessage.innerHTML = '';
    errorMessage.setAttribute("data-trans","")
  });
  contactusInputs.forEach((cInput) => {
    cInput.classList.remove("input-is-invalid-contactus");
    cInput.value = "";
  });
}
//sign up modal
let signUpInputTypeObji = {
  tooglePassword: "password",
  toogleConfirmPassword: "password",
};
let passwordEyeSvgIconDivContainer = document.getElementById("pass");
let confirmPasswordEyeSvgIconDivContainer = document.getElementById("con-pass");
const handleInputType = (event) => {
  event.stopPropagation();
  let passwordInput = document.querySelector("[name='password']");
  let confirmPasswordInput = document.querySelector("[name='confirmPassword']");
  if (event.currentTarget.id == "pass") {
    if (signUpInputTypeObji.tooglePassword == "password") {
      signUpInputTypeObji = {
        ...signUpInputTypeObji,
        tooglePassword: "text",
      };
      passwordEyeSvgIconDivContainer.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-eye"
      viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>`
    } else {
      signUpInputTypeObji = {
        ...signUpInputTypeObji,
        tooglePassword: "password",
      };
      passwordEyeSvgIconDivContainer.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-eye-slash"
      viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
    </svg>`
    }

    passwordInput.setAttribute("type", signUpInputTypeObji.tooglePassword);
  } else {
    if(signUpInputTypeObji.toogleConfirmPassword == "password"){
      signUpInputTypeObji = {
        ...signUpInputTypeObji,
        toogleConfirmPassword: "text",
      }
      confirmPasswordEyeSvgIconDivContainer.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-eye"
      viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>`
    }else{
      signUpInputTypeObji = {
        ...signUpInputTypeObji,
        toogleConfirmPassword: "password",
      }
      confirmPasswordEyeSvgIconDivContainer.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-eye-slash"
      viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
    </svg>`
    }
    confirmPasswordInput.setAttribute(
      "type",
      signUpInputTypeObji.toogleConfirmPassword
    );
  }
};
passwordEyeSvgIconDivContainer.addEventListener('click',handleInputType);
confirmPasswordEyeSvgIconDivContainer.addEventListener('click',handleInputType);
let passwordSection = document.getElementById("pass-section-input-eye-cont");
let confirmPasswordSection = document.getElementById("con-pass-section-input-eye-cont");
let passAndConPassInputs = document.querySelectorAll("[tabindex] > input");
const focus = (event) => {
  if (event.target.id == "password") {
    passwordSection.style.cssText = "outline:1px solid #FEB247";
    
  } else {
    confirmPasswordSection.style.cssText = "outline:1px solid #FEB247";
  }
  
};
const blur = (event) => {
  if (event.target.id == "password") {
    passwordSection.style.cssText = "outline:none";
  } else {
    confirmPasswordSection.style.cssText = "outline:none";
  }
  
};
passAndConPassInputs.forEach((input)=>{
  input.addEventListener('focus',focus);
  input.addEventListener('blur',blur);
})


let countriesArr = [];
const getCountriesDialCode = async () => {
  let lang = new URL(window.location.href).searchParams.get('lang');
  const COUNTRIES_EN = "/assets/json/countries_en.json";
  const COUNTRIES_AR = "/assets/json/countries_ar.json";
  const response = await fetch(lang == 'en'?COUNTRIES_EN:COUNTRIES_AR);
  const data = await response.json();
  let countriesArr = [];
  for (let i = 0; i < data.length; i++) {
    let countryObji = {
      id: i,
      name: data[i].name,
      dialCode: data[i].dialCode,
      flag: data[i].flag
    };
    countriesArr.push(countryObji);
  }
  return countriesArr;
}
const createPhoneSelectOptions =  (countriesCodesArr)=>{
  $(".basic-select-phone-code").on("change", function() {
    var value = $(this).val();
    signupUserData = {
      ...signupUserData,
      dialCode:countriesCodesArr[value].dialCode
    }
  });
  
  $(".basic-select-phone-code").select2({
    data: countriesCodesArr,
    templateResult: function (option) {
      if (option) {
        var $result = $(document.createElement("div"));
        $result.className = "country-option";
        var $dialCode = $(document.createElement("span"));
        $dialCode.text(option.dialCode);
        $result.append("<img class='country-flag' src='" + option.flag + "' />",$dialCode);
        return $result;
      }
    },
    templateSelection: function (option) {
      var $result = $(document.createElement("div"));
      $result.className = "country-option";
      var $dialCode = $(document.createElement("span"));
      $dialCode.text(option.dialCode);
      $result.append("<img class='country-flag' src='" + option.flag + "' />",$dialCode);
      return $result;
    },
    minimumResultsForSearch: -1,
   
  });
$(".select2-selection").addClass("country-dialCode-select-combobox dialcode-country dialcode country-dialCode-select-combobox-ar dialcode-country-ar dialcode-ar");

}
const createCountryAndCategorySelectOptions = (countriesCodesArr,propertyName,selectOptionClassName)=>{
  $(selectOptionClassName).on("change", function() {
    var value = $(this).val();
    signupUserData = {
      ...signupUserData,
      [selectOptionClassName === '.basic-select-countries-names' ? 'countryName' : 'category']: selectOptionClassName === '.basic-select-countries-names'?countriesCodesArr[value].name:countriesCodesArr[value].categoryName
    }
  });
  
  $(selectOptionClassName).select2({
    data: countriesCodesArr,
    templateResult: function (option) {
      if (option) {
        var $result = $(document.createElement("div"));
        $result.className = "country-option";
        var $countryName = $(document.createElement("span"));
        $countryName.text(option[propertyName]);
        $result.append($countryName);
        return $result;
      }
    },
    templateSelection: function (option) {
      var $result = $(document.createElement("div"));
      $result.className = "country-option";
      var $countryName = $(document.createElement("span"));
      $countryName.text(option[propertyName]);
      $result.append($countryName);
      return $result;
    },
    minimumResultsForSearch: -1,
    width:'100%'
  });
}
let signupErrors = {
  fullnameError: "",
  emailError: "",
  dialCodeError: "",
  phoneError: "",
  passwordError: "",
  confirmPasswordError: "",
  countryNameError: "",
  categoryError: "",
  storeNameEnError: "",
  storeNameArError: "",
  termsOfServiceStatusError: "",
};
let signupUserData = {
  fullname: "",
  email: "",
  dialCode: "+20",
  phone: "",
  password: "",
  confirmPassword: "",
  countryName: "Egypt",
  category: "Restaurant",
  storeNameEn: "",
  storeNameAr: "",
  termsOfServiceStatus: false,
};
let signupPersonalInfoSmallErrorsMessages = document.querySelectorAll(".personal-info > div > small");
let signupAccountDetailsSmallErrorMessages = document.querySelectorAll(".account-details > div > small");
let phone_dialCode_cont_section = document.querySelector(".phone-input-select-section");
const handleSignupUserData =async (event) => {
  signupUserData = {
    ...signupUserData,
    [event.target.name]: event.target.value,
  };
  await signupErrorHandle(event.target.name, event.target.value);
  signupPersonalInfoSmallErrorsMessages.forEach((sm)=>{
    sm.innerHTML = signupErrors[sm.getAttribute("name")+"Error"];
    sm.setAttribute("data-trans",signupErrors[sm.getAttribute("name")+"Error"]);
  });
  signupAccountDetailsSmallErrorMessages.forEach((sm)=>{
    sm.innerHTML = signupErrors[sm.getAttribute("name")+"Error"];
    sm.setAttribute("data-trans",signupErrors[sm.getAttribute("name")+"Error"]);
  });
  signupFullnameAndEmailInputs.forEach((input)=>{
    signupErrors[input.getAttribute("name")+"Error"]?input.classList.add("input-is-invalid"):input.classList.remove("input-is-invalid");
    input.value = signupUserData[input.getAttribute("name")];
  });
  signupPasswordAndConfirmPasswordInputs.forEach((input)=>{
    input.value = signupUserData[input.getAttribute("name")];
    if(input.getAttribute("name") == "password")
      signupErrors[input.getAttribute("name")+"Error"]?passwordSection.classList.add("input-is-invalid"):passwordSection.classList.remove("input-is-invalid");
    else signupErrors[input.getAttribute("name")+"Error"]?confirmPasswordSection.classList.add("input-is-invalid"):confirmPasswordSection.classList.remove("input-is-invalid");
  });

  signupPhoneInput.value = signupUserData[signupPhoneInput.getAttribute("name")];
  signupErrors[signupPhoneInput.getAttribute("name")+"Error"]?phone_dialCode_cont_section.classList.add("input-is-invalid"):phone_dialCode_cont_section.classList.remove("input-is-invalid");
  signupStoreName_en_ar.forEach((input)=>{
    signupErrors[input.getAttribute("name")+"Error"]?input.classList.add("input-is-invalid"):input.classList.remove("input-is-invalid");
    input.value = signupUserData[input.getAttribute("name")];
  });
};
const getTranslation = async()=>{
  let translation = await translationsPromise;
  return translation;
}
const signupErrorHandle = async(field, value) => {
  let translation;
  let lang = new URL(window.location.href).searchParams.get('lang');
  if(translation == undefined)
  translation = await getTranslation();
  if (field == "fullname") {
    const fullnameRegx = /[a-z A-Z]{3,}\s*$/;
    signupErrors = {
      ...signupErrors,
      fullnameError:
      value.length == 0
        ? translation[lang]["fullname is required"]
        : fullnameRegx.test(value)
        ? ""
        : translation[lang]["Name must consist of only uppercase or lowercase letters"],
    }
  } else if (field == "email") {
    const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i;
    signupErrors = {
      ...signupErrors,
      emailError:
      value.length == 0
        ? translation[lang]["email is required"]
        : emailRegx.test(value)
        ? ""
        :translation[lang]["email address should have the format username@domain.com and should not contain any spaces or special characters other than . - _ +"]
    }
  } else if (field == "phone") {
    signupErrors = {
      ...signupErrors,
      phoneError:
      value.length == 0
        ? translation[lang]["phone number is required"]
        : value.length == 0 && userData.dialCode == ""
        ? translation[lang]["phone number with dial code is required"]
        : "",
    }
  } else if (field == "password") {
    const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    signupErrors = {
      ...signupErrors,
      passwordError:
        value.length == 0
          ?translation[lang]["password is required"]
          : passwordRegx.test(value)
          ? ""
          :translation[lang]["password must be a  Minimum eight characters, at least one letter and one number"]
    }
  } else if (field == "confirmPassword") {
    const confirmPasswordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    signupErrors = {
      ...signupErrors,
      confirmPasswordError:
      value.length == 0
        ?translation[lang]["confirm password is required"]
        : value != signupUserData.password
        ?translation[lang]["confirm password must equale to password"]
        : "",
    }
  } else if (field == "storeNameEn") {
    const storeNameEnRegx = /[a-z A-Z]{3,}\s*$/;
    signupErrors = {
      ...signupErrors,
      storeNameEnError:
      value.length == 0
        ?translation[lang]["store name is required in english"]
        : storeNameEnRegx.test(value)
        ? ""
        :translation[lang]["store name  must consist of only uppercase or lowercase letters"]
    }

  } else if (field == "storeNameAr") {
    const storeNameArRegx = /[\u0600-\u06FF\u0750-\u077F]/;
    signupErrors = {
      ...signupErrors,
      storeNameArError:
        value.length == 0
          ?translation[lang]["store name is required with arabic"]
          : storeNameArRegx.test(value)
          ? ""
          :translation[lang]["store name must be arabic"]
    }
  }
};
//personal Info form inputs
let signupFullnameAndEmailInputs = document.querySelectorAll(".personal-info > div > input");
let signupPasswordAndConfirmPasswordInputs = document.querySelectorAll(".pass-section > div > input");
let signupPhoneInput = document.getElementById("phone");
signupFullnameAndEmailInputs.forEach((input)=>{
  input.addEventListener('keyup',handleSignupUserData);
  input.addEventListener('blur',handleSignupUserData);
});
signupPasswordAndConfirmPasswordInputs.forEach((input)=>{
  input.addEventListener('keyup',handleSignupUserData);
  input.addEventListener('blur',handleSignupUserData);
})
signupPhoneInput.addEventListener('keyup',handleSignupUserData);
signupPhoneInput.addEventListener('blur',handleSignupUserData);
// account details
let signupStoreName_en_ar = document.querySelectorAll(".account-details > div > input:not([type='checkbox']");
signupStoreName_en_ar.forEach((input)=>{
  input.addEventListener('keyup',handleSignupUserData);
  input.addEventListener('blur',handleSignupUserData);
})
const handleTermsOfServiceStatus = (event) => {
  if (event.target.checked) {
    signupUserData = {
      ...signupUserData,
      termsOfServiceStatus: true
    }
  } else {
    signupUserData = {
      ...signupUserData,
      termsOfServiceStatus: false
    }
  }
};
let termsAndConditionsCheckbox = document.querySelector("input[type='checkbox']");
termsAndConditionsCheckbox.addEventListener('click',handleTermsOfServiceStatus);
let signupSubmitBtn = document.querySelector(".continue-btn");
let signupPersonalInfoStep = document.querySelector(".personal-info");
let signupAccountDetails = document.querySelector(".account-details");
let accountDetailsHeader = document.querySelector("#accountDetails");
let personalInfoHeader = document.querySelector("#personalInfo");
let signupFormActiveTaps = {
  personalInfoTapVisible: true,
  accountDetailsTapVisible: false,
}
signupAccountDetails.style.display = "none";
personalInfoHeader.className = " active-tap";
const handleSignupSubmit = (event) => {
  let lang = new URL(window.location.href).searchParams.get('lang');
  event.preventDefault();
  if (signupFormActiveTaps.personalInfoTapVisible) {
    for (let key of Object.keys(signupUserData).splice(0, 6)) {
      if (signupUserData[key] == "") return;
    }
    for (let key of Object.keys(signupErrors).slice(0, 6)) {
      if (signupErrors[key] != "") return;
    }
    signupFormActiveTaps = {
      personalInfoTapVisible: false,
      accountDetailsTapVisible: true,
    }
    signupAccountDetails.style.display = "flex";
    signupPersonalInfoStep.style.display = "none";
    if(lang == "en"){
      signupSubmitBtn.innerHTML = 'Sign Up';
      signupSubmitBtn.setAttribute("data-trans","Sign Up");
    }else{
      signupSubmitBtn.innerHTML = 'اشترك';
      signupSubmitBtn.setAttribute("data-trans","اشترك");
    }
    personalInfoHeader.classList.remove("active-tap");
    accountDetailsHeader.classList.add("active-tap");
  } else {
    for (let key in signupUserData) {
      if (signupUserData[key] == " ") return;
    }
    for (let key in signupErrors) {
      if (signupErrors[key] != "") return;
    }
    console.log(signupUserData);
    resetAllTheSignupFormCharacteristics();
    navigateToLoginOrSignupForm("signinModal","Log in");
    $('#signupModal').modal('hide');
    $('#signinModal').modal('show');
  }
};
let signup_signinLink = document.getElementById("signinLink");
const navigateToLoginOrSignupForm = (formDodal,title)=>{
  let url =  window.location.protocol + '//' + window.location.host+`/index.html?lang=${lang}&status=${formDodal}`;
  window.history.pushState({}, '', url);
  changeAppTitleOnUserSelectNavbarLink(undefined,title);
}
signup_signinLink.addEventListener('click',(event)=>{
  event.preventDefault();
  navigateToLoginOrSignupForm("signinModal","Log in")
});
signupSubmitBtn.addEventListener('click',handleSignupSubmit);
const handleAccessibilityOfAccountDetails = ()=>{
  if(  signupUserData.fullname == "" ||
  signupUserData.email == "" ||
  signupUserData.phone == "" ||
  signupUserData.password == "" ||
  signupUserData.confirmPassword == "" ||
  signupErrors.fullnameError != "" ||
  signupErrors.emailError != "" ||
  signupErrors.phoneError != "" ||
  signupErrors.passwordError != "" ||
  signupErrors.confirmPasswordError != ""){
    accountDetailsHeader.style.cursor = "not-allowed";
  }else{
    accountDetailsHeader.style.cursor = "text";
  }
}
const handleNavigationBetweenSignupSteps = (event)=>{
  for (let key of Object.keys(signupUserData).splice(0, 6)) {
    if (signupUserData[key] == "") return;
  }
  for (let key of Object.keys(signupErrors).slice(0, 6)) {
    if (signupErrors[key] != "") return;
  }
  if(event.target.id == "personalInfo"){
    signupFormActiveTaps = {
      personalInfoTapVisible: true,
      accountDetailsTapVisible: false,
    }
    accountDetailsHeader.classList.remove("active-tap");
    personalInfoHeader.classList.add("active-tap");
    signupAccountDetails.style.display = "none";
    signupPersonalInfoStep.style.display = "flex";
  }else{
    signupFormActiveTaps = {
      personalInfoTapVisible: false,
      accountDetailsTapVisible: true,
    }
    accountDetailsHeader.classList.add("active-tap");
    personalInfoHeader.classList.remove("active-tap");
    signupAccountDetails.style.display = "flex";
    signupPersonalInfoStep.style.display = "none";
  }
}
accountDetailsHeader.addEventListener('mouseover',handleAccessibilityOfAccountDetails);
accountDetailsHeader.addEventListener('click',handleNavigationBetweenSignupSteps);
personalInfoHeader.addEventListener('click',handleNavigationBetweenSignupSteps);
let signupCloseBtn = document.querySelector("#sign-up-close");
const resetAllTheSignupFormCharacteristics= ()=>{
  getBackToTheRootOfThePage("onClose");
  signupFullnameAndEmailInputs.forEach((input)=>{
    input.value = "";
    input.classList.remove("input-is-invalid");
  });
  signupPasswordAndConfirmPasswordInputs.forEach((input)=>{
    input.value = "";
  });
  signupPhoneInput.value = "";
  signupStoreName_en_ar.forEach((input)=>{
    input.value = "";
    input.classList.remove("input-is-invalid");
  });
  signupPersonalInfoSmallErrorsMessages.forEach((sm)=>{
    sm.innerHTML = "";
    sm.setAttribute("data-trans","");
  });
  signupAccountDetailsSmallErrorMessages.forEach((sm)=>{
    sm.innerHTML = "";
    sm.setAttribute("data-trans","");
  });
  phone_dialCode_cont_section.classList.remove("input-is-invalid");
  passwordSection.classList.remove("input-is-invalid");
  confirmPasswordSection.classList.remove("input-is-invalid");
  signupUserData = {
    fullname: "",
    email: "",
    dialCode: "+20",
    phone: "",
    password: "",
    confirmPassword: "",
    countryName: "Egypt",
    category: "Restaurant",
    storeNameEn: "",
    storeNameAr: "",
    termsOfServiceStatus: false,
  }
  signupErrors = {
    fullnameError: "",
    emailError: "",
    dialCodeError: "",
    phoneError: "",
    passwordError: "",
    confirmPasswordError: "",
    countryNameError: "",
    categoryError: "",
    storeNameEnError: "",
    storeNameArError: "",
    termsOfServiceStatusError: "",
  }
  signupAccountDetails.style.display = "none";
  signupPersonalInfoStep.style.display = "flex";
  signupFormActiveTaps = {
    personalInfoTapVisible: true,
    accountDetailsTapVisible: false,
  }
  accountDetailsHeader.classList.remove("active-tap");
  personalInfoHeader.classList.add("active-tap");
  if(lang == "en"){
    signupSubmitBtn.innerHTML = 'Continue';
    signupSubmitBtn.setAttribute("data-trans","Continue");
  }else{
    signupSubmitBtn.innerHTML = 'Continue';
    signupSubmitBtn.setAttribute("data-trans","Continue");
  }
}
signupCloseBtn.addEventListener('click',resetAllTheSignupFormCharacteristics);
//let signupNavbarBtn = document.getElementById("signup-btn");
let signupBtns = document.querySelectorAll("button[data-bs-target='#signupModal']");
signupBtns.forEach((signup_btn)=>{
  signup_btn.addEventListener('click',()=>createUrlFor_Signup_login_Popup("signupModal"));
})
const createUrlFor_Signup_login_Popup = (popupFormName)=>{
  getBackToTheRootOfThePage("onOpen");
  let newUrl = new URL(window.location.href);
  newUrl.searchParams.set('status', popupFormName);
  history.pushState(null, "", newUrl.href);
  let title = popupFormName == 'signupModal'?'Sign Up title':'Sign In';
  changeAppTitleOnUserSelectNavbarLink(undefined,title);
  detectLangForSignupSelectData();
  handleNavbarCloseOnToogle();
}
/* new added*/
const detectLangForSignupSelectData = async ()=>{
  let lang = new URL(window.location.href).searchParams.get('lang');
  let categoryArr = [];
  getCountriesDialCode().then((data)=>{
    lang == 'en'?categoryArr = [{ id: 0, categoryName: "Restaurants" },{id:1,categoryName:"Cafes"}]:categoryArr = [{ id: 0, categoryName: "مطاعم" },{id:1,categoryName:"كافيهات"}];
    createPhoneSelectOptions(data);
    createCountryAndCategorySelectOptions(data,"name",".basic-select-countries-names");
    createCountryAndCategorySelectOptions(categoryArr,"categoryName",".basic-categories-select-names");
   })
}
//signupNavbarBtn.addEventListener('click',()=>createUrlFor_Signup_login_Popup("signupModal"));
//login in form
let loginUserData = {
  email: "",
  password: "",
}
let loginErrors = {
  emailError: "",
  passwordError: "",
}
let loginTooglePassword = "password";
let login_pass_text_type_input = document.getElementById("password-login");
let login_pass_eye_section = document.querySelector("#password-login+div");
let loginEmail = document.getElementById("email-login");
let loginEmailErrorsMessage = document.querySelector(".login-form > div > small");
let loginPasswordErrorMessage = document.querySelector("#login-password-error-message");
let loginPassSection = document.querySelector("#pass-login-section-cont");
let loginBtn = document.querySelector("#login-form-login-btn");
const handleToogleLoginInputType = ()=>{
  if(loginTooglePassword == "password"){
    loginTooglePassword = "text";
    login_pass_text_type_input.setAttribute("type",loginTooglePassword);
    login_pass_eye_section.innerHTML =`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-eye"
    viewBox="0 0 16 16">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
  </svg>`;
  }else{
    loginTooglePassword = "password";
    login_pass_text_type_input.setAttribute("type",loginTooglePassword);
    login_pass_eye_section.innerHTML =`  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-eye-slash"
    viewBox="0 0 16 16">
    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
  </svg>`;
  }
}
login_pass_eye_section.addEventListener('click',handleToogleLoginInputType);
let translation;
const handleLoginUserData = async(event) => {
  loginUserData = {
    ...loginUserData,
    [event.target.name]: event.target.value
  }
await  handleLoginError(event.target.name, event.target.value);
  login_pass_text_type_input.value = loginUserData[login_pass_text_type_input.getAttribute("name")];
  loginEmail.value = loginUserData[loginEmail.getAttribute("name")];
  loginEmailErrorsMessage.setAttribute("data-trans",loginErrors[loginEmailErrorsMessage.getAttribute("name")+"Error"]);
  loginPasswordErrorMessage.setAttribute("data-trans",loginErrors[loginPasswordErrorMessage.getAttribute("name")+"Error"]);
  loginEmailErrorsMessage.innerHTML = loginErrors[loginEmailErrorsMessage.getAttribute("name")+"Error"];
  loginPasswordErrorMessage.innerHTML = loginErrors[loginPasswordErrorMessage.getAttribute("name")+"Error"];
  loginErrors[login_pass_text_type_input.getAttribute("name")+"Error"]?loginPassSection.classList.add("input-is-invalid"):loginPassSection.classList.remove("input-is-invalid");
  loginErrors[loginEmail.getAttribute("name")+"Error"]?loginEmail.classList.add("input-is-invalid"):loginEmail.classList.remove("input-is-invalid");
};
const handleLoginError = async(field, value) => {
  let lang = new URL(window.location.href).searchParams.get('lang');
  let translation;
  if(translation == undefined)
    translation = await getTranslation();
  if (field == "email") {
    const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i;
    loginErrors = {
      ...loginErrors,
      emailError:
      value.length == 0
        ?translation[lang]["email is required"]
        :emailRegx.test(value)
        ? ""
        :translation[lang]["email address should have the format username@domain.com and should not contain any spaces or special characters other than . - _ +"]
    }
  } else {
    const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    loginErrors = {
      ...loginErrors,
      passwordError:
        value.length == 0
          ?translation[lang]["password is required"]
          : passwordRegx.test(value)
          ? ""
          :translation[lang]["password must be a  Minimum eight characters, at least one letter and one number"]
    }
  }
};
login_pass_text_type_input.addEventListener('blur',handleLoginUserData);
login_pass_text_type_input.addEventListener('keyup',handleLoginUserData);
loginEmail.addEventListener('blur',handleLoginUserData);
loginEmail.addEventListener('keyup',handleLoginUserData);
const handleLoginSubmit = (event) => {
  event.preventDefault();
  for (let key in loginUserData) {
    if (loginUserData[key] == "") return;
  }
  for (let key in loginErrors) {
    if (loginErrors[key] != "") return;
  }

  console.log(loginUserData);
  resetAllLoginFormCharacteristics();
  getBackToTheRootOfThePage("onClose");
   $("#signinModal").modal("hide");
};
let signin_signupLink = document.getElementById("signupLink");
signin_signupLink.addEventListener('click',(event)=>{
  event.preventDefault();
  navigateToLoginOrSignupForm("signupModal","Sign Up title");
});
loginBtn.addEventListener('click',handleLoginSubmit);
let loginFormClose = document.querySelector("#login-close");
const resetAllLoginFormCharacteristics = ()=>{
  getBackToTheRootOfThePage("onClose");
   loginUserData = {
    email: "",
    password: "",
  }
   loginErrors = {
    emailError: "",
    passwordError: "",
  }
  loginEmailErrorsMessage.innerHTML = "";
  loginPasswordErrorMessage.innerHTML = "";
  loginEmail.value = "";
  login_pass_text_type_input.value = "";
  loginPassSection.classList.remove("input-is-invalid");
  loginEmail.classList.remove("input-is-invalid");
}
loginFormClose.addEventListener('click',resetAllLoginFormCharacteristics);
let loginNavbarBtn = document.getElementById("login-btn");
loginNavbarBtn.addEventListener('click',()=>createUrlFor_Signup_login_Popup("signinModal"));
let originalUrl;
const getBackToTheRootOfThePage = (useCase)=>{
  if(useCase == "onOpen"){
    originalUrl = window.location.href;
    let path = window.location.pathname;
    let queryString = window.location.search.split('&')[0];
    let relativeUrl = path + queryString;
    let baseUrl = window.location.protocol + '//' + window.location.host;
    let newUrl = baseUrl + relativeUrl;
    window.history.pushState({}, '', newUrl);
  }else{
    window.history.pushState({}, '', originalUrl);
  }
  getBackToTheOriginalTitle(useCase);
}
let originTitle;
const getBackToTheOriginalTitle = (useCase)=>{
  if(useCase == "onOpen"){
    originTitle = document.getElementsByTagName("title")[0].getAttribute("data-trans");
    
  }else{
    changeAppTitleOnUserSelectNavbarLink(undefined,originTitle);
  }
}
/* customization style for arabic version */
  let lang;

  export const changeApplicationStylesOnUserRequestOrChnageLang = ()=>{
    lang = new URL(window.location.href).searchParams.get('lang');
    try{
      changeHomeComponentStyles(lang);
      changeAboutComponentStyles(lang);
      changeFeaturesComponentStyles(lang);
      changeWhyComponentStyles(lang);
      changeHowItWorksComponentStyles(lang);
      changePointechsAppComponentStyles(lang);
      changeFeaturePopupStyles(lang);
    }catch(error){
    console.log(error);
    }
    try{
      changeFAQsStyles(lang);
    }catch(error){
      console.log(error);
    }
    try{
      changeTermsAndConditionsStyles(lang);
    }catch(error){
      console.log(error);
    }
    changeContactusComponentStyles(lang);
    changeFooterStyles(lang);
    changeSignupStyles(lang);
    changeLoginStyles(lang);
  }
  
  const changeHomeComponentStyles = (lang)=>{
  let homeComponent = document.getElementById("home");
  lang == 'ar'?homeComponent.classList.add("pointechs-home-ar"):homeComponent.classList.remove("pointechs-home-ar");
  let homeComponentParagraph = document.querySelectorAll(".pointchs-home > div > div > p");
  lang == 'ar'?homeComponentParagraph[0].innerHTML = `طوّر أعمالك
  <br/> مع <span>برنامج بوينتكس</span>`: homeComponentParagraph[0].innerHTML = `GROW YOUR BUSINESS
  <br/>
  WITH <span>POINTECHS</span>`;
  lang == 'ar'?homeComponentParagraph[1].innerHTML = `أسهل طريقة لمكافأةعملائك`:homeComponentParagraph[1].innerHTML = `The Easiest Way to Reward
  <br />
  Your Customers`;
}
 const changeAboutComponentStyles = (lang)=>{
  let aboutComponentParagraphsSection = document.querySelector(".welcom-pointechs");
  lang == 'ar'?aboutComponentParagraphsSection.style.direction = `rtl`:aboutComponentParagraphsSection.style.direction = `ltr`;
  let aboutComponentParagraph_Poster_section = document.querySelector(".pointechs-welcome > div");
  lang == 'ar'?aboutComponentParagraph_Poster_section.style.direction = `ltr`:aboutComponentParagraph_Poster_section.style.direction = `rtl`;
  let aboutComponentParagraph = document.querySelector(".welcom-pointechs >section:nth-child(2)");
  lang == 'ar'?aboutComponentParagraph.innerHTML = `<p
  style="
  text-align: ${lang == "en" ? "left" : "right"};
  font-size: ${lang == "en" ? "1.1rem" : "1.3rem"};">
  الحل الأمثل والمتكامل لإدارة الولاء للمتاجر والشركات. تم تصميم
  منصتنا المبتكرة لمساعدتك فى بناء علاقات طويلة الأمد مع عملائك،
  وزيادة مبيعاتك، ومضاعفة ارباحك.
  </p>`:aboutComponentParagraph.innerHTML = `<p>
  The ultimate loyalty program solution for businesses of all
  sizes. Our innovative platform is designed to help you build
  long-lasting relationships with your customers, increase sales,
  and drive sustainable growth.
  </p>
  <p>
  Our platform is designed to build a relationship between
  merchants and their customers by providing a portal that allows
  merchants to track their loyalty program, as well as a mobile
  app for customers to view their points and redeem them in
  real-time.
  </p>
  <p>
  The portal features a loyalty dashboard that merchants can use
  to track customer engagement, redemption rates, and overall
  business growth.
  </p>`;
}
const changeFeaturesComponentStyles = (lang)=>{
  let featureTitle = document.querySelectorAll(".feature > section > h6");
  featureTitle.forEach((featureT)=>{
    lang == 'en'?featureT.style.textAlign = 'left':featureT.style.textAlign = 'right';
  })
  let featureParagraphs = document.querySelectorAll(".feature > section > h6 + p");
  featureParagraphs.forEach((f)=>{
    lang == 'en'?f.style.cssText  = `text-align:left;font-size:1rem`:f.style.cssText  = `text-align:right;font-size:1.1rem`;
  })
  let readMoreSections = document.querySelectorAll(".feature > section:nth-of-type(2)");
  readMoreSections.forEach((readMSection)=>{
    lang == 'en'?readMSection.style.justifyContent = 'end':readMSection.style.justifyContent = 'start';
  })
  
}
const changeWhyComponentStyles = (lang)=>{
  let whyComponentParagraphs = document.querySelectorAll(".why-pointechs > main > section > div >p");
  whyComponentParagraphs.forEach((whyP)=>{
    lang == 'en'?whyP.style.textAlign = 'left':whyP.style.textAlign = 'right';
  })
  let joinSection = document.querySelector(".why-pointechs > main + section > main > p");
  lang == 'en'?joinSection.style.textAlign = 'left':joinSection.style.textAlign = 'right';
}
const changeHowItWorksComponentStyles = (lang)=>{
  let howItWorksParagraphs = document.querySelectorAll(".how-pointechs-works > main > div:nth-child(2) > section:nth-child(2) > div > p");
  howItWorksParagraphs.forEach((howItWorksP)=>{
    lang == 'en'?howItWorksP.style.textAlign = 'left':howItWorksP.style.textAlign = 'right';
  })
}
const changePointechsAppComponentStyles = (lang)=>{
  let pointechsAppComponentParagraph = document.querySelector(".pointechs-app > main > section > div > section:nth-child(2) > p");
  lang == 'en'?pointechsAppComponentParagraph.style.textAlign = 'left':pointechsAppComponentParagraph.style.textAlign = 'right';
}
const changeContactusComponentStyles = (lang)=>{
  let contactusImageSection = document.querySelector(".pointechs-contactus > main > section:last-of-type");
  lang == 'en'?contactusImageSection.style.left = '50%':contactusImageSection.style.left = '0';
}
const changeFooterStyles = (lang)=>{
  let footerParagraph = document.querySelector(".pointechs-footer > main > section > p");
  lang == 'en'?footerParagraph.style.textAlign = 'left':footerParagraph.style.textAlign = 'right';
  let locationLink = document.getElementById("footer-location-link");
  lang == 'en'?locationLink.style.textAlign = 'left':locationLink.style.textAlign = 'right';
  let footerExtraDetails = document.querySelector(".pointechs-footer-extra-details");
  lang == 'en'?footerExtraDetails.style.direction = 'ltr':footerExtraDetails.style.direction = 'rtl';
  let footerAllRightReserved = document.querySelector("[data-trans='Pointechs. All rights reserved']");
  footerAllRightReserved.innerHTML+= " "+ new Date().getFullYear();
}
const changeSignupStyles = (lang)=>{
  let signupFormContainer = document.querySelector(".signup-form-container");
  lang == 'en'?signupFormContainer.style.direction = 'ltr':signupFormContainer.style.direction = 'rtl';
  let loginFormCloseContainer = document.querySelector(".signup-form-container > div:nth-child(1)");
  lang == 'en'?loginFormCloseContainer.style.justifyContent = 'flex-end':loginFormCloseContainer.style.justifyContent = 'flex-start';
  let termsAndServicesLabel = document.querySelector("[for='termsOfServiceStatus']");
  lang == 'en'?termsAndServicesLabel.style.textAlign = 'left':termsAndServicesLabel.style.textAlign = 'right';
  let dialCodeSelect = document.querySelector(".select2-selection--single");
  if(lang == "en"){
  //  dialCodeSelect.classList.add("country-dialCode-select-combobox", "dialcode-country", "dialcode");
    dialCodeSelect.classList.remove("country-dialCode-select-combobox-ar", "dialcode-country-ar", "dialcode-ar");
  }else{
    dialCodeSelect.classList.add("country-dialCode-select-combobox-ar", "dialcode-country-ar", "dialcode-ar");
    //dialCodeSelect.classList.remove("country-dialCode-select-combobox", "dialcode-country", "dialcode");
  }
  let phoneInput = document.getElementById("phone");
  lang == "en"?(phoneInput.style.cssText = `border-top-left-radius:0;border-bottom-left-radius:0`):(phoneInput.style.cssText = `border-top-right-radius:0;border-bottom-right-radius:0`);
  let selectInputs = document.querySelectorAll(".select2-selection");
  selectInputs.forEach((selectInput)=>{
    lang == "en"?selectInput.style.textAlign = 'left':selectInput.style.textAlign = 'right';
  })
  lang == 'en'?personalInfoHeader.style.textAlign = 'left':personalInfoHeader.style.textAlign = 'right';
  lang == 'en'?accountDetailsHeader.style.textAlign = 'left':accountDetailsHeader.style.textAlign = 'right';
}
const changeLoginStyles = (lang)=>{
  let loginFormSection = document.querySelector(".login-body-modal > section + section");
  lang == "en"?loginFormSection.style.direction = 'ltr':loginFormSection.style.direction = 'rtl';
  let loginCloseSection = document.querySelector(".login-body-modal > section + section > div:nth-child(1)");
  lang == "en"?loginCloseSection.style.justifyContent = 'flex-end':loginCloseSection.style.justifyContent = 'flex-start';
  lang == "en"?loginEmailErrorsMessage.style.textAlign = 'left':loginEmailErrorsMessage.style.textAlign = 'right';
  lang == 'en'?loginPasswordErrorMessage.style.textAlign = 'left':loginPasswordErrorMessage.style.textAlign = 'right';
}
const changeFeaturePopupStyles = (lang)=>{
  let featureReadMoreModal = document.querySelector(".feature-readmore-modal");
  lang == 'en'?featureReadMoreModal.style.direction = 'ltr':featureReadMoreModal.style.direction = 'rtl';
  let readMoreParagraphs = document.querySelectorAll(".feature-readmore-modal > section:nth-child(2) > ul >li >p");
  readMoreParagraphs.forEach(readMoreP=>{
   lang == 'en'? readMoreP.style.textAlign = 'left':readMoreP.style.textAlign = 'right';
  })
}









