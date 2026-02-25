import { ACTIONS } from "../hooks/appReducer.js";

export const fetchCategories = async (dispatch) => {
  const response = await fetch("/api/categories");
  if (!response.ok) throw new Error("Failed to get event category");
  const data = await response.json();

  return data;
};
