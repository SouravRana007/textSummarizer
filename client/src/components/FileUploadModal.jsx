import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { generateSummary } from "../api/files";
import { SUMMARY_TYPES } from "../constants";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";

const fileTypes = ["JPG", "PNG", "JPEG", "PDF"];

const FileUploadModal = () => {
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const generateSummaryMutation = useMutation({
    mutationFn: generateSummary,
    onSuccess: (response) => {
      document.getElementById("upload_modal").close();
      // Reset form
      setFileName("");
      setFile(null);
      setErrors({});
      navigate(`/files/${response.data.data._id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Something went wrong!");
    },
  });

  const handleChange = (file) => {
    setFile(file);
  };

  const validation = () => {
    let newErrors = {};
    if (!fileName.trim()) {
      newErrors.fileName = "File Name is required!";
      setFileName(fileName.trim());
    }

    if (!file) {
      newErrors.file = "File is required!";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!validation()) {
      return;
    }

    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("document", file);
    formData.append("summaryType", SUMMARY_TYPES.short);

    generateSummaryMutation.mutate(formData);
  };

  return (
    <>
      <dialog id="upload_modal" className="modal">
        {generateSummaryMutation.isPending && <Loader />}
        <ToastContainer />
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Please upload your pdf/image file and submit!
          </h3>
          <div className="form-control py-4">
            <label className="label">
              <span className="label-text">File Name</span>
            </label>
            <input
              type="text"
              placeholder="Resume.pdf"
              className="input input-bordered text-black "
              value={fileName}
              onChange={(e) => {
                setErrors((errors) => ({
                  ...errors,
                  fileName: null,
                }));
                setFileName(e.target.value);
              }}
            />
            {errors.fileName && (
              <span className="text-red-500 text-sm">{errors.fileName}</span>
            )}
          </div>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
          {errors.file && (
            <span className="text-red-500 text-sm mt-2">{errors.file}</span>
          )}
          <p className="pt-2">
            {file ? `File name: ${file.name}` : "no files uploaded yet"}
          </p>

          <p className="text-md font-extralight">
            Download Sample pdf for upload:{" "}
            <a
              className="font-semibold text-secondary-content"
              href="/SOURAVRANARESUME.pdf"
              target="_blank"
            >
              Link
            </a>
          </p>

          <div className="modal-action">
            <button className="btn btn-neutral mr-2" onClick={onSubmit}>
              Submit
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={() => {
                  setFile(null);
                  setFileName("");
                  setErrors({});
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default FileUploadModal;
