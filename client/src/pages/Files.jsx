import React from "react";
import FileItem from "../components/FileItem";
import Container from "../components/Container";
import { getAllFiles } from "../api/files";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import FileUploadModal from "../components/FileUploadModal";

const Files = () => {
  const filesQuery = useQuery({
    queryKey: [QUERY_KEYS.files],
    queryFn: getAllFiles,
  });

  console.log("data: ", filesQuery.data);
  return (
    <Container>
      <div>
        <div className="m-4">
          <span className="text-lg font-semibold mr-2 inline-block">
            Upload new file to generate summary:
          </span>{" "}
          <button
            className="btn btn-neutral"
            onClick={() => document.getElementById("upload_modal").showModal()}
          >
            {" "}
            Upload{" "}
          </button>
        </div>

        {filesQuery.isLoading && "Loading...."}
        <div className="grid md:grid-cols-3">
          {!filesQuery.isLoading &&
            filesQuery.data.data.data.map(({ fileName, createdAt, _id }) => (
              <FileItem
                key={_id}
                fileId={_id}
                fileName={fileName}
                createdAt={createdAt}
              />
            ))}
        </div>

        <FileUploadModal />
      </div>
    </Container>
  );
};

export default Files;
