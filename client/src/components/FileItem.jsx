import { useNavigate } from "react-router-dom";

import Card from "./Card";

const FileItem = ({ fileId, fileName, createdAt }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-4">
      <Card
        fileName={fileName}
        createdAt={createdAt}
        fileId={fileId}
        onClick={() => navigate(`/files/${fileId}`)}
      />
    </div>
  );
};

export default FileItem;
