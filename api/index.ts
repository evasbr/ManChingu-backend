import express from "express";
import ErrorHandling from "../src/handler/error-handler.js";
import Router from "../src/routes/index.js";

const app = express();
app.use(express.json());

app.use(Router);

app.use(ErrorHandling);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
