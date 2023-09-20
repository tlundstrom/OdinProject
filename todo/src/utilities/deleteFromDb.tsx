import axios from "axios";

export const deleteFromDb = (_id: string) => {
  console.log(_id);
  axios.delete(`http://localhost:3030/api/tasks/${_id}`).then(() => {
    console.log(`Deleted post with id of ${_id}`);
  });
};
