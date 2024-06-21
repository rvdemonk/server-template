require("dotenv").config();

const PORT = process.env.SERVER_PORT;
const URL = `http://localhost:${PORT}/users`;

fetch(URL)
  .then((response) => {
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
