import { createNavbarLinks } from "./main.js";

const privacyPolicy = [
  {
    id: 0,
    header: "privacy_1",
    details: [
      {
        point: "privacy_1_header_1",
        moreDetails: [
          "privacy_1_header_1_detail_1",
          "privacy_1_header_1_detail_2",
          "privacy_1_header_1_detail_3",
          "privacy_1_header_1_detail_4",
          "privacy_1_header_1_detail_5",
        ],
      },
      {
        point: "privacy_1_header_2",
        moreDetails: [
          "privacy_1_header_2_detail_1",
          "privacy_1_header_2_detail_2",
          "privacy_1_header_2_detail_3",
          "privacy_1_header_2_detail_4",
        ],
      },
    ],
  },
  {
    id: 1,
    header: "privacy_2",
    details: [
      {
        point: "privacy_2_header_1",
        moreDetails: [
          "privacy_2_header_1_detail_1",
          "privacy_2_header_1_detail_2",
          "privacy_2_header_1_detail_3",
          "privacy_2_header_1_detail_4",
          "privacy_2_header_1_detail_5",
        ],
      },
      {
        point: "privacy_2_header_2",
        moreDetails: [
          "privacy_2_header_2_detail_1",
          "privacy_2_header_2_detail_2",
          "privacy_2_header_2_detail_3",
          "privacy_2_header_2_detail_4",
          "privacy_2_header_2_detail_5",
        ],
      },
    ],
  },
  {
    id: 2,
    header: "privacy_3",
    details: [
      { point: "privacy_3_header_1", detail: "privacy_3_header_1_detail_1" },
      { point: "privacy_3_header_2", detail: "privacy_3_header_2_detail_1" },
    ],
  },
  {
    id: 3,
    header: "privacy_4",
    details: "privacy_4_detail",
  },
  {
    id: 4,
    header: "privacy_5",
    details: [
      { point: "privacy_5_header_1", detail: "privacy_5_header_1_detail_1" },
      { point: "privacy_5_header_2", detail: "privacy_5_header_2_detail_1" },
    ],
  },
  {
    id: 5,
    header: "privacy_6",
    details: "privacy_6_detail",
  },
];

let highlightedPrivacyPolicy = document.querySelector(".highlighted-privacy-policy");
const createPrivacyPolicy = ()=>{
    privacyPolicy.map((privacy)=>(
        highlightedPrivacyPolicy.innerHTML += `<li><h3 data-trans="${privacy.header}"></h3>${Array.isArray(privacy.details)?`<ul>
            ${privacy.details.map((details)=>(`<li><span data-trans="${details.point}" style="font-weight:600"></span>${details.moreDetails != undefined?`<ul class="privacy-policy-ul">
            ${details.moreDetails.map((moreD)=>`<li data-trans="${moreD}"></li>`).join(" ")}
            </ul>`:`<p data-trans="${details.detail}"></p>`}</li>`)).join(" ")}
        </ul>`:`<p data-trans="${privacy.details}"></p>`}</li>`
    )).join(" ");
}

try{
    createPrivacyPolicy();
}catch(error){
    console.log(error);
}
export const changePrivacyPolicyStyles = (lang)=>{
    let ol = document.getElementsByTagName("ol")[0];
    lang == 'en'?ol.classList.remove("ol-ar"):ol.classList.add("ol-ar");
    let privacy_policy_list = document.querySelectorAll(".privacy-policy-ul");
    privacy_policy_list.forEach((list)=>{
        lang == 'en'?list.style.marginRight = '0':list.style.marginRight = '50px';
    })
    
  }
