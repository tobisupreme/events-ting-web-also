"use client";

import ResultContainer from "@/components/ResultContainer";
import ScannerContainer from "@/components/ScannerContainer";
import { urls } from "@/lib/urls";
import { useState } from "react";

const Main = () => {
  const [emailOrTicketId, setEmailOrTicketId] = useState("");
  const [resultContainerVisible, setResultContainerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onNewScanResult = async (decodedText, decodedResult) => {
    setEmailOrTicketId(decodedText);
    setIsLoading(true);
    setResultContainerVisible(true);

    const response = await fetch(urls.getRegistration(decodedText));
    const data = await response.json();

    if (data) {
      setResult(data);
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setResultContainerVisible(true);

    const normalisedEmailOrTicketId = emailOrTicketId?.trim().toLowerCase();
    const response = await fetch(
      urls.getRegistration(normalisedEmailOrTicketId)
    );
    const data = await response.json();

    if (data) {
      setResult(data);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <section className="flex flex-col grow md:items-center justify-center">
        <ScannerContainer
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
          showTorchButtonIfSupported={true}
        />

        <div className="relative mx-auto my-10 w-[50vw]">
          <hr className="w-full" />
        </div>

        <div className="mx-auto flex flex-wrap md:flex-nowrap items-center justify-center w-[90%] md:w-2/5 gap-4">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Ticket ID or Email Address"
            required
            onChange={(e) => setEmailOrTicketId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && emailOrTicketId.trim()) {
                onSubmit();
              }
            }}
          />
          <button
            className={`btn !text-white ${
              !emailOrTicketId.trim() ? "!bg-gray-400" : "!bg-theme-primary"
            } !hover:bg-theme-primary_dark whitespace-nowrap`}
            onClick={onSubmit}
            disabled={!emailOrTicketId.trim()}
          >
            Search Ticket
          </button>
        </div>
      </section>
      <section
        className={`${
          resultContainerVisible ? "absolute" : "hidden"
        } z-50 bg-black/80 top-0 w-full h-full flex justify-center`}
      >
        <div
          className={`${
            resultContainerVisible ? "top-0" : "top-full"
          } self-end w-full h-[80%] flex flex-col bg-white rounded-tr-3xl rounded-tl-3xl p-5 md:p-10 delay-300 transition-all ease-out duration-300`}
        >
          <div className="grow">
            {isLoading ? (
              <div className="flex justify-center" role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-theme-primary"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              result && (
                <ResultContainer
                  result={result}
                  emailOrTicketId={emailOrTicketId}
                />
              )
            )}
          </div>

          <button
            className="btn !text-gray-700 !bg-transparent border border-gray-700 !hover:text-white !hover:background-gray-700"
            onClick={() => setResultContainerVisible(false)}
          >
            New Scan
          </button>
        </div>
      </section>
    </div>
  );
};

export default Main;
