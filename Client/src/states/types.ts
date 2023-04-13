export interface ExpencesByCategory {
  salaries: string;
  services: string;
  supplies: string;
}
export interface Month {
  expenses: string;
  month: string;
  nonOperationalExpenses: string;
  operationalExpenses: string;
  revenue: string;
  id: string;
}
export interface Day {
  expenses: string;
  date: string;
  revenue: string;
  id: string;
}

export interface GetKpisResponse {
  id: string;
  _id: string;
  __v: number;
  totalProfit: string;
  totalRevenue: string;
  totalExpenses: string;
  expensesByCategory: ExpencesByCategory;
  monthlyData: Month[];
  dailyData: Day[];
  createdAt: string;
  updatedAt: string;
}
export interface GetProductsResponse {
  id: string;
  _id: string;
  __v: number;
  price: string;
  expense: string;
  transactions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetTransactionsResponse {
  _id: string;
  buyer: string;
  amount: string;
  productIds: string[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}
