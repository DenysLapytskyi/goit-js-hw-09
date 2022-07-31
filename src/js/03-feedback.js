
import throttle from 'lodash.throttle';

const formRem = document.querySelector('.feedback-form')
const inputRef = document.querySelector('input');
const textareaRef =document.querySelector('textarea');


const storageKey = "feedback-form-state";


inputRef.addEventListener('input', throttle(onInputChange, 500))
textareaRef.addEventListener('input', throttle(onInputChange, 500))

updateInput();

formRem.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formRem);
    formData.forEach((name, value) => {
        console.log(name, value);
    })          

    formRem.reset(); 
    // console.log(localStorage.getItem(storageKey))
    localStorage.removeItem(storageKey);   
});


function onInputChange (e) {    
 const email = inputRef.value;
 const message = textareaRef.value;
 const formData = {
    email,
    message,
 };
 localStorage.setItem(storageKey, JSON.stringify(formData))
 }; 


function updateInput() {
    let inputListSaved = localStorage.getItem(storageKey);
    inputListSaved= JSON.parse(inputListSaved);

      if(inputListSaved){
      
      inputRef.value = inputListSaved.email;
      textareaRef.value = inputListSaved.message;
    
    };
};