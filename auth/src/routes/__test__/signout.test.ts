import request from "supertest";
import { app } from "../../app";

it("clears the cookiea fter signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  console.log(res.get("Set-Cookie"));
  const cookie = res.get("Set-Cookie");
  if (!cookie) {
    throw new Error("Expected cookie but got undefined.");
  }
 
  expect(cookie[0]).toEqual(
    "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
})