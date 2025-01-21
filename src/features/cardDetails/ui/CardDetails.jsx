import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  useMediaQuery,
  Grid2,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled, useTheme } from "@mui/material/styles";
import { fetchPersonData, initialState } from "../model/index";

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  "& .MuiTypography-root": {
    color: theme.palette.text.secondary,
  },
}));
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  flexGrow: 1,
  flexShrink: 0,
  minWidth: 0,
}));

const CardDetails = ({ person, onClose }) => {
  const [cardState, setCardState] = useState(initialState);
  const { personData, loading, error } = cardState;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (person && person.id) {
      fetchPersonData(person.id, setCardState);
    } else {
      setCardState({ ...initialState, personData: null });
    }
  }, [person]);

  useEffect(() => {
    if (personData) {
      const selectElement = document.getElementById("income-source");
      if (selectElement) {
        console.log(
          "Select width:",
          selectElement.offsetWidth,
          "Offset parent width",
          selectElement.offsetParent?.offsetWidth
        );
      }
    }
  }, [personData]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!personData) {
    return null;
  }

  const { categories, ...personDetails } = personData;

  const renderItemsList = (items, itemRenderer, title) => {
    if (!items || items.length === 0) {
      return (
        <Typography variant="body1">
          Нет данных о {title || "данных"}.
        </Typography>
      );
    }
    return (
      <Box sx={{ width: "100%" }}>
        {title && (
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {title}
          </Typography>
        )}
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {itemRenderer && itemRenderer(item)}
          </React.Fragment>
        ))}
      </Box>
    );
  };
  const renderFamilyMember = (member) => (
    <Box
      key={member.name}
      sx={{ mb: 1, border: "1px solid #eee", borderRadius: 1, p: 2 }}
    >
      <Typography variant="body1">
        <strong>{member.name}:</strong> {member.fullName}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Дата рождения:</strong> {member.birthDate}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Пол:</strong> {member.gender}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Место работы/учебы:</strong> {member.occupation}{" "}
      </Typography>
    </Box>
  );

  const renderEducationData = (edu) => (
    <Box
      key={edu.university}
      sx={{ mb: 1, border: "1px solid #eee", borderRadius: 1, p: 2 }}
    >
      <Typography variant="body1">
        <strong>Университет:</strong> {edu.university}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Уровень образования:</strong> {edu.educationLevel}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Год начала обучения:</strong> {edu.startDate}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Год окончания:</strong> {edu.year}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Специальность:</strong> {edu.speciality}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Форма обучения:</strong> {edu.form}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Дополнительные курсы/сертификаты:</strong>{" "}
        {edu.additionalCourses}{" "}
      </Typography>
    </Box>
  );

  const renderWorkExperience = (work) => (
    <Box
      key={work.company}
      sx={{ mb: 1, border: "1px solid #eee", borderRadius: 1, p: 2 }}
    >
      <Typography variant="body1">
        <strong>Компания:</strong> {work.company}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Должность:</strong> {work.position}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Отрасль:</strong> {work.industry}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Период работы:</strong> с {work.startDate} по {work.endDate}{" "}
      </Typography>
      <Typography variant="body1">
        {" "}
        <strong>Обязанности:</strong> {work.duties}{" "}
      </Typography>
    </Box>
  );
  const renderCategorySection = (title, content) => (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        {title}
      </Typography>
      {content}
      <Divider sx={{ mt: 2, mb: 2 }} />
    </Box>
  );
  const renderField = (field, value) => {
    switch (field.type) {
      case "text":
        return (
          <TextField
            key={field.id}
            label={field.label}
            variant="outlined"
            fullWidth
            value={value}
            disabled
            multiline
          />
        );
      case "select":
        return (
          <StyledFormControl key={field.id} fullWidth>
            <InputLabel id={`${field.id}-select-label`}>
              {field.label}
            </InputLabel>
            <Select
              labelId={`${field.id}-select-label`}
              id={`${field.id}-select`}
              value={value}
              label={field.label}
              disabled
            >
              {field.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        );
      case "checkbox":
        return (
          <FormControl key={field.id} component="fieldset" variant="standard">
            <FormGroup>
              <StyledFormControlLabel
                control={<Checkbox name={field.id} checked={value} />}
                label={field.label}
                disabled
              />
            </FormGroup>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: isMobile ? 2 : 3, borderRadius: 1 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" gutterBottom>
          Информация о пользователе
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {categories?.map((category) => (
        <Box key={category.id} sx={{ width: "100%", mb: 2 }}>
          {renderCategorySection(
            category.type === "list" ? (
              renderItemsList(
                personData[category.id] || [],
                category.id === "family"
                  ? renderFamilyMember
                  : category.id === "education"
                  ? renderEducationData
                  : category.id === "workExperience"
                  ? renderWorkExperience
                  : null,
                category.title
              )
            ) : (
              <Grid2 container spacing={2}>
                {category.fields?.map((field) => (
                  <Grid2 key={field.id} item xs={12} sm={6}>
                    {renderField(field, personDetails[field.id])}
                  </Grid2>
                ))}
              </Grid2>
            )
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CardDetails;
