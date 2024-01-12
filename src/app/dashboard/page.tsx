"use client";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { User } from "../../utils/types";

export default function Dashboard() {
  const { push } = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userList, setUserList] = useState<Array<User>>([]);

  // Get UserData from Local API
  const getData = async () => {
    const res = await fetch("/api/userData", {
      method: "GET",
    });
    if (res && res.status === 200) {
      const data = await res.json();
      setUser(data);
    }
  };

  // Get Dummy User List from Third Part Url
  const getUserList = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
    });
    if (res && res.status === 200) {
      const data = await res.json();
      setUserList(data);
    }
  };

  useEffect(() => {
    getUserList();
    getData();
  }, []);

  // Handle Auth
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      push("/");
    }
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    push("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white w-full p-4">
        <div className="flex justify-between mb-4">
          <span>Welcome! {user.name}</span>
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <table className="table-auto text-left w-full bg-white border-collapse text-sm">
          <thead>
            <tr className="bg-slate-200">
              <th className="border-b font-bold p-4">ID</th>
              <th className="border-b font-bold p-4">Name</th>
              <th className="border-b font-bold p-4">E-Mmail</th>
              <th className="border-b font-bold p-4">Phone</th>
            </tr>
          </thead>
          <tbody>
            {userList &&
              userList.length > 0 &&
              userList.map((user) => (
                <tr>
                  <td className="border-b p-4">{user.id}</td>
                  <td className="border-b p-4">{user.name}</td>
                  <td className="border-b p-4">{user.email}</td>
                  <td className="border-b p-4">{user.phone}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
