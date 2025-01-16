import React, { useEffect, useState } from "react";
import AdminNavbar from "./Sidebar";
import useAdminApis from "./AdminApis";
import mainUrl from "../../components/MainUrl";
function AddDoctors() {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [availbilty, setAvailbilty] = useState(true);
  const newDoctor = {
    name,
    email,
    password,
    experience,
    fees,
    about,
    available: availbilty,
    speciality,
    degree,
    address1,
    address2,
    slots_booked: "",
  };
  const apiFetch = async (api) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNTU3Mzc0OX0.2dtJxlPQ1AF_eEdN_ue_PB5z3ro12G6SuMSDCwCyCYM",
      },
      body: JSON.stringify(newDoctor),
    };
    const response = await fetch(`${mainUrl}admin/${api}`, options);
    const data = await response.json();
    console.log(data, "data", response);
    setName("");
    setEmail("");
    setPassword("");
    setFees("");
    setAbout("");
    setAddress1("");
    setAddress2("");
    setAvailbilty(true);
    setSpeciality("General physician");
    setExperience("1 Year");
    setDegree("");
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    apiFetch("add-doctor");
  };
  return (
    <div className="flex items-start">
      <AdminNavbar />
      <div className="ml-5 mt-3">
        <form onSubmit={onSubmitHandler} className="md-3 w-full">
          <p className="mb-3 text-lg font-medium">Add Doctor</p>
          <div className="bg-white px-8 py-8 border w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
            <div className="flex items-center gap-4 mb-8 text-gray-500">
              <label htmlFor="doc-image">
                <img
                  src={
                    docImg
                      ? URL.createObjectURL(docImg)
                      : "https://cdn.vectorstock.com/i/thumb-large/75/84/default-placeholder-doctor-half-length-portrait-vector-20847584.jpg"
                  }
                  alt="profile img"
                  className="w-28 h-28 bg-gray-100 object-fit rounded-full cursor-pointer"
                />
              </label>
              {/* <input
                onChange={(e) => setDocImg(e.target.files[0])}
                type="file"
                id="doc-image"
                hidden
              /> */}
              <p>
                Upload doctor <br /> picture
              </p>
            </div>
            <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
              <div className="w-full lg:flex-1 flex flex-col gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <p>DOCTOR NAME</p>
                  <input
                    className="border rounded px-3 py-2"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>DOCTOR EMAIL</p>
                  <input
                    className="border rounded px-3 py-2"
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>DOCTOR PASSWORD</p>
                  <input
                    className="border rounded px-3 py-2"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>DOCTOR AVAILBILTY</p>
                  <select
                    className="border rounded px-3 py-2"
                    onChange={(e) => setAvailbilty(e.target.value)}
                  >
                    <option value={true}>AVAILBLE</option>
                    <option value={false}>NOT AVAILBLE</option>
                  </select>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Experience</p>
                  <select
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                    className="border rounded px-3 py-2"
                    name=""
                    id=""
                  >
                    <option value="1 Year">1 Year</option>
                    <option value="2 Year">2 Year</option>
                    <option value="3 Year">3 Year</option>
                    <option value="4 Year">4 Year</option>
                    <option value="5 Year">5 Year</option>
                    <option value="6 Year">6 Year</option>
                    <option value="7 Year">7 Year</option>
                    <option value="8 Year">8 Year</option>
                    <option value="9 Year">9 Year</option>
                    <option value="10 Year">10 Year</option>
                  </select>
                  <div className="flex-1 flex flex-col gap-1">
                    <p>FEES</p>
                    <input
                      className="border rounded px-3 py-2"
                      type="number"
                      placeholder="fees"
                      onChange={(e) => setFees(e.target.value)}
                      value={fees}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:flex-1 flex flex-col gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <p>Speciality</p>
                  <select
                    onChange={(e) => setSpeciality(e.target.value)}
                    value={speciality}
                    className="border rounded px-3 py-2"
                    name=""
                    id=""
                  >
                    <option value="Neurologist">Neurologist</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Endocrinologist">Endocrinologist</option>
                    <option value="Nephrologist">Nephrologist</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                  <div className="flex-1 flex flex-col gap-1">
                    <p>Education</p>
                    <input
                      className="border rounded px-3 py-2"
                      type="text"
                      placeholder="Education"
                      onChange={(e) => setDegree(e.target.value)}
                      value={degree}
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <p>Address</p>
                    <input
                      className="border rounded px-3 py-2"
                      type="text"
                      placeholder="Address 1"
                      onChange={(e) => setAddress1(e.target.value)}
                      value={address1}
                      required
                    />
                    <input
                      className="border rounded px-3 py-2"
                      type="text"
                      placeholder="Address 2"
                      onChange={(e) => setAddress2(e.target.value)}
                      value={address2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="mt-4 mb-2 ">About Doctor</p>
              <textarea
                className="w-full px-4 pt-2 border rounded"
                type="text"
                placeholder="write about doctor"
                rows={5}
                onChange={(e) => setAbout(e.target.value)}
                value={about}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDoctors;
