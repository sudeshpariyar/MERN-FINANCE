import ChartHeader from "@/components/ChartHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/states/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  CartesianGrid,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const pieData = [
  { name: "First Group", value: 800 },
  { name: "Second Group", value: 1800 },
];

const SecondRow = () => {
  const { palette } = useTheme();
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const pieColors = [palette.primary[800], palette.primary[300]];

  const productExpaeseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: Number(price.slice(1)),
          expense: Number(expense.slice(1)),
        };
      })
    );
  }, [productData]);

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": Number(operationalExpenses.slice(1)),
            "Non operational expenses": Number(nonOperationalExpenses.slice(1)),
          };
        }
      )
    );
  }, [operationalData]);

  return (
    <>
      <DashboardBox gridArea="d">
        <ChartHeader
          title="Operational vs Non-Operational Revenue"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "0.75rem" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              style={{ fontSize: "0.75rem" }}
              axisLine={false}
            />
            <YAxis
              yAxisId="right"
              tickLine={false}
              style={{ fontSize: "0.75rem" }}
              axisLine={false}
              orientation="right"
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non operational expenses"
              stroke={palette.tertiary[500]}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e">
        <ChartHeader title="Targets" sideText="+4%" />

        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              88
            </Typography>
            <Typography variant="h6">
              Finance Goal that is desired from the campaign
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Revenue Loss</Typography>
            <Typography variant="h6">Loss is 25% down</Typography>
            <Typography m="0.4rem 0" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins Up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="f">
        <ChartHeader title="Expense vs Product Price" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => "$" + v.toString()}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => "$" + v.toString()}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => "$" + v.toString()} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpaeseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default SecondRow;
