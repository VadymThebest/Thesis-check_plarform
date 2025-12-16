import api from "./client";

/* Upload thesis */
export const uploadThesis = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload/", formData);
  return res.data;
};

/* Get list of user's theses */
export const getMyThesis = async () => {
  const res = await api.get("/check/");
  return res.data;
};

/* Get single report */
export const getResult = async (id) => {
  const res = await api.get(`/check/${id}/`);
  return res.data;
};

