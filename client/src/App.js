import { useEffect, useState } from "react";

function App() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/photos")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(setPhotos)
      .catch((error) => {
        console.error('Failed to fetch photos:', error);
        // Set empty array if server is not available
        setPhotos([]);
      });
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const res = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setPhotos((prev) => [data.url, ...prev]);
      setFile(null);
    } catch (error) {
      console.error('Failed to upload photo:', error);
      alert('Failed to upload photo. Make sure the server is running on port 4000.');
    }
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