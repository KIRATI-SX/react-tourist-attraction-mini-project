import { useEffect, useState } from "react";
import { getTouristSpot } from "../../services/touristSpotService";
import TouristCard from "./components/TouristCard";
import ImageModal from "./components/ImageMoal";

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
  function handleTagClick(tag) {
    const newTextSearch = textSearch;
    if (newTextSearch.includes(tag)) {
      setTextSearch(newTextSearch.replace(tag, "").trim());
    } else {
      setTextSearch((newTextSearch + " " + tag).trim());
    }
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
    const delay = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(delay);
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
              <TouristCard
                key={spot.id}
                spot={spot}
                onImageClick={(img) => {
                  setActiveImage(img);
                  setIsOpen(true);
                }}
                onTagClick={(tag) => handleTagClick(tag)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Gallery */}
      {isOpen && <ImageModal isClose={setIsOpen} activeImage={activeImage} />}
    </div>
  );
}

export default Home;
