import http from "node:http";
import https from "node:https";

const intervalMinutes = 14;
let timeout;

function sendHealthRequest() {
  const base = process.env.FRONTEND_URL;
  if (!base) return;
  const url = new URL("/health", base).href;
  const client = url.startsWith("https:") ? https : http;

  client
    .get(url, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully");
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
}

function scheduleNextRun() {
  const now = new Date();
  const nextRun = new Date(now);
  nextRun.setSeconds(0, 0);
  nextRun.setMinutes((Math.floor(now.getMinutes() / intervalMinutes) + 1) * intervalMinutes);

  timeout = setTimeout(() => {
    sendHealthRequest();
    scheduleNextRun();
  }, nextRun.getTime() - now.getTime());
}

const job = {
  start() {
    if (!timeout) scheduleNextRun();
  },
  stop() {
    clearTimeout(timeout);
    timeout = undefined;
  },
};

export default job;