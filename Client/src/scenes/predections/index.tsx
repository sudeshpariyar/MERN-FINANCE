import { Box, Button, Typography, useTheme } from "@mui/material";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useState, useMemo } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetKpisQuery } from "@/states/api";
import regression, { DataPoint } from "regression";

const Predection = () => {
  const { palette } = useTheme();
  const [isPredection, setIsPredection] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted: DataPoint[] = monthData.map(({ revenue }, i: number) => {
      return [i, Number(revenue.slice(1))];
    });
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revanue": Number(revenue.slice(1)),
        "Regression Line": regressionLine.points[i][1],
        "Predection Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);

  return (
    <DashboardBox height="100%" padding="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem">
        <Box>
          <Typography variant="h3">Predection and Revanue</Typography>
          <Typography variant="h5">
            Simple linear regression model for predecting future revenue
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredection(!isPredection)}
          sx={{
            color: palette.grey[500],
            backgroundColor: palette.grey[800],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)",
          }}
        >
          Predict Next Year
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickLine={false}
            style={{ fontSize: "0.75rem" }}
          >
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 30000]}
            style={{ fontSize: "1rem" }}
            axisLine={{ strokeWidth: "0" }}
            tickFormatter={(v) => `${v}`}
          >
            <Label
              value="Revenue"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>

          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revanue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke={palette.secondary[500]}
            dot={false}
          />
          {isPredection && (
            <Line
              type="monotone"
              dataKey="Predection Revenue"
              stroke="blueviolet"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predection;
