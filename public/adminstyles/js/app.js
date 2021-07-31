window.addEventListener("DOMContentLoaded", ()=>{

const BASE_URL = 'https://citymobilewetanddrycleaners.herokuapp.com/requests';
const getRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
  
      const requests = response.data;
  
      console.log(`GET: Here's the list of todos`, requests);
  
      return requests.map((i)=>{
          console.log(i.message + "---" + i.phone)
      });
    } catch (errors) {
      console.error(errors);
    }
  };
  getRequests();

  //get the request status and render the approved button conditionally
  const getTheStatus = document.querySelector('.requestStatusShowPage').value;
  if (getTheStatus === 'Approved') {
    const getButtonText = document.querySelector('.approveButton');
    getButtonText.innerText = 'Approved';
    getButtonText.disabled = true;

  }
})