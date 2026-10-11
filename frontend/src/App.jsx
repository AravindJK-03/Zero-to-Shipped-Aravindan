import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import UploadSection from "./components/UploadSection";
import Loader from "./components/Loader";
import Results from "./components/Results";
import Footer from "./components/Footer";

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [stage, setStage] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!selectedFile || !jobDescription.trim()) return;
    setError("");
    setStage("loading");
    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      formData.append("jobDescription", jobDescription);
      const response = await fetch("/api/analyze", { method: "POST", body: formData });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || "Unable to analyze this resume.");
      setResult(payload);
      setStage("results");
      requestAnimationFrame(() =>
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
      );
    } catch (requestError) {
      setError(requestError.message);
      setStage("idle");
    }
  }

  function handleReset() {
    setSelectedFile(null);
    setJobDescription("");
    setError("");
    setStage("idle");
    requestAnimationFrame(() =>
      document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })
    );
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      {stage === "results" ? (
        <Results result={result} onReset={handleReset} />
      ) : (
        <UploadSection
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
          onRemove={() => setSelectedFile(null)}
          jobDescription={jobDescription}
          onJobDescriptionChange={setJobDescription}
          onAnalyze={handleAnalyze}
          error={error}
        />
      )}
      {stage === "loading" && <Loader />}
      <Footer />
    </>
  );
}
