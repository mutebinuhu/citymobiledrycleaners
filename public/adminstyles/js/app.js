
const BASE_URL = 'https://citymobilewetanddrycleaners.herokuapp.com/requests';
const getTodoItems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
  
      const todoItems = response.data;
  
      console.log(`GET: Here's the list of todos`, todoItems);
  
      return todoItems;
    } catch (errors) {
      console.error(errors);
    }
  };
getTodoItems();