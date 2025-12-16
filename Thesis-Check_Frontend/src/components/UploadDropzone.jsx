// src/components/UploadDropzone.jsx
import React, { useRef, useState } from "react";

const UploadDropzone = ({ onFileSelected, label = "Drop your thesis here" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && onFileSelected) {
      onFileSelected(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onFileSelected) {
      onFileSelected(file);
    }
  };

  return (
    <>
      <div
        className={"drop-zone" + (isDragging ? " drop-zone-dragging" : "")}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="drop-zone-icon">☁️⬆️</div>
        <p className="drop-zone-text">{label}</p>
        <p className="drop-zone-subtext">or click to browse your files</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden-file-input"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
      />
    </>
  );
};

export default UploadDropzone;
