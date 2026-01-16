export default function ImageModal(props) {
  const { isClose, activeImage } = props;

  // Debug: ตรวจสอบค่า activeImage
  console.log("Active Image URL:", activeImage);

  // ถ้าไม่มีรูปภาพ ไม่แสดง modal
  if (!activeImage) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50
               flex items-center justify-center"
      onClick={() => isClose(false)}
    >
      <div
        className="relative max-w-4xl w-full px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute -top-10 right-2 text-white text-2xl hover:text-blue-600"
          onClick={() => isClose(false)}
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={activeImage}
          alt="gallery"
          className="w-full max-h-[80vh] object-contain rounded-xl"
          onError={(e) => {
            console.error("Image failed to load:", activeImage);
            e.target.src =
              "https://via.placeholder.com/800x600?text=Image+Not+Found";
          }}
        />
      </div>
    </div>
  );
}
