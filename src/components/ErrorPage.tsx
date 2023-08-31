import { navigate } from "raviger";

export const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center text-4xl font-bold text-red-500">Oops!</div>
      <div className="flex flex-col justify-center items-center mt-5 border border-red-500 p-6 rounded-lg">
        <label className="text-center text-xl font-semibold">
          We couldn't find the page you're looking for.
        </label>
        <p className="text-center text-gray-600 mt-3">
          It seems like the page you're trying to access does not exist.
        </p>
        <button
          className="mt-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};