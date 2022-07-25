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
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="flex py-40 justify-center w-full">
      <div className="flex flex-col w-64 sm:w-72 shadow-md p-10 border-2 border-fuchsia-300 rounded-md">
        <h2 className="text-center text-xl mb-4 text-fuchsia-500">
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
      {error && <span className="text-red-600 mt-4">Wrong Credentials!</span>}
    </div>
  );
};

export default Login;
