import React, { useState } from "react";
import mainUrl from "./MainUrl";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import cookies from "js-cookie";
function Login() {
  const [state, setState] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state !== "Sign In") {
      const userSignInDetails = {
        name,
        email,
        password,
      };
      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userSignInDetails),
      };
      // console.log(state, "State Changed");
      try {
        const response = await fetch(`${mainUrl}register`, options);
        const data = await response.json();
        toast(data.message);
        navigate("/login");
        setEmail("");
        setName("");
        setPassword("");
      } catch (err) {
        toast(err);
        console.log(err);
      }
    } else {
      // console.log(state);
      const userSignInDetails = {
        email,
        password,
      };
      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userSignInDetails),
      };
      try {
        const response = await fetch(`${mainUrl}login`, options);
        const data = await response.json();
        const { jwtToken, payload } = data;
        toast(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (jwtToken !== undefined && payload.role === "user") {
          cookies.set("token", jwtToken, { expires: 10 });
          cookies.set("role", JSON.stringify(payload), { expires: 10 });
          navigate("/");
        }
        console.log("role", payload.role);
        if (jwtToken && payload.role === "admin") {
          console.log("working");
          cookies.set("token", jwtToken, { expires: 10 });
          cookies.set("role", JSON.stringify(payload), { expires: 10 });
          navigate("/admin-dashboard");
        }
      } catch (err) {
        toast(err);
        console.log(err);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow">
          <p className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p className="w-full">
            Please {state === "Sign Up" ? "Create Account" : "Login"} to book
            appointment
          </p>
          {state === "Sign Up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full pt-2 mt-1"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full pt-2 mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zinc-300 rounded w-full pt-2 mt-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md text-base">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>
          {state === "Sign Up" ? (
            <p>
              Already have an account?
              <span
                onClick={() => setState("Sign In")}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an new account?
              <span
                onClick={() => setState("Sign Up")}
                className="text-primary underline cursor-pointer"
              >
                click here
              </span>
            </p>
          )}
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export default Login;
