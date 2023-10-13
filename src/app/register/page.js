"use client";
import { useContext, useEffect, useState } from "react";
import useAsync from "../hooks/useAsync";
import userApi from "../api/auth";
import { AuthContext } from "../store/auth-context";
import { useRouter } from "next/navigation";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate, token } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/search");
    }
  }, [token]);
  const register = useAsync({
    fn: userApi.register,
    onSuccess: () => {
      console.log(register.result);
      authenticate(register.result.jwtToken);
    },
    onError: () => {
      alert(register.error);
    },
  });
  return (
    <div
      style={{ height: "100vh" }}
      className="flex items-center justify-center flex-col gap-5"
    >
      <h1 className="text-lg font-bold">
        Lebanese University - Course Review{" "}
      </h1>

      <input
        className="input input-bordered w-full max-w-md"
        placeholder="Firstname"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        className="input input-bordered w-full max-w-md"
        placeholder="Lastname"
      />
      <input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        className="input input-bordered w-full max-w-md"
        placeholder="username"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="input input-bordered w-full max-w-md"
        placeholder="password"
      />
      <button
        onClick={() => {
          register.main({ firstName, lastName, password, username });
        }}
        disabled={register.loading}
        className="btn btn-primary"
      >
        {register.loading ? "Loading..." : "Register"}
      </button>

      <h1>
        Have an account? <a href="/login">Login</a>
      </h1>
    </div>
  );
}
