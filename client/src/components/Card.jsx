import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Card = ({ fileId, fileName, createdAt, onClick }) => {
  const relativeTimeText = dayjs(createdAt).fromNow();
  return (
    <div className="card glass w-80">
      <figure>
        <img src="/card_image.webp" alt="image!" />
      </figure>
      <div className="card-body pr-4">
        <h2 className="card-title">{fileName}</h2>
        <p className="text-sm">Created {relativeTimeText}</p>
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-neutral" onClick={onClick}>
            View More!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
