const { z } = require("zod");

const SymbolSchema = z.string();
const HoldingTypeSchema = z.enum(["T1", "HLD"]);
const QuantitySchema = z.number().int();
const RemainingQuantitySchema = z.number().int();
const PLSchema = z.number();
const CostPriceSchema = z.number();
const MarketValSchema = z.number();
const LTPSchema = z.number();
const IdSchema = z.number().int();
const FytokenSchema = z.string();
const ExchangeSchema = z.enum([10, 11, 12]);
const SegmentSchema = z.enum([10, 11, 12, 20]);
const ISINSchema = z.string();
const QtyT1Schema = z.number().int();
const RemainingPledgeQuantitySchema = z.number().int();
const CollateralQuantitySchema = z.number().int();

const HoldingSchema = z.object({
  symbol: SymbolSchema,
  holdingType: HoldingTypeSchema,
  quantity: QuantitySchema,
  remainingQuantity: RemainingQuantitySchema,
  pl: PLSchema,
  costPrice: CostPriceSchema,
  marketVal: MarketValSchema,
  ltp: LTPSchema,
  id: IdSchema,
  fytoken: FytokenSchema,
  exchange: ExchangeSchema,
  segment: SegmentSchema,
  isin: ISINSchema,
  qty_t1: QtyT1Schema,
  remainingPledgeQuantity: RemainingPledgeQuantitySchema,
  collateralQuantity: CollateralQuantitySchema,
});

module.exports = HoldingSchema;
