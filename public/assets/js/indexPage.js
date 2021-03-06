
//date
let date = new Date();
document.getElementById('date').innerHTML = date.getFullYear();
//modal js
// Get the modal
let modal = document.getElementById("myModal");
// Get the button that opens the modal
let btn = document.getElementsByClassName('request-button');
//loop through all request-buttons
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
        //display modal to make a request
        modal.style.display = "block";
    })
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/*var elems = document.getElementsByClassName('list');

console.log(elems);
let listLength = elems.length;
for(let i = 0; i < listLength; i++){
elems[i].addEventListener('click', ()=>{
alert()
})
}
*/
//remove errors after some time
//get errors div

//close the error alert messages

try {
    setTimeout(()=>{
        let errorsDiv = document.querySelector('.errors');
        errorsDiv.style.display = 'none'
    },5000)
} catch (error) {
    console.error(error)
}
//close the success alert message
setTimeout(()=>{
    let successMessage = document.querySelector('.success-message');
    successMessage.style.display = 'none'
},5000);

//get the users phone number and store in in the local storage on the request page
let form = document.getElementById('Myform');
if(!localStorage.getItem('phone')){
    form.addEventListener('submit', ()=>{
        let phone = form.elements['phone'];
        localStorage.setItem('phone', phone.value)
    })
}else{
     form.elements['phone'].placeholder = localStorage.getItem('phone')
     form.elements['phone'].value = localStorage.getItem('phone')

}
//set request date
const setDate = new Date()
const getRequestDateElement = document.querySelector('.date-element').value=setDate;


/* this algorithm was made to store the date in seconds
so it can be used to query the documents orderBy seconds because
it gave wrong results by the saved date
*/
let getDateToSecondsElement = document.querySelector('.dateInSeconds');
let changeToSeconds = setDate.getTime() / 1000;
let dateToSeconds = getDateToSecondsElement.value=changeToSeconds;

 
