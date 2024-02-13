import React, { useState } from "react";
import axios from "axios";

const AddForm = ({ onAdd }) => {
    const [file, setFile] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file) return;
  
      try {
        const formData = new FormData();
        const token = sessionStorage.getItem("jwtToken");
        formData.append("file", file);
        formData.append("token", token);
  
        // Send the file to the server for upload
        const response = await axios.post("http://localhost:3000/user/upload", formData);
  
        // If the upload is successful, call the onAdd function to update the images list
        if (response.status === 200) {
          onAdd(file);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    return (
      <div>
        <h2>Add file</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  };

const ImagesList = ({ images }) => {
  return (
    <div>
      <h2>Uploaded Images</h2>
      <div style={{
        display : "flex",
        flexWrap : "wrap",
      }}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          >
            <img
              src={image}
              alt={`Image ${index}`}
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [images, setImages] = useState([]);

  const handleAdd = (file) => {
    setImages([...images, file]);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <AddForm onAdd={handleAdd} />
      {/* <ImagesList images={images} /> */}
    </div>
  );
};

export default Dashboard;
