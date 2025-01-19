import dayjs from "dayjs";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Card = ({ fileId, fileName, createdAt, onClick }) => {
  const relativeTimeText = dayjs(createdAt).fromNow();
  return (
    <div className="card glass w-80">
      <figure>
        <img src="/card_image.webp" alt="image!" />
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
