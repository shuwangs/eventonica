// export const fetchCategories = async () => {
//   try {
//     const response = await fetch(`/api/categories`);
//     if (!response.ok) {
//       throw new Error("Failed to get event category");
//     }
//     const data = await response.json();
//     console.log("categories include: ", data);
//     setEventCategories(data);
//   } catch (err) {
//     setError(err.message);
//   }
// };

import { ACTIONS } from "../hooks/appReducer.jsx";

export const fetchCategories = async (dispatch) => {
  const response = await fetch("/api/categories");
  if (!response.ok) throw new Error("Failed to get event category");
  const data = await response.json();

  return data;
};
