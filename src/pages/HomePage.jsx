import { FaArrowRight } from "react-icons/fa6";
import TeamHomeImg from "../../images/Doctor_Team_Home_img.png";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";
function HomePage() {
  return (
    <div className="mt-5">
      <section>
        <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8 home-cont-banner">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-center lg:gap-8">
            <div className="py-5 w-full max-w-lg md:max-w-none md:w-full flex flex-col items-center text-center gap-2 lg:flex lg:flex-column lg:items-start lg:text-left lg:gap-2">
              <h2 className="text-2xl font-semibold text-white sm:text-4xl">
                Book Appointment <br /> With Trusted Doctors
              </h2>

              <p className="mt-4 text-gray-900 sm:text-xl">
                Simply browse through our extensive list of trusted doctors,{" "}
                <br />
                schedule your appointment hassle-free.
              </p>
              <a href="#speciality">
                <button className="mt-4 text-gray-800 bg-white rounded px-6 py-2 flex items-center gap-2 transition-all ease-in-out hover:scale-95 hover:text-teal-600">
                  Book appointment <FaArrowRight className="text-green-900" />
                </button>
              </a>
            </div>
            <div>
              <img
                src={TeamHomeImg}
                className="rounded"
                alt="Doctor_Team_Img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
