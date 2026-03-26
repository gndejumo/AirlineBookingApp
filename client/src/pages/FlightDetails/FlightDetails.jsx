import { useParams } from "react-router-dom";

function FlightDetails() {
  const { id } = useParams();

  return <h1>Flight Details Page: {id}</h1>;
}

export default FlightDetails;