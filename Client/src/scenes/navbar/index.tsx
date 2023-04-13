import FlexBetween from "@/components/FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [selected, setSelected] = useState("dashboard");
  const { palette } = useTheme();
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      <FlexBetween gap="0.75rem">
        <AcUnitIcon sx={{ fontSize: "2rem" }} />
        <Typography variant="h4" fontSize="1.25rem">
          AppFinance
        </Typography>
      </FlexBetween>
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              textDecoration: "inherit",
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/predection"
            onClick={() => setSelected("predection")}
            style={{
              textDecoration: "inherit",
              color: selected === "predection" ? "inherit" : palette.grey[700],
            }}
          >
            predection
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
