"use client";

import ResultContainer from "@/components/ResultContainer";
import api from "@/lib/api";
import { ChevronLeft, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const DynamicScannerContainer = dynamic(
  () => import("@/components/ScannerContainer"),
  {
    ssr: false,
    loading: () => <p>Loading scanner...</p>,
  }
);

const Main = ({ eventId, event }) => {
  const [emailOrTicketId, setEmailOrTicketId] = useState("");
  const [resultContainerVisible, setResultContainerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isFullscreenScannerOpen, setIsFullscreenScannerOpen] = useState(false);

  const closeModal = () => {
    setResultContainerVisible(false);
  };

  const openFullscreenScanner = () => {
    setIsFullscreenScannerOpen(true);
  };

  const closeFullscreenScanner = () => {
    setIsFullscreenScannerOpen(false);
  };

  // Handle browser back button
  useEffect(() => {
    if (resultContainerVisible) {
      // Push a new state when modal opens
      window.history.pushState({ modalOpen: true }, "");

      const handlePopState = () => {
        closeModal();
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [resultContainerVisible]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && resultContainerVisible) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [resultContainerVisible]);

  const onNewScanResult = async (decodedText, decodedResult) => {
    setEmailOrTicketId(decodedText);
    setIsLoading(true);
    setResultContainerVisible(true);

    try {
      const response = await api.get(
        `/api/registrations/${eventId}/${decodedText}`
      );
      setResult(response.data);
    } catch (error) {
      console.error("Scan failed:", error);
      setResult({
        status: "error",
        error: error.response?.data?.message || "Invalid server response.",
        statusCode: error.response?.status,
      });
    }
    setIsLoading(false);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setResultContainerVisible(true);

    const normalisedEmailOrTicketId = emailOrTicketId?.trim().toLowerCase();
    try {
      const response = await api.get(
        `/api/registrations/${eventId}/${normalisedEmailOrTicketId}`
      );
      setResult(response.data);
    } catch (error) {
      console.error("Search failed:", error);
      setResult({
        status: "error",
        error: error.response?.data?.message || "Invalid server response.",
        statusCode: error.response?.status,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="bg-background border-b border-gray-200 dark:border-gray-800 py-2 md:py-4 flex-shrink-0">
        <div className="container mx-auto px-4">
          <Link href={`/events/${eventId}`}>
            <div className="inline-flex items-center text-gray-600 hover:text-theme-primary dark:text-gray-400 dark:hover:text-theme-primary_focus transition-colors text-sm md:text-base">
              <ChevronLeft size={18} className="mr-1" />
              <span className="font-medium">Back</span>
            </div>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-2">
            Event Check-in
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1 hidden md:block">
            Scan QR codes or search by ticket ID or email address
          </p>
        </div>
      </div>

      <section className="flex-1 overflow-auto">
        <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
          <div className="max-w-2xl mx-auto flex flex-col gap-4 md:gap-6">
            {/* QR Scan Button */}
            <button
              onClick={openFullscreenScanner}
              className="w-full bg-gradient-to-br from-theme-primary to-theme-primary_dark text-white rounded-lg p-6 md:p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="w-16 h-16 md:w-20 md:h-20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                <div className="text-center">
                  <h2 className="text-xl md:text-2xl font-bold">
                    Scan QR Code
                  </h2>
                  <p className="text-sm md:text-base text-white/80 mt-1">
                    Open camera to scan ticket
                  </p>
                </div>
              </div>
            </button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
                  OR
                </span>
              </div>
            </div>

            {/* Manual Search Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
              <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 md:mb-4">
                Manual Lookup
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <input
                  type="text"
                  className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-theme-primary focus:border-theme-primary block w-full p-2.5 md:p-3 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Ticket ID or Email"
                  required
                  value={emailOrTicketId}
                  onChange={(e) => setEmailOrTicketId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && emailOrTicketId.trim()) {
                      onSubmit();
                    }
                  }}
                />
                <button
                  className={`px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-white text-sm md:text-base transition-all duration-200 whitespace-nowrap ${
                    !emailOrTicketId.trim()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-br from-theme-primary to-theme-primary_dark hover:shadow-lg"
                  }`}
                  onClick={onSubmit}
                  disabled={!emailOrTicketId.trim()}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Scanner Overlay */}
      {isFullscreenScannerOpen && (
        <section className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Scanner Header */}
          <div className="flex items-center justify-between p-4 bg-black/50">
            <h2 className="text-white text-lg font-semibold">Scan QR Code</h2>
            <button
              onClick={closeFullscreenScanner}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close scanner"
            >
              <X size={24} className="text-white" />
            </button>
          </div>

          {/* Scanner Area */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              <DynamicScannerContainer
                fps={10}
                qrbox={300}
                disableFlip={false}
                qrCodeSuccessCallback={(decodedText, decodedResult) => {
                  closeFullscreenScanner();
                  onNewScanResult(decodedText, decodedResult);
                }}
                showTorchButtonIfSupported={true}
              />
            </div>
          </div>

          {/* Helper Text */}
          <div className="p-6 bg-black/50 text-center">
            <p className="text-white/80 text-sm">
              Point your camera at a QR code to scan
            </p>
          </div>
        </section>
      )}

      {/* Results Modal */}
      <section
        className={`${
          resultContainerVisible ? "fixed" : "hidden"
        } z-50 inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-end sm:items-center`}
        onClick={closeModal}
      >
        <div
          className={`${
            resultContainerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          } w-full sm:max-w-2xl sm:mx-4 max-h-[85vh] flex flex-col bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-2xl p-6 md:p-8 transition-all ease-out duration-300 shadow-2xl relative`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-500 dark:text-gray-400" />
          </button>

          <div className="flex-1 overflow-y-auto mt-8">
            {isLoading ? (
              <div
                className="flex justify-center items-center py-12"
                role="status"
              >
                <svg
                  aria-hidden="true"
                  className="w-12 h-12 text-gray-200 dark:text-gray-700 animate-spin fill-theme-primary"
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
                  eventId={eventId}
                  event={event}
                />
              )
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              className="w-full px-6 py-3 text-gray-700 dark:text-gray-300 bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              onClick={closeModal}
            >
              New Scan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
