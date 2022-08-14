export async function updateUser(newName) {
  const token = localStorage.getItem("token");
  console.log(token);
  try {
    console.log(newName);
    const res = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        Authorization: "Bearer" + token,
        "content-type": "application/json",
      },
      body: JSON.stringify(newName),
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
