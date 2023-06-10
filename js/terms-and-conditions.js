import { createNavbarLinks } from "./main.js";
/*
const highlightTermsArr = [
    {id:0,highlightTerm:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    {id:1,highlightTerm:'Libero justo laoreet sit amet.'},
    {id:2,highlightTerm:'Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus.'},
    {id:3,highlightTerm:'Auctor neque vitae tempus quam pellentesque nec.'},
    {id:4,highlightTerm:'Cras adipiscing enim eu turpis egestas pretium aenean.'}
  ]
  */
const highlightTermsArr = [
  {
    id: 0,
    header: "terms_and_conditions_header_1",
    details: [
      { point: "terms1_explanation_1" },
      { point: "terms1_explanation_2" },
    ],
  },
  {
    id: 1,
    header: "terms_and_conditions_header_2",
    details: [
      { point: "terms2_explanation_1" },
      { point: "terms2_explanation_2" },
    ],
  },
  {
    id: 2,
    header: "terms_and_conditions_header_3",
    details: [
      {
        point: "terms3_explanation_1",
        moreDetails: [
          "terms3_explanation_1_more_details_1",
          "terms3_explanation_1_more_details_2",
          "terms3_explanation_1_more_details_3",
          "terms3_explanation_1_more_details_4",
        ],
      },
      { point: "terms3_explanation_2" },
    ],
  },
  {
    id: 3,
    header: "terms_and_conditions_header_4",
    details: [
      { point: "terms4_explanation_1" },
      { point: "terms4_explanation_2" },
      { point: "terms4_explanation_3" },
    ],
  },
  {
    id: 4,
    header: "terms_and_conditions_header_5",
    details: [
      { point: "terms5_explanation_1" },
      { point: "terms5_explanation_2" },
    ],
  },
  {
    id: 5,
    header: "terms_and_conditions_header_6",
    details: [
      { point: "terms6_explanation_1" },
      { point: "terms6_explanation_2" },
    ],
  },
  {
    id: 6,
    header: "terms_and_conditions_header_7",
    details: [{ point: "terms7_explanation_1" }],
  },
];
let highlightTerms = document.querySelector(".highlighted-terms");
console.log(highlightTerms);
const createHighLightTerms = () => {

  
  highlightTermsArr.map((term, index) => {
    highlightTerms.innerHTML += `<li><h3 data-trans="${term.header}"></h3><ul>${
      term.id == 2
        ? term.details
            .map(
              (t_detail, index) =>
                `<li><span data-trans="${t_detail.point}"></span>${
                  t_detail.moreDetails !== undefined
                    ? `<ul id='terms-and-conditions-3'>${t_detail.moreDetails
                        .map((p) => `<li data-trans="${p}">${p}</li>`)
                        .join("")}</ul>`
                    : ""
                }</li>`
            )
            .join("")
        : term.details.map((t_detail)=>`<li data-trans="${t_detail.point}">${t_detail.point}</li>`).join("")
    }</ul></li>`;
  });
};
//createNavbarLinks();
try{
  createHighLightTerms();
}catch(error){
  console.log(error);
}



export const changeTermsAndConditionsStyles = (lang)=>{
  let ol = document.getElementsByTagName("ol")[0];
  lang == 'en'?ol.classList.remove("ol-ar"):ol.classList.add("ol-ar");
  let terms_3 = document.getElementById("terms-and-conditions-3");
  lang == 'en'?terms_3.style.marginRight = '0':terms_3.style.marginRight = '50px';
}
