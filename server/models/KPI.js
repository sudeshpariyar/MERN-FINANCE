import mongoose from "mongoose";

const Schema = mongoose.Schema;

const monthSchema = new Schema({
  month: String,
  revenue: String,
  expenses: String,
  operationalExpenses: String,
  nonOperationalExpenses: String,
});

const daySchema = new Schema({
  date: String,
  revenue: String,
  expenses: String,
});

const KPISchema = new Schema(
  {
    totalProfit: String,
    totalRevenue: String,
    totalExpenses: String,
    expensesByCategory: {
      type: Map,
      of: String,
    },
    monthlyData: [monthSchema],
    dailyData: [daySchema],
  },
  { timestamps: true }
);

const KPI = mongoose.model("KPI", KPISchema);
export default KPI;
