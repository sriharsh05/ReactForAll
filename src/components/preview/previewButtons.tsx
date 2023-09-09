import { Link } from "raviger";

export function PreviewButtons({
  currentIndex,
  formLength,
  nextQuestion,
  prevQuestion,
}: {
  currentIndex: number;
  formLength: number;
  nextQuestion: () => void;
  prevQuestion: () => void;
}) {
  return (
    <div className="flex justify-end w-full gap-2">
      {currentIndex === 0 && (
        <Link
          href="/"
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          <div className="inline-flex items-center">
            <span className=" ml-2 font-semibold">Cancel</span>
          </div>
        </Link>
      )}
      {currentIndex !== 0 && (
        <button
          onClick={prevQuestion}
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          <div className="inline-flex items-center">
            <span className=" ml-2 font-semibold">Previous</span>
          </div>
        </button>
      )}
      {currentIndex !== formLength && (
        <button
          onClick={nextQuestion}
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          <div className="inline-flex items-center">
            <span className=" ml-2 font-semibold">Next</span>
          </div>
        </button>
      )}
      {currentIndex === formLength && (
        <button
          onClick={nextQuestion}
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          <div className="inline-flex items-center">
            <span className=" ml-2 font-semibold">Submit</span>
          </div>
        </button>
      )}
    </div>
  );
}
