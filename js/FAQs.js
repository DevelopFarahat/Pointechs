import { createNavbarLinks } from "./main.js";
const FAQsArr = [
  {
    id: 0,
    q: "What is POINTECHS?",
    a: "FAQs1",
  },
  {
    id: 1,
    q: "How does POINTECHS work?",
    a: "FAQs2",
  },
  {
    id: 2,
    q: "How can I register for POINTECHS?",
    a: "FAQs3",
  },
  {
    id: 3,
    q: "Can I customize my loyalty program with POINTECHS?",
    a: "FAQs4",
  },
  {
    id: 4,
    q: "How do I manage my loyalty program with POINTECHS?",
    a: "FAQs5",
  },
  {
    id: 5,
    q: "How much does POINTECHS cost?",
    a: "FAQs6",
  },
  {
    id: 6,
    q: "Is POINTECHS suitable for all types of businesses?",
    a: "FAQs7",
  },
  {
    id: 7,
    q: "What kind of support is available for POINTECHS users?",
    a: "FAQs8",
  },
  {
    id: 8,
    q: "Is my data secure with POINTECHS?",
    a: "FAQs9",
  },
  {
    id: 9,
    q: "How can I get started with POINTECHS?",
    a: "FAQs10",
  }
];
let faqsContainer = document.querySelector("#faqs-container");

const createFrequentlyAskedQuestions = () => {
  FAQsArr.map(
    (faq) =>
      (faqsContainer.innerHTML += `
        <div class="accordion FAQ-accordion" id="accordionExample" style=padding:5px;>
        <div class="accordion-item">
        <h2 class="accordion-header">
        <button class="accordion-button ${faq.id == 0?'':'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${faq.id}" aria-expanded="${faq.id == 0?true:false}" aria-controls="#collapse-${faq.id}" data-trans="${faq.q}">
        ${faq.q}
        </button>
        </h2>
        <div id="collapse-${faq.id}" class="accordion-collapse collapse ${faq.id == 0 ? "show" : ""}" data-bs-parent="#collapse-${faq.id}">
        <div class="accordion-body" data-trans="${faq.a}">
        ${faq.a}
      </div>
    </div>
  </div>
 </div>
      `)
  );
};
try{
  createFrequentlyAskedQuestions();
}catch(error){
  console.log(error);
}


export const changeFAQsStyles = (lang)=>{
    let accordionBtns = document.querySelectorAll(".accordion-button");
    accordionBtns.forEach((accBtn)=>{
      lang == 'ar'?accBtn.classList.add("accordion-button-ar"):accBtn.classList.remove("accordion-button-ar");
    })
}
