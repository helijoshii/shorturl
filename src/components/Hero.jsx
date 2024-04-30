import axios from "axios";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ExternalLink, QrCode, Copy, Share2 } from "lucide-react";

const Hero = () => {
  const [newUrl, setNewUrl] = React.useState("");
  const [shortenedUrl, setShortenedUrl] = React.useState("");
  const [converted, setConverted] = React.useState(false);
  const shortenUrl = async (text) => {
    // Step 1: Convert to ASCII and calculate summation
    let summation = 0;
    for (let i = 0; i < text.length; i++) {
      summation += text.charCodeAt(i);
    }

    // Step 2: Modulo 1000000
    let moduloResult = summation % 1000000;

    // Step 3: Convert to Base64
    let base64Result = btoa(moduloResult.toString());

    // Pad the result if it's less than 6 characters
    while (base64Result.length < 6) {
      base64Result += "=";
    }

    let sURL = base64Result.slice(0, 6);

    let finalshortenedUrl = "http://192.168.1.77:5173/" + sURL;
    setShortenedUrl(finalshortenedUrl);
    console.log("Shortened URL:", finalshortenedUrl);
  };

  const saveToDatabase = async () => {
    console.log("Saving to database...");
    axios.post("http://192.168.1.77:8000/shortenedURLs", {
      URL: newUrl,
      shortenedURL: shortenedUrl,
    });
    setConverted(true);
  };

  return (
    <>
      <h1 className="flex justify-center text-4xl font-bold text-gray-800">
        URL SHORTENER
      </h1>
      <div className="bg-white flex justify-center items-center mt-40 mb-4">
        <div class="flex">
          <input
            type="text"
            class="py-3 px-7 border rounded-2xl w-[600px] h-14 focus:outline-none"
            placeholder="Enter link url..."
            onChange={(e) => {
              console.log(e.target.value);
              setNewUrl(e.target.value);
              shortenUrl(e.target.value);
            }}
          />
          <div
            class="ml-[-20px] flex items-center cursor-pointer inset-y-0 right-0 px-4 py-2 bg-[#0c5460] text-white font-semibold rounded-r-2xl"
            onClick={() => saveToDatabase()}
          >
            Shorten URL
          </div>
        </div>
      </div>
      {converted ? (
        <div className="flex justify-center ">
          <div className="w-[600px] relative h-24 bg-gradient-to-b from-transparent via-[#d1ecf1] to-[#bce7ef] rounded-b-lg">
            <p className="text-[#0c5460] mt-2 ml-2">
              URL:{" "}
              <span className="font-bold">{converted ? shortenedUrl : ""}</span>
            </p>

            <div className="absolute bottom-0 right-0 flex space-x-4 mr-2 mb-2">
              <button className="">
                <a
                  href={shortenedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink />
                </a>
              </button>

              <button className="" onClick={() => {}}>
                <QrCode />
              </button>
              <CopyToClipboard text={shortenedUrl}>
                <button className="">
                  <Copy />
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Hero;
