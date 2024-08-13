import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="min-h-[calc(100vh-134px)] py-4 px-4 sm:px-12 flex justify-center items-center max-w-[1440px] mx-auto">
        <div className="max-w-[550px] flex-none w-full bg-white border border-black/10 p-6 sm:p-10 lg:px-10 lg:py-14 rounded-2xl loginform dark:bg-darklight dark:border-darkborder">
          <h1 className="mb-2 text-2xl font-semibold text-center dark:text-white">
            Sign In
          </h1>
          <p className="text-center text-muted dark:text-darkmuted">
            Enter your email and password to sign in!
          </p>

          <div className="flex items-center mb-7"></div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              //validation.handleSubmit();
              return false;
            }}
          >
            <div>
              <input
                type="text"
                placeholder="Email"
                className="form-input"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                required
              />
            </div>
            <button
              type="submit"
              className="btn w-full py-3.5 text-base bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
            >
              Sign In
            </button>
          </form>
          <p className="mt-5 text-center text-muted dark:text-darkmuted">
            Not a Member yet?{" "}
            <Link to="/auth-register" className="text-black dark:text-white">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
