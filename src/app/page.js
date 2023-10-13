"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./components/Footer/Index";
import {
  faBook,
  faCheckCircle,
  faComment,
  faEdit,
  faLightbulb,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Home() {
  // const navigation = useNavic

  const router = useRouter();
  return (
    <>
      <div className="relative w-full" style={{ height: "100vh" }}>
        <img
          src="/background.jpg"
          alt="Your Image"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center flex-col">
          <h1 className="font-1 text-5xl text-white text-center font-bold">
            Lebanese University - Course Review
          </h1>
          <p
            className="text-white font-1"
            style={{ maxWidth: "1000px", padding: 20, fontSize: 25 }}
          >
            <em>
              Our platform is your one-stop destination for comprehensive and
              unbiased course reviews that cater exclusively to the educational
              programs and courses offered by the Lebanese University. Whether
              you're a current student looking to make informed decisions about
              your academic path or a prospective student seeking insights into
              the university's offerings, we've got you covered.
            </em>
          </p>
          <button
            className="btn btn-primary w-64"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>

      <section id="why-choose-us" className="bg-gray-100 py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-semibold mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-box bg-white rounded-lg p-6 shadow-md">
              {/* <i className="fas fa-check-circle text-3xl text-primary mb-4"></i> */}
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-3xl text-primary mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Unbiased Reviews</h3>
              <p>
                Our reviews are impartial and based on real student experiences.
              </p>
            </div>
            <div className="feature-box bg-white rounded-lg p-6 shadow-md">
              {/* <i className="fas fa-book text-3xl text-primary mb-4"></i> */}
              <FontAwesomeIcon
                icon={faBook}
                className="text-3xl text-primary mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Diverse Course Coverage
              </h3>
              <p>
                We cover a wide range of courses, faculties, and departments.
              </p>
            </div>
            <div className="feature-box bg-white rounded-lg p-6 shadow-md">
              <FontAwesomeIcon
                icon={faLightbulb}
                className="text-3xl text-primary mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Helpful Insights</h3>
              <p>
                Get in-depth information on course structures, professors, and
                more.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="how-to-use" className="bg-gray-100 py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-semibold mb-8">
            How to Use Our Website
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-box bg-white rounded-lg p-6 shadow-md">
              {/* <i className="fas fa-search text-3xl text-primary mb-4"></i> */}
              <FontAwesomeIcon
                icon={faSearch}
                className="text-3xl text-primary mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Search and Discover
              </h3>
              <p>
                Use our user-friendly search function to find reviews for
                specific courses, professors, or departments.
              </p>
            </div>
            <div className="feature-box bg-white rounded-lg p-6 shadow-md">
              <i className="fas fa-edit text-3xl text-primary mb-4"></i>
              <FontAwesomeIcon
                icon={faEdit}
                className="text-3xl text-primary mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Contribute Your Experience
              </h3>
              <p>
                If you're a Lebanese University student or alum, help your
                fellow students by sharing your course experiences.
              </p>
            </div>
            <div className="feature-box bg-white rounded-lg p-6 shadow-md">
              <i className="fas fa-comments text-3xl text-primary mb-4"></i>
              <FontAwesomeIcon
                icon={faComment}
                className="text-3xl text-primary mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Engage with the Community
              </h3>
              <p>
                Participate in discussions, ask questions, and get involved with
                the Lebanese University student community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
