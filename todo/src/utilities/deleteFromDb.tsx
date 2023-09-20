import axios from "axios";

export const deleteFromDb = (id: number) => {
  axios.delete(`http://localhost:3030/todos/${id}`).then(() => {
    console.log(`Deleted post with id of ${id}`);
  });
};
