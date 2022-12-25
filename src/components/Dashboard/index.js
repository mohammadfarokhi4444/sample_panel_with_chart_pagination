import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Brush,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { useTranslation } from "react-i18next";
import { useUserDispatch } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import "../../assets/style/dashboard.css";
import { useState } from "react";
import FetchApi from "../../services/FetchApi";

const Dashboard = () => {
  const [data, setData] = useState([
    {
      appetizer: 1600,
      dessert: 0.1,
    },
    {
      appetizer: 1650,
      dessert: 0.3,
    },
    {
      appetizer: 1730,
      dessert: 0.4,
    },
    {
      appetizer: 1780,
      dessert: 0.2,
    },
    {
      appetizer: 1620,
      dessert: 0.5,
    },
    {
      appetizer: 1900,
      dessert: 0.2,
    },
    {
      appetizer: 1500,
      dessert: 0.8,
    },
    {
      appetizer: 1840,
      dessert: 0.7,
    },
    {
      appetizer: 1830,
      dessert: 0.4,
    },
    {
      appetizer: 1970,
      dessert: 0.1,
    },
    {
      appetizer: 1600,
      dessert: 0.4,
    },
    {
      appetizer: 1800,
      dessert: 0.8,
    },
    {
      appetizer: 2600,
      dessert: 2.6,
    },
    {
      appetizer: 2300,
      dessert: 2.1,
    },
    {
      appetizer: 2900,
      dessert: 2.9,
    },
    {
      appetizer: 2000,
      dessert: 3.0,
    },
    {
      appetizer: 2800,
      dessert: 2.9,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [chartLeft, setChartLeft] = useState(true);
  const [chartRight, setChartRight] = useState(true);

  const token = localStorage.getItem("token");
  const theme = useTheme();
  const disPatch = useUserDispatch();
  const navigate = useNavigate();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const handleChangeCheckbox = (type) => {
    if (type == "dessert") {
      setChartRight(!chartRight);
    } else {
      setChartLeft(!chartLeft);
    }
  };
  const CustomLegend = ({ payload }) => {
    return (
      <>
        {payload.map((el, index) => (
          <Box key={index}>
            <FormControlLabel
              sx={{ color: el.color }}
              control={
                <Checkbox
                color={el.dataKey == "dessert" ? "primary" : "secondary"}
                  defaultChecked={
                    el.dataKey == "dessert" ? chartRight : chartLeft
                  }
                  onChange={() => handleChangeCheckbox(el.dataKey)}
                />
              }
              label={t(`dashboard.${el.dataKey}`)}
            />
          </Box>
        ))}
      </>
    );
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ display: "flex", mt: "5%", justifyContent: "center" }}
    >
      {data[0] ? (
        <Paper
          sx={{
            width: "100%",
            height: "550px",
            bgcolor: "#313348",
          }}
        >
          <Typography
            px="30px"
            py="15px"
            component="h2"
            color="info.main"
            sx={{ typography: { md: "h4", sm: "h5", xs: "h6" } }}
          >
            {t("chart.title")}
          </Typography>

          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 30, bottom: 70, right: 30 }}
            >
              <CartesianGrid
                stroke={theme.palette.info.main}
                strokeWidth="0.4px"
                vertical={false}
              />
              <XAxis
                tickLine={false}
                dataKey="month"
                minTickGap={0}
                interval={0}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                tickMargin={language == "fa" ? 15 : 0}
                tickCount={6}
                interval={0}
                hide={!chartLeft}
                tickSize={30}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                tickSize={30}
                tickCount={6}
                interval={0}
                hide={!chartRight}
              />
              <Tooltip cursor={{ fill: theme.palette.info.main }} />
              <Legend content={<CustomLegend />} />
              <Line
                yAxisId="left"
                dataKey="appetizer"
                type="natural"
                fill={theme.palette.primary.main}
                hide={!chartLeft}
                stroke={theme.palette.secondary.main}
              />
              <Line
                yAxisId="right"
                dataKey="dessert"
                type="natural"
                fill={theme.palette.secondary.main}
                hide={!chartRight}
                stroke={theme.palette.primary.main}
              />
              <Brush />
            </LineChart>
          </ResponsiveContainer>
          {/* <ResponsiveContainer>
            <BarChart
              className="textFont"
              barGap={5}
              barCategoryGap={9}
              data={data}
              margin={{ top: 0, bottom: 70, right: 30 }}
            >
              <CartesianGrid
                stroke={theme.palette.info.main}
                strokeWidth="0.4px"
                vertical={false}
              />
              <XAxis
                tickLine={false}
                dataKey="month"
                minTickGap={0}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={language == "fa" ? 15 : 0}
                // ticks={[0, 10, 20, 30, 40, 50 ,60]}
                // tickCount={5}
              />
              <Tooltip cursor={{ fill: theme.palette.info.main }} />
              <Bar dataKey="appetizer" fill={theme.palette.primary.main} />
              <Bar dataKey="dessert" fill={theme.palette.secondary.main} />
            </BarChart>
          </ResponsiveContainer> */}
        </Paper>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <Typography>{t("all.noData")}</Typography>
      )}
    </Container>
  );
};

export default Dashboard;
