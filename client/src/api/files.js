import axios from "axios";

export const generateSummary = (formData) => {
  return axios.post("/api/files", formData);
};

export const regenerateSummary = ({ fileId, summaryType }) => {
  return axios.put(`/api/files/${fileId}`, {
    fileId,
    summaryType,
  });
};

export const getAllFiles = () => {
  return axios.get("/api/files");
};

export const getFileById = (fileId) => {
  return axios.get(`/api/files/${fileId}`);
};
