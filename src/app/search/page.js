"use client";
import {
  faChalkboard,
  faChalkboardUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Index";
import useAsync from "../hooks/useAsync";
import courseApi from "../api/course";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  const [query, setQuery] = useState("");
  const getCourses = useAsync({
    fn: courseApi.getCourses,
    onSuccess: () => {
      setCourses(getCourses.result);
    },
    onError: () => {
      console.log(getCourses.error);
    },
  });

  const [typingTimeout, setTypingTimeout] = useState(null);
  const handleSearch = (value) => {
    setQuery(value);

    // Clear the previous typingTimeout if it exists
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new typingTimeout
    const newTypingTimeout = setTimeout(() => {
      // Perform the search after the delay
      searchCourses.main({ text: value });
    }, 300); // Adjust the delay time as needed (e.g., 300ms)

    setTypingTimeout(newTypingTimeout);
  };

  const searchCourses = useAsync({
    fn: courseApi.searchCourses,
    onSuccess: () => {
      setCourses(searchCourses.result);
    },
    onError: () => {},
  });

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-5 mx-10 gap-3">
        <div className="form-control">
          <div className="input-group">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search…"
              className="input input-bordered"
            />
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <select className="select select-bordered">
            <option>Major</option>
          </select>
        </div>
        <div>
          <select className="select select-bordered">
            <option>Year</option>
          </select>
        </div>
        <div>
          <select className="select select-bordered">
            <option>Semester</option>
          </select>
        </div>
      </div>

      <div className="bg-base-200 grid grid-cols-12   p-5 mt-5">
        {courses.loading ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          courses.map((item) => {
            return (
              <div className="card  bg-base-100 shadow-xl mx-2 my-3 md:col-span-4 sm:col-span-6">
                <div className="card-body">
                  <h2
                    className="card-title hover:underline hover:cursor-pointer"
                    onClick={() => {
                      router.push(`/${item._id}`);
                    }}
                  >
                    {item.name}
                  </h2>
                  <div className="badge badge-primary mb-4">{item.major}</div>

                  <div className="flex justify-center items-center gap-2">
                    <FontAwesomeIcon icon={faChalkboardUser} />
                    <p>Dr.{item.doctor}</p>
                  </div>

                  <p className="font-semibold" style={{ alignSelf: "end" }}>
                    {item.views} views
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </>
  );
}
