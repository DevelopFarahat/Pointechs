import { createNavbarLinks } from "./main.js";
const FAQsArr = [
  {
    id: 0,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
  {
    id: 1,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
  {
    id: 2,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
  {
    id: 3,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
  {
    id: 4,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
  {
    id: 5,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
  {
    id: 6,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
  {
    id: 7,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
  {
    id: 8,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
  {
    id: 9,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
  {
    id: 10,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
  {
    id: 11,
    q: "How does it work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum. Quis blandit turpis cursus in hac habitasse. Libero volutpat sed cras ornare arcu dui vivamus. Porttitor lacus luctus accumsan tortor posuere. Sit amet justo donec enim. Enim facilisis gravida neque convallis. Fames ac turpis egestas sed tempus urna et. Consequat semper viverra nam libero justo laoreet sit amet. Quis varius quam quisque id diam vel. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.",
  },
];
let faqsContainer = document.querySelector("#faqs-container");

const createFrequentlyAskedQuestions = () => {
  FAQsArr.map(
    (faq) =>
      (faqsContainer.innerHTML += `
        <div class="accordion FAQ-accordion" id="accordionExample">
  <div class="accordion-item" event-key="0">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${
        faq.id
      }" aria-expanded="true" aria-controls="#collapse-${faq.id}">
        ${faq.q}
      </button>
    </h2>
    <div id="collapse-${faq.id}" class="accordion-collapse collapse ${
        faq.id == 0 ? "show" : ""
      }" data-bs-parent="#collapse-${faq.id}">
      <div class="accordion-body">
        ${faq.a}
      </div>
    </div>
  </div>
 </div>
      `)
  );
};
createFrequentlyAskedQuestions();
