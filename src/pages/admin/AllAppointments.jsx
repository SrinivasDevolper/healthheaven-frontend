import React from "react";
import AdminNavbar from "./Sidebar";
import useAdminApis from "./AdminApis";
import { DNA } from "react-loader-spinner";
function AllAppointments() {
  const appointmentData = useAdminApis("all-appointment");
  if (appointmentData.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }
  if (appointmentData.error.status) {
    return (
      <div>
        <h1 className="text-red-500 font-bold">
          *{adminAppointments.error.msg}
        </h1>
      </div>
    );
  }
  console.log(appointmentData.apiData, "appointmentData.apiData");
  return (
    <div className="flex">
      <AdminNavbar />
      <div class="relative overflow-x-auto flex-1 ml-5 mt-5">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Patient (name)
              </th>
              <th scope="col" class="px-6 py-3">
                Patient (email)
              </th>
              <th scope="col" class="px-6 py-3">
                Date & Time
              </th>
              <th scope="col" class="px-6 py-3">
                Doctor (name)
              </th>
              <th scope="col" class="px-6 py-3">
                Fees
              </th>
              <th scope="col" class="px-6 py-3">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {appointmentData.apiData.map((eachData) => (
              <tr
                class="bg-white dark:bg-gray-800"
                key={eachData.appiontmentId}
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {eachData.userName}
                </th>
                <td class="px-6 py-4">{eachData.userEmail}</td>
                <td class="px-6 py-4">
                  Booked on {eachData.appointmentDate}{" "}
                  {eachData.appointmentTime}
                </td>
                <td class="px-6 py-4">{eachData.doctorName}</td>
                <td class="px-6 py-4">{eachData.appoitmentFees}Rs.</td>
                <td class="px-6 py-4">{eachData.appointmentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAppointments;
