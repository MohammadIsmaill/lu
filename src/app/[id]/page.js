"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/Navbar";
import {
  faArrowDown,
  faArrowUp,
  faChalkboardUser,
  faCircleUser,
  faStarAndCrescent,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Footer from "../components/Footer/Index";
import useAsync from "../hooks/useAsync";
import courseApi from "../api/course";
import { useEffect, useState } from "react";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

import Rating from "react-rating";

export default function ViewCoursePage({ params }) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [course, setCourse] = useState(null);
  const [comments, setComments] = useState([]);
  const createComment = useAsync({
    fn: courseApi.createComment,
    onSuccess: () => {
      setShowModal(false);
      setReview("");
      setRating("");
      setComments((prev) => [createComment.result, ...prev]);
      alert("comment created successfully");
    },
  });

  const getComments = useAsync({
    fn: courseApi.getComments,
    onSuccess: () => {
      setComments(getComments.result);
    },
    onError: () => {},
  });
  const getCourse = useAsync({
    fn: courseApi.getCourse,
    onSuccess: () => {
      setCourse(getCourse.result);
    },
    onError: () => {},
  });

  useEffect(() => {
    const { id } = params;
    if (id) {
      getCourse.main({ courseId: id });
      getComments.main({ courseId: id });
    }
  }, [params]);

  if (getCourse.loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Navbar />
      <div className=" bg-base-200">
        <div className="py-5 px-3 ">
          <div className="  card  bg-base-100 shadow-xl max-w-md mx-2 my-3 md:col-span-4 sm:col-span-6">
            <div className="card-body">
              <h2 className="card-title hover:underline hover:cursor-pointer">
                {course?.name}
              </h2>
              <div className="flex justify-center items-center gap-2">
                <FontAwesomeIcon icon={faChalkboardUser} />
                <p>Dr. {course?.doctor}</p>
              </div>

              <p className="font-semibold" style={{ alignSelf: "end" }}>
                {course?.views} views
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 max-w-md bg-white mx-5 p-5 rounded-lg shadow-xl mb-5">
          <h1 className="font-bold">Major</h1>
          <h1>{course?.major}</h1>
          <h1 className="font-bold">Language</h1>
          <h1>{course?.language}</h1>
          <h1 className="font-bold">Semester</h1>
          <h1>{course?.semester}</h1>
          <h1 className="font-bold">Year</h1>
          <h1>{course?.year}</h1>
        </div>
        <div className="mx-5">
          <label
            htmlFor="my_modal_6"
            onClick={() => {
              setShowModal(true);
            }}
            className="btn btn-warning"
          >
            Create Review
          </label>
        </div>

        <div style={{ padding: 50 }}>
          <h1 className="text-3xl  font-semibold  mt-5">Reviews</h1>
          {comments.map((comment) => {
            return (
              <div className="bg-white shadow-lg p-4 my-10 flex flex-col justify-start items-start rounded-lg">
                <div className="flex gap-2">
                  <FontAwesomeIcon icon={faCircleUser} className="text-2xl" />
                  <h3 className="font-bold">User</h3>
                </div>
                <div className="rating">
                  <Rating
                    emptySymbol={
                      <FontAwesomeIcon
                        icon={regularStar}
                        className="text-orange-200"
                      />
                    }
                    fullSymbol={
                      <FontAwesomeIcon
                        icon={solidStar}
                        className="text-orange-500"
                      />
                    }
                    readonly={true}
                    initialRating={comment.rating}
                  />
                </div>
                <p>{comment.description ?? "No"}</p>
              </div>
            );
          })}
        </div>
      </div>

      <input
        checked={showModal}
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-3">
            <Rating
              initialRating={0}
              onChange={(e) => {
                console.log(e);
                setRating(e);
              }}
              emptySymbol={
                <FontAwesomeIcon
                  icon={regularStar}
                  className="text-orange-200"
                />
              }
              fullSymbol={
                <FontAwesomeIcon icon={solidStar} className="text-orange-500" />
              }
            />
            <textarea
              className="textarea textarea-bordered"
              style={{ height: "200px" }}
              placeholder="Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>

          <div className="modal-action">
            <button
              disabled={createComment.loading}
              className="btn btn-warning"
              onClick={() => {
                createComment.main({ courseId: params.id, review, rating });
              }}
            >
              {createComment.loading ? "Loading..." : "Create Review"}
            </button>
            <label
              onClick={() => {
                setShowModal(false);
              }}
              htmlFor="my_modal_6"
              className="btn"
            >
              Close!
            </label>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
