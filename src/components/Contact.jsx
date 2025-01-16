import { useNavigate } from "react-router-dom";
function Contact() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-primary font-semibold ">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src="https://prescripto.vercel.app/assets/contact_image-IJu_19v_.png"
          alt="contactImg"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">
            333333 Willms Station <br /> Suite 000, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (000) 000-01010
            <br />
            Email: healthheaven123@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            CAREERS AT HEALTH HEAVEN
          </p>
          <p className="text-gray-600">Learn more about our teams.</p>
          <button
            onClick={() => {
              navigate("/doctors");
            }}
            className="border border-black px-8 py-4 text-sm hover:bg-primary hover:text-white transition-all duration-500"
          >
            Find Doctors
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
