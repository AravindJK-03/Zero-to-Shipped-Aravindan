import { useRef, useState } from "react";

export default function UploadSection({ selectedFile, onFileSelect, onRemove, jobDescription, onJobDescriptionChange, onAnalyze, error }) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  function pickFile(file) {
    if (file && file.type === "application/pdf") {
      onFileSelect(file);
    }
  }

  function openPicker() {
    fileInputRef.current?.click();
  }

  return (
    <section className="upload-section" id="upload">
      <h2 className="section-title">Upload Your Resume</h2>
      <p className="section-sub">Drop a PDF below or click to browse</p>

      <label className="job-description">
        <span>Job Description</span>
        <textarea
          value={jobDescription}
          onChange={(event) => onJobDescriptionChange(event.target.value)}
          placeholder="Paste the role requirements and required skills here..."
          rows="7"
        />
      </label>

      {selectedFile ? (
        <>
          <div className="file-info">
            <span className="file-info__icon">📎</span>
            <span className="file-info__name">{selectedFile.name}</span>
            <button
              className="file-info__remove"
              onClick={onRemove}
              aria-label="Remove file"
            >
              &times;
            </button>
          </div>

          <button className="btn btn--primary btn--analyze" onClick={onAnalyze} disabled={!jobDescription.trim()}>
            🔍 Analyze Resume
          </button>
        </>
      ) : (
        <div
          className={"upload-zone" + (isDragOver ? " dragover" : "")}
          role="button"
          tabIndex={0}
          aria-label="Upload PDF resume"
          onClick={openPicker}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPicker();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            pickFile(e.dataTransfer.files[0]);
          }}
        >
          <div className="upload-zone__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                 strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="upload-zone__text">
            Drag & drop your <strong>PDF</strong> here
          </p>
          <p className="upload-zone__hint">or click to browse</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => {
              pickFile(e.target.files[0]);
              e.target.value = ""; // clear so the same file can be re-picked
            }}
          />
        </div>
      )}
      {error && <p className="form-error" role="alert">{error}</p>}
    </section>
  );
}
