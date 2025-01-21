import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid2,
  Pagination,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material";
import { useCardListModel } from "../model";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  textAlign: "left",
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: "180px", // Устанавливаем минимальную ширину
  marginBottom: theme.spacing(2),
  "& .MuiInputLabel-root": {
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  "& .MuiSelect-select": {
    whiteSpace: "normal",
    lineHeight: "1.2rem",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
}));

const CardListTable = ({ onSelectPerson }) => {
  const [filter, setFilter] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Все",
    city: "Все",
    citizenship: "Все",
    birthDate: "",
    educationLevel: "Все",
    maritalStatus: "Все",
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [visibleColumns, setVisibleColumns] = useState([
    "id",
    "name",
    "email",
    "phone",
    "city",
    "status",
  ]);

  const { peopleData, loading, error, filterOptions } = useCardListModel(
    page,
    itemsPerPage,
    filter
  );

  console.log("filterOptions:", filterOptions);
  console.log("peopleData:", peopleData);

  useEffect(() => {
    if (isMobile) {
      setVisibleColumns(["id", "name", "status"]);
    } else if (isTablet) {
      setVisibleColumns(["id", "name", "email", "status"]);
    } else {
      setVisibleColumns([
        "id",
        "name",
        "email",
        "phone",
        "city",
        "status",
        "birthDate",
        "citizenship",
        "educationLevel",
        "maritalStatus",
      ]);
    }
  }, [isMobile, isTablet]);

  const handleRowClick = (person) => {
    onSelectPerson(person);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
    setPage(1);
  };

  const { people, total } = peopleData;

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <Box>
      <Grid2 container spacing={2} mb={2}>
        {/* Adjusted Grid items to make filters same size */}
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="ФИО"
            variant="outlined"
            fullWidth
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            name="email"
            value={filter.email}
            onChange={handleFilterChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="Телефон"
            variant="outlined"
            fullWidth
            name="phone"
            value={filter.phone}
            onChange={handleFilterChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="Дата рождения"
            variant="outlined"
            fullWidth
            name="birthDate"
            value={filter.birthDate}
            onChange={handleFilterChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
          <StyledFormControl fullWidth>
            <InputLabel id="status-select-label">Статус</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={filter.status}
              label="Статус"
              name="status"
              onChange={handleFilterChange}
            >
              {filterOptions.statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
          <StyledFormControl fullWidth>
            <InputLabel id="city-select-label">Город</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              value={filter.city}
              label="Город"
              name="city"
              onChange={handleFilterChange}
            >
              {filterOptions.cityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
          <StyledFormControl fullWidth>
            <InputLabel id="citizenship-select-label">Гражданство</InputLabel>
            <Select
              labelId="citizenship-select-label"
              id="citizenship-select"
              value={filter.citizenship}
              label="Гражданство"
              name="citizenship"
              onChange={handleFilterChange}
            >
              {filterOptions.citizenshipOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
          <StyledFormControl fullWidth>
            <InputLabel id="marital-status-select-label">
              Семейное положение
            </InputLabel>
            <Select
              labelId="marital-status-select-label"
              id="marital-status-select"
              value={filter.maritalStatus}
              label="Семейное положение"
              name="maritalStatus"
              onChange={handleFilterChange}
            >
              {filterOptions.maritalStatusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
          <StyledFormControl fullWidth>
            <InputLabel id="education-level-select-label">
              Уровень образования
            </InputLabel>
            <Select
              labelId="education-level-select-label"
              id="education-level-select"
              value={filter.educationLevel}
              label="Уровень образования"
              name="educationLevel"
              onChange={handleFilterChange}
            >
              {filterOptions.educationLevelOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid2>
      </Grid2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>ФИО</StyledTableCell>
              <StyledTableCell align="left">E-mail</StyledTableCell>
              <StyledTableCell align="left">Телефон</StyledTableCell>
              <StyledTableCell align="left">Дата рождения</StyledTableCell>
              <StyledTableCell align="left">Город</StyledTableCell>
              <StyledTableCell align="left">Статус</StyledTableCell>
              <StyledTableCell align="left">Гражданство</StyledTableCell>
              <StyledTableCell align="left">
                Уровень образования
              </StyledTableCell>
              <StyledTableCell align="left">Семейное положение</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <StyledTableRow
                key={person.id}
                onClick={() => handleRowClick(person)}
              >
                <StyledTableCell component="th" scope="row">
                  {person.id}
                </StyledTableCell>
                <StyledTableCell>{person.name}</StyledTableCell>
                <StyledTableCell align="left">{person.email}</StyledTableCell>
                <StyledTableCell align="left">{person.phone}</StyledTableCell>
                <StyledTableCell align="left">
                  {person.birthDate}
                </StyledTableCell>
                <StyledTableCell align="left">{person.city}</StyledTableCell>
                <StyledTableCell align="left">{person.status}</StyledTableCell>
                <StyledTableCell align="left">
                  {person.citizenship}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {person.educationData.find((edu) => edu).educationLevel}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {person.maritalStatus}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {people.length === 0 && (
          <Typography sx={{ p: 3 }} variant="body1" align="center">
            Нет данных
          </Typography>
        )}
      </TableContainer>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="body2">Всего записей: {total}</Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, newPage) => setPage(newPage)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CardListTable;
