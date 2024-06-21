const URL = "http://localhost:3000/users";

fetch(URL)
  .then((response) => {
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
