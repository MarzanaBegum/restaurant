import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post("https://pizza-restaurant-amber.vercel.app/api/login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="flex justify-center w-full py-40">
      <div className="flex flex-col w-64 p-10 border-2 rounded-md shadow-md sm:w-72 border-fuchsia-300">
        <h2 className="mb-4 text-xl text-center text-fuchsia-500">
          Admin Dashboard
        </h2>
        <input
          type="text"
          placeholder="User name"
          className="h-7 mb-3 w-[100%]"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="h-7 mb-3 w-[100%]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="bg-fuchsia-600 text-white w-[100%] rounded-md py-2"
        >
          Sign In
        </button>
      </div>
      <div>
        {error && <span className="mt-4 text-red-600">Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
