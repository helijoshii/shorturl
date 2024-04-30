import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
function App() {
  const [count, setCount] = useState(0);
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    axios.get("http://192.168.1.77:8000/shortenedURLs").then((response) => {
      console.log(response.data);
      if (window.location.pathname.length > 1) {
        console.log("Redirecting...");
        console.log("URLs:", response.data);
        console.log("Pathname:", window.location.pathname);
        response.data.forEach((url) => {
          if (window.location.pathname === url.shortenedURL.slice(-7)) {
            window.location = url.URL;
          }
        });
      }
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
