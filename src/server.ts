import express from "express";
import { nextApp, nextHandler } from "./next-utils";
import payload from "payload";
import { getPayloadClient } from "./get-payload";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`admin url: ${cms.getAdminURL()}`);
      },
    },
  });
};

app.use((req, res) => nextHandler(req, res));

nextApp.prepare().then(() => {
  payload.logger.info("NextJs started on port " + PORT);
  app.listen(PORT, async () => {
    payload.logger.info(
      `NextJs App Url ${process.env.NEXT_PUBLIC_SERVER_URL} `
    );
  });
});

start();
