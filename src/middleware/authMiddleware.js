const express = require("express");
const axios = require("axios");
const sha256 = require("sha256");
const { setAppSecret, setAppId, redirect_url } = require("../config");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const APP_ID = setAppId;

const APP_SECRET = setAppSecret;

const REDIRECT_URL = redirect_url;

const fyers = axios.create({
  baseURL: "https://api-t1.fyers.in/api/v3/",
});

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Access token is missing" });
    }
    next();
  } catch (error) {
    console.error("Error authenticating request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

app.get("/generate-authcode", (req, res) => {
  const authcodeUrl = `generate-authcode?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URL
  )}&response_type=code&state=sample_state`;
  res.redirect(`https://api-t1.fyers.in/api/v3/${authcodeUrl}`);
});

app.post("/validate-authcode", async (req, res) => {
  try {
    const { code } = req.body;
    const appIdHash = sha256(`${APP_ID}${APP_SECRET}`);

    const response = await fyers.post("validate-authcode", {
      grant_type: "authorization_code",
      appIdHash,
      code,
    });

    const { s, access_token } = response.data;
    if (s === "ok" && access_token) {
      res.json({ access_token });
    } else {
      res.status(400).json({ message: "Failed to obtain access token" });
    }
  } catch (error) {
    console.error("Error validating auth code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/secure-route", authenticate, (req, res) => {
  res.json({ message: "Access granted to secure route" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = authenticate;
