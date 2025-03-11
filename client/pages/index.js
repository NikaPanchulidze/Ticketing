import buildClient from "../api/build-client"

export async function getServerSideProps(context) {
  console.log("Landing page!")
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return { props: { currentUser: data.currentUser } }
}

function LandingPage({ currentUser }) {
  // console.log(currentUser)
  return (
    currentUser ? 
    <h1>You are signed in</h1> 
    : 
    <h1>You are NOT signed in</h1>
  )
}

export default LandingPage