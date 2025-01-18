import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Card = ({ fileId, fileName, createdAt, onClick }) => {
  const relativeTimeText = dayjs(createdAt).fromNow();
  return (
    <div className="card glass w-96">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="car!"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{fileName}</h2>
        <p>Created {relativeTimeText}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-neutral" onClick={onClick}>
            View More!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
