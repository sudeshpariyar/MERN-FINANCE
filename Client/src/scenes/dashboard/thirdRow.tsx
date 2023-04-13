import ChartHeader from "@/components/ChartHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionQuery,
} from "@/states/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const ThirdRow = () => {
  const { palette } = useTheme();

  const { data: transactionData } = useGetTransactionQuery();
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const pieColors = [palette.primary[800], palette.primary[300]];

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpences = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: Number(value.slice(1)),
            },
            {
              name: `${key} of Total`,
              value: Number(totalExpences.slice(1)) - Number(value.slice(1)),
            },
          ];
        }
      );
    }
  }, [kpiData]);

  const transactionalColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.6,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.4,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.2,
      renderCell: (params: GridCellParams) => `${params.value}`.length,
    },
  ];

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
  ];
  return (
    <>
      <DashboardBox gridArea="g">
        <ChartHeader
          title="Products List"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnSeperator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            rowHeight={25}
            columnHeaderHeight={25}
            hideFooter={true}
            getRowId={(productData) => productData._id}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h">
        <ChartHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} products`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnSeperator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            rowHeight={25}
            columnHeaderHeight={25}
            hideFooter={true}
            getRowId={(transactionData) => transactionData._id}
            rows={transactionData || []}
            columns={transactionalColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="i">
        <ChartHeader title="Expense Breakdown" sideText="%8" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="j">
        <ChartHeader title="Summary and Explaination Data" sideText="%8" />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="88%"
          ></Box>
        </Box>
        <Typography margin="1rem" variant="h6">
          Many approaches to data analysis may be viewed as data
          “summarization”. The most immediate effect of summarizing data is to
          take data that may be overwhelming to work with, and reduce it to a
          few key summary values that can be viewed, often in a table or plot.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default ThirdRow;
