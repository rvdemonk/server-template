let dummy_users = [
  { username: "big dog", password: "bigdog"}
];

// dummy_users = [{ username: "big dog", password: "bigdog" }];

const URL = "http://localhost:3000/users";

dummy_users.forEach(async (user) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
