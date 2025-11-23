import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center p-10">
      <h1 className="text-4xl font-bold text-blue-700">
        AI Disease Prediction
      </h1>

      <p className="mt-4 text-gray-600 max-w-md">
        Enter your symptoms and let our AI predict the most likely cause and medical precautions.
      </p>

      <Link to="/chat">
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Start Chat
        </button>
      </Link>
    </div>
  );
}

export default Home;
