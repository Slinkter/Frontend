import React from "react";
import { Link, useRouteError } from "react-router";

const Error = () => {
  const error = useRouteError();

  /*   
  console.log(error.data);
  console.log(error.error);
  console.log(error.internal);
  console.log(error.status);
  console.log(error.statusText);
   */

  if (!error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not Found
          </h1>

          <p className="mt-6 text-lg leading-7">
            Sorry , we cound not find the page you are looking for
          </p>
          <div className="mt-10">
            <Link className="btn btn-secondary">Go back Home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="text-center font-bold text-4xl">there was an error....</h4>
    </main>
  );
};

export default Error;
