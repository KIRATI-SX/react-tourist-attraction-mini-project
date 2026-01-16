export default function TouristCard(props) {
  const { spot, onImageClick, onTagClick, onBtnCopy } = props;

  return (
    <article className="group bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col md:flex-row gap-6">
      {/* Main image */}
      <div className="relative w-full md:w-72 h-64 rounded-xl overflow-hidden">
        <img
          src={spot.photos[0]}
          alt={spot.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 flex-1">
        {/* Title */}
        <a
          href={spot.url}
          target="_top"
          className="text-2xl font-semibold text-slate-800 leading-snug hover:text-blue-600 transition"
        >
          {spot.title}
        </a>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-1">
          {spot.description}
        </p>

        {/* Read more */}
        <a
          href={spot.url}
          target="_blank"
          className="text-blue-600 text-sm font-medium hover:underline w-fit"
        >
          อ่านต่อ →
        </a>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {spot.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="relative justify-between items-end">
          {/* Gallery */}
          <div className="flex gap-3 overflow-x-auto pt-2">
            {spot.photos.slice(1).map((img, i) => (
              <div
                key={i}
                onClick={() => onImageClick(img)}
                className="relative w-28 h-20 rounded-lg overflow-hidden cursor-pointer group/thumb"
              >
                <img
                  src={img}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/thumb:opacity-100 transition" />
              </div>
            ))}
          </div>

          {/* Utility */}
          <div className="absolute right-0 bottom-0 flex justify-end pt-2">
            <button
              onClick={() => navigator.clipboard.writeText(spot.url)}
              className="w-12 h-12 p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
              title="คัดลอกลิงก์"
            >
              <i className="fa-regular fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
