"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useLayoutEffect, useState } from "react";

export default function Home() {
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    isValid: true,
  });
  const { username, password, isValid } = formData;

  // Handle Auth
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      push("/dashboard");
    }
  }, []);

  // On Change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isValid: true,
      [e.target.name]: e.target.value,
    }));
  };

  // Validation
  const getValidation = () => {
    return new Promise((resolve) => {
      // Your validation logic here
      if (
        username &&
        username === "test@yopmail.com" &&
        password &&
        password === "1234"
      ) {
        resolve(true);
      } else {
        setFormData((prev) => ({
          ...prev,
          isValid: false,
        }));
        resolve(false);
      }
    });
  };

  // Handle
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const validationStatus = await getValidation();
    if (validationStatus) {
      const timestamp = new Date().getTime().toString();
      localStorage.setItem("token", timestamp);
      push("/dashboard");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="e.g. test@yopmail.com"
              autoComplete="off"
              value={username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="e.g. 1234"
              autoComplete="off"
              value={password}
              onChange={handleChange}
            />
          </div>
          {!isValid && (
            <p className="text-red-500 mb-4">
              Please Login by entering Username test@yopmail.com & Password
              1234. To checkout the users.
            </p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
