export default function TouristCard(props) {
  const { spot, onImageClick, onTagClick,onBtnCopy } = props;
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 flex flex-col md:flex-row gap-5">
      {/* Main image */}
      <div className="w-full md:w-64 h-64 rounded-lg overflow-hidden">
        <img
          src={spot.photos[0]}
          alt={spot.title}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-110 transition"
        />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <a
          href={spot.url}
          target="_blank"
          className="text-xl font-medium text-slate-800 hover:underline"
        >
          {spot.title}
        </a>

        <p className="text-slate-600 line-clamp-1">{spot.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {spot.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="bg-slate-100 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div className="flex gap-3 overflow-x-auto pt-2">
          {spot.photos.slice(1).map((img, i) => (
            <img
              key={i}
              src={img}
              loading="lazy"
              onClick={() => onImageClick(img)}
              className="w-28 h-20 object-cover rounded-lg cursor-pointer overflow-hidden hover:scale-110 transition"
            />
          ))}
        </div>

        {/* Copy */}
        <div className="flex justify-end">
          <button
            onClick={() => navigator.clipboard.writeText(spot.url)}
            className="p-2 rounded-full hover:bg-slate-100"
            title="คัดลอกลิงก์"
          >
            <i className="fa-regular fa-copy"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
