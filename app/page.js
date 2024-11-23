"use client";

import { useState } from "react";
import ScannerConatiner from "@/components/ScannerContainer";
import ResultContainerPlugin from "@/components/ResultContainerPlugin";

export default function Home() {
  const [decodedResults, setDecodedResults] = useState([]);
  const [resultContainerVisible, setResultContainerVisible] = useState(false);

  const onNewScanResult = (decodedText, decodedResult) => {
    setResultContainerVisible(true);
    console.log("App [result]", decodedResult);
    setDecodedResults(prev => [...prev, decodedResult]);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-center">EventsTing Check-In</h1>
      </div>
      <section className="flex grow md:items-center justify-center">
        <ScannerConatiner
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
      </section>
      <section className={`${resultContainerVisible ? "absolute" : "hidden"} z-50 bg-black/80 top-0 w-full h-full flex justify-center`}>
        <div className={`${resultContainerVisible ? "top-0" : "top-full"} self-end w-full h-[80%] flex flex-col bg-white rounded-tr-3xl rounded-tl-3xl p-5 md:p-10 delay-300 transition-all ease-out duration-300`}>
          <div className="grow">
            <ResultContainerPlugin results={decodedResults} />
          </div>

          <button className="btn" onClick={() => setResultContainerVisible(false)}>
            New Scan
          </button>
        </div>
      </section>
    </div>
  );
}
