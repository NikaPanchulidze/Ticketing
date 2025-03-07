import axios from "axios";

export async function getServerSideProps() {
  // const response = await axios.get("/api/users/currentuser");
 
  console.log("I was executed")
  // return { props: { currentUser: response.data } }
  return { props: { } }
}

function LandingPage({ currentUser }) {
  // console.log(currentUser)
  
  return (
    <h1>
      Landing page
    </h1>
  )
}

export default LandingPage