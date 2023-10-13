"use client";
import { useContext, useEffect, useState } from "react";
import useAsync from "../hooks/useAsync";
import userApi from "../api/auth";
import { AuthContext } from "../store/auth-context";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate, token } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/search");
    }
  }, [token]);
  const handleLogin = useAsync({
    fn: userApi.login,
    onSuccess: () => {
      authenticate(handleLogin.result);
    },
    onError: () => {
      alert(handleLogin.error);
    },
  });
  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="flex items-center justify-center flex-col gap-5"
      >
        <h1 className="text-lg font-bold">
          Lebanese University - Course Review{" "}
        </h1>
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          className="input input-bordered w-full max-w-md"
          placeholder="Username"
          type="text"
        />
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          className="input input-bordered w-full max-w-md"
          placeholder="Password"
        />
        <button
          disabled={handleLogin.loading}
          className="btn btn-primary w-full max-w-md"
          onClick={() => {
            handleLogin.main({
              username,
              password,
            });
          }}
        >
          {handleLogin.loading ? "Loading..." : "Login"}
        </button>

        <h1>
          Don t have an account? <a href="/register">Register</a>
        </h1>
      </div>
    </>
  );
}
