import { useParams } from "react-router-dom";

function BookFlight() {
  const { id } = useParams();

  return <h1>Book Flight Page: {id}</h1>;
}

export default BookFlight;