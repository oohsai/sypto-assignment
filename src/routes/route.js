const express = require("express");
const FyersAPI = require("fyers-api-v3").fyersModel;
const authenticate = require("../middleware/authMiddleware");
const SellOrderRequestSchema = require("../schemas/sellSchema");
const {
  MultiBuyOrderSchema,
  BuyOrderRequestSchema,
} = require("../schemas/buySchema");
const { startFyersWebSocket } = require("../middleware/socket");

const router = express.Router();
const fyers = new FyersAPI();

router.use(express.json());
router.use(authenticate);

router.post("/multi-buy-order", async (req, res) => {
  const { success } = MultiBuyOrderSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Insufficient details",
    });
  }

  try {
    const response = await fyers.place_order(success);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/buy-order", async (req, res) => {
  const { success } = BuyOrderRequestSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Insufficient details",
    });
  }

  try {
    const response = await fyers.place_order(success);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/sell-order", async (req, res) => {
  const { success } = SellOrderRequestSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Insufficient details",
    });
  }

  try {
    const response = await fyers.place_order(success);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle postback from the broker
router.post("/postback", (req, res) => {
  try {
    const payload = req.body;
    console.log("Received payload:", payload);
    res.status(200).send("Postback received successfully");
  } catch (error) {
    console.error("Error processing postback:", error);
    res.status(500).send("Internal server error");
  }
});

router.post("/websocket", async (req, res) => {
  const { symbol } = req.body;
  if (!symbol) {
    return res.json({ message: "Send apt symbols" });
  }
  try {
    await startFyersWebSocket(symbol);
    res.json({ message: "WebSocket started successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error starting WebSocket" });
  }
});

module.exports = router;
