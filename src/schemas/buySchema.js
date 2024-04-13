const { z } = require("zod");

// Define schemas for each attribute
const SymbolSchema = z.string();
const QtySchema = z.number().int();
const TypeSchema = z.enum([1, 2, 3, 4]);
const SideSchema = z.enum([1]);
const ProductTypeSchema = z.enum(["CNC", "INTRADAY", "MARGIN", "CO", "BO"]);
const LimitPriceSchema = z.number().default(0);
const StopPriceSchema = z.number().default(0);
const DisclosedQtySchema = z.number().int().default(0);
const ValiditySchema = z.enum(["IOC", "DAY"]);
const OfflineOrderSchema = z.boolean().default(false);
const StopLossSchema = z.number().default(0);
const TakeProfitSchema = z.number().default(0);
const OrderTagSchema = z.string().optional();

const BuyOrderRequestSchema = z.object({
  symbol: SymbolSchema,
  qty: QtySchema,
  type: TypeSchema,
  side: SideSchema,
  productType: ProductTypeSchema,
  limitPrice: LimitPriceSchema,
  stopPrice: StopPriceSchema,
  disclosedQty: DisclosedQtySchema,
  validity: ValiditySchema,
  offlineOrder: OfflineOrderSchema,
  stopLoss: StopLossSchema,
  takeProfit: TakeProfitSchema,
  orderTag: OrderTagSchema,
});

const MultiBuyOrderSchema = z.array(BuyOrderRequestSchema);

module.exports = { BuyOrderRequestSchema, MultiBuyOrderSchema };
