export const deleteFromDb = (id: number) => {
  const settings = {
    method: "'DELETE'",
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  };

  fetch(`http://localhost:3000/todos/${id}`, settings).then((res) => res.json().then((data) => data));
};
