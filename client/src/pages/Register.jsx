import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <>
      <div className="min-h-[calc(100vh-134px)] py-4 px-4 sm:px-12 flex justify-center items-center max-w-[1440px] mx-auto">
        <div className="max-w-[550px] flex-none w-full bg-white border border-black/10 p-6 sm:p-10 lg:px-10 lg:py-14 rounded-2xl dark:bg-darklight dark:border-darkborder">
          <h1 className="mb-2 text-2xl font-semibold text-center dark:text-white">
            Sign Up
          </h1>
          <div className="flex items-center mb-7">
            <div className="w-full h-[2px] bg-black/10 dark:bg-darkborder"></div>
            <div className="px-5 capitalize text-muted whitespace-nowrap dark:text-darkmuted">
              Enter Your Full Details to Sign Up!
            </div>
            <div className="w-full h-[2px] bg-black/10 dark:bg-darkborder"></div>
          </div>
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                First Name:
              </label>
              <input
                type="text"
                value=""
                placeholder="First Name"
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Last Name:
              </label>
              <input
                type="text"
                value=""
                placeholder="Last Name"
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Age:
              </label>
              <input
                type="text"
                value=""
                placeholder="Enter Age"
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Sex:
              </label>
              <select
                className="form-select"
                type="text"
                value=""
                placeholder="First Name"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Email Address:
              </label>
              <input
                type="text"
                //defaultValue={validation.values.email || ""}
                placeholder="Email"
                className="form-input"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Password:
              </label>
              <input
                type="password"
                //defaultValue={validation.values.password || ""}
                placeholder="Password"
                className="form-input"
                required
              />
            </div>

            <button
              type="submit"
              className="btn sm:col-span-2 w-full py-3.5 text-base bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
            >
              Create an account
            </button>
          </form>
          <p className="mt-5 text-center text-muted dark:text-darkmuted">
            Already a member?{" "}
            <Link to="/auth-login" className="text-black dark:text-white">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register