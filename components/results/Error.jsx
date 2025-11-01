const Error = ({ error }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-lg text-gray-600">{error.context}</p>
      </div>
    </div>
  );
};

export default Error;
