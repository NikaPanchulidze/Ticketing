import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@npticketing/common";

import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test"
}))

app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

app.all("*", async () => {
  throw new NotFoundError()
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export { app };