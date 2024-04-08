import { useRouteError } from "react-router-dom";

export default function ErrorPage() {

  const error = useRouteError();
  console.error(error);
  
  return (
    <>
      <h1>What?</h1>
      <h2>An error occured here. You aren't supposed to see this.</h2>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  )

}