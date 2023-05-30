import {createNavbarLinks} from "./main.js";

const highlightTermsArr = [
    {id:0,highlightTerm:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    {id:1,highlightTerm:'Libero justo laoreet sit amet.'},
    {id:2,highlightTerm:'Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus.'},
    {id:3,highlightTerm:'Auctor neque vitae tempus quam pellentesque nec.'},
    {id:4,highlightTerm:'Cras adipiscing enim eu turpis egestas pretium aenean.'}
  ]
let highlightTerms = document.querySelector(".highlighted-terms");
  console.log(highlightTerms)
const createHighLightTerms = ()=>{
    highlightTermsArr.map((term)=>(
        highlightTerms.innerHTML += `<li>${term.highlightTerm}</li>`
      ))
}
//createNavbarLinks();
createHighLightTerms();


