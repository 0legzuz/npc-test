import React from "react";
import {
  Typography,
  Grid2,
  Paper,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
  useTheme,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useDashboardData, cityOptions, periodOptions } from "../model";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const DashboardContent = () => {
  const {
    dashboardData,
    selectedPeriod,
    selectedCity,
    loading,
    error,
    handlePeriodChange,
    handleCityChange,
  } = useDashboardData();

  const theme = useTheme();

  if (loading) {
    return <Typography>Загрузка...</Typography>;
  }
  if (error) {
    return <Typography>Ошибка загрузки данных</Typography>;
  }
  if (!dashboardData) {
    return <Typography>Нет данных</Typography>;
  }

  const {
    totalRecords,
    activeRecords,
    inactiveRecords,
    pieChartData,
    activeUsersByTime,
    educationLevelData,
    maritalStatusData,
    genderData,
  } = dashboardData;

  const barChartData = [
    { name: "Активные", value: activeRecords },
    { name: "Неактивные", value: inactiveRecords },
  ];
  const pieColors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A020F0",
    "#00FFFF",
  ];
  const barColors = [
    "#2196f3",
    "#4caf50",
    "#f44336",
    "#ff9800",
    "#9c27b0",
    "#00bcd4",
  ];

  return (
    <Box
      sx={{
        maxWidth: "1440px",
        margin: "0 auto",
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        Анализ
      </Typography>
      <Grid2 container spacing={3} mb={2}>
        <Grid2 item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel
              id="period-select-label"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "50%",
                color: theme.palette.text.primary,
              }}
            >
              Период
            </InputLabel>
            <Select
              labelId="period-select-label"
              id="period-select"
              value={selectedPeriod}
              label="Период"
              onChange={handlePeriodChange}
              sx={{
                color: theme.palette.text.primary,
                "& .MuiSelect-icon": {
                  color: theme.palette.text.primary,
                },
              }}
            >
              {periodOptions.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{ color: theme.palette.text.primary }}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel
              id="city-select-label"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "50%",
                color: theme.palette.text.primary,
              }}
            >
              Город
            </InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              value={selectedCity}
              label="Город"
              onChange={handleCityChange}
              sx={{
                color: theme.palette.text.primary,
                "& .MuiSelect-icon": {
                  color: theme.palette.text.primary,
                },
              }}
            >
              {cityOptions.map((cityOption) => (
                <MenuItem
                  key={cityOption}
                  value={cityOption}
                  sx={{ color: theme.palette.text.primary }}
                >
                  {cityOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid2 item xs={12} md={3}>
          <StyledPaper elevation={3} sx={{ justifyContent: "center" }}>
            <StyledTypography variant="h6">
              Всего записей в картотеке
            </StyledTypography>
            <Typography variant="h2" sx={{ color: theme.palette.text.primary }}>
              {totalRecords}
            </Typography>
          </StyledPaper>
        </Grid2>
        <Grid2 item xs={12} md={3}>
          <StyledPaper elevation={3} sx={{ justifyContent: "center" }}>
            <StyledTypography variant="h6">
              Активных пользователей
            </StyledTypography>
            <Typography variant="h2" sx={{ color: theme.palette.text.primary }}>
              {activeRecords}
            </Typography>
          </StyledPaper>
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTypography variant="h6">
              Статистика по статусу
            </StyledTypography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.palette.divider}
                />
                <XAxis dataKey="name" stroke={theme.palette.text.primary} />
                <YAxis stroke={theme.palette.text.primary} />
                <Tooltip />
                <Bar dataKey="value" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTypography variant="h6">
              Распределение по городам
            </StyledTypography>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#2196f3"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Legend textStyle={{ fill: theme.palette.text.primary }} />
              </PieChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTypography variant="h6">
              Динамика активных пользователей
            </StyledTypography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={activeUsersByTime}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.palette.divider}
                />
                <XAxis dataKey="name" stroke={theme.palette.text.primary} />
                <YAxis stroke={theme.palette.text.primary} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTypography variant="h6">
              Распределение по уровню образования
            </StyledTypography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={
                  educationLevelData && Array.isArray(educationLevelData)
                    ? educationLevelData
                    : []
                }
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.palette.divider}
                />
                <XAxis dataKey="name" stroke={theme.palette.text.primary} />
                <YAxis stroke={theme.palette.text.primary} />
                <Tooltip />
                {educationLevelData &&
                  Array.isArray(educationLevelData) &&
                  educationLevelData.map((entry, index) => (
                    <Bar
                      key={`bar-${index}`}
                      dataKey="value"
                      fill={barColors[index % barColors.length]}
                    />
                  ))}
              </BarChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTypography variant="h6">
              Распределение по семейному положению
            </StyledTypography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={
                  maritalStatusData && Array.isArray(maritalStatusData)
                    ? maritalStatusData
                    : []
                }
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.palette.divider}
                />
                <XAxis dataKey="name" stroke={theme.palette.text.primary} />
                <YAxis stroke={theme.palette.text.primary} />
                <Tooltip />
                {maritalStatusData &&
                  Array.isArray(maritalStatusData) &&
                  maritalStatusData.map((entry, index) => (
                    <Bar
                      key={`bar-${index}`}
                      dataKey="value"
                      fill={barColors[index % barColors.length]}
                    />
                  ))}
              </BarChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default DashboardContent;
