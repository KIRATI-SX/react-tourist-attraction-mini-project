import { useEffect, useState } from "react";
import { getTouristSpot } from "../../services/touristSpotService";

function Home() {
  const [touristSpot, setTouristSpot] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [loading, setLoading] = useState(true);
  // Modal Gallery
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  async function fetchData() {
    setLoading(true);
    try {
      const response = await getTouristSpot(textSearch);
      setTouristSpot(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Loading fail", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearchChange(e) {
    setTextSearch(e.target.value);
  }

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  useEffect(() => {
    fetchData();
  }, [textSearch]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-semibold text-slate-800 mb-2">
          เที่ยวไหนดี 🌿
        </h1>
        <p className="text-slate-500">
          ค้นหาที่เที่ยวดี ๆ สำหรับวันพักผ่อนของคุณ
        </p>
      </div>

      {/* Search */}
      <div className="max-w-5xl mx-auto mb-10">
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 
                     focus:outline-none focus:ring-2 focus:ring-blue-200
                     bg-white text-slate-700"
          onChange={handleSearchChange}
          value={textSearch}
        />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <p className="text-center text-slate-500">Loading...</p>
        ) : (
          <div className="flex flex-col gap-6">
            {touristSpot.map((spot) => (
              <div
                key={spot.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5
                           flex flex-col md:flex-row gap-5"
              >
                {/* Main image */}
                <div className="w-full md:w-sm h-64 rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src={spot.photos[0]}
                    alt={spot.title}
                    loading="lazy"
                    className="w-full h-full object-cover
               transition-transform duration-300
               hover:scale-110"
                  />
                </div>
                {/* Content */}
                <div className="flex flex-col gap-3 flex-1">
                  <a
                    className="text-xl font-medium text-slate-800"
                    href={spot.url}
                    target="_blank"
                  >
                    {spot.title}
                  </a>

                  <p className="text-slate-600 line-clamp-1">
                    {spot.description}
                  </p>

                  <a
                    href={spot.url}
                    target="_blank"
                    className="inline-block text-blue-600 text-sm font-medium
                               hover:underline w-fit"
                  >
                    อ่านต่อ →
                  </a>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 text-sm">
                    {spot.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Gallery */}
                  <div className="flex gap-3 overflow-x-auto pt-2">
                    {spot.photos.slice(1).map((img, index) => (
                      <div
                        key={index}
                        className="w-28 h-20 rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => {
                          setActiveImage(img);
                          setIsOpen(true);
                        }}
                      >
                        <img
                          src={img}
                          loading="lazy"
                          alt={spot.title}
                          className="w-full h-full object-cover
                   transition-transform duration-300
                   hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Copy button */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="hover:bg-gray-200 p-2 rounded-[50%]"
                      onClick={() => copyToClipboard(spot.url)}
                    >
                      <i class="fa-regular fa-copy"></i>
                    </button>
                  </div>


                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Gallery */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50
               flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute -top-10 right-2 text-white text-2xl hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={activeImage}
              alt="gallery"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
