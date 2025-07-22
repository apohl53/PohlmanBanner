import { useEffect, useState } from "react";

function App() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:40y00/photos")
      .then((res) => res.json())
      .then(setPhotos);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPhotos((prev) => [data.url, ...prev]);
    setFile(null);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h1>Photo Gallery</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "1rem",
          gap: "10px",
        }}
      >
        {photos.map((url, i) => (
          <img
            key={i}
            src={`http://localhost:4000${url}`}
            alt={`Upload ${i}`}
            style={{ width: 200, height: 200, objectFit: "cover" }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
