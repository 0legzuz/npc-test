import { useState, useEffect } from "react";
import mockAPI from "../../../shared/lib/api";

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Все время");
  const [selectedCity, setSelectedCity] = useState("Все города");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformCityForAPI = (city) => {
    return city === "Все города" ? "all" : city;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await mockAPI.getDashboardData(
          selectedPeriod,
          transformCityForAPI(selectedCity)
        );
        setDashboardData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedPeriod, selectedCity]);

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return {
    dashboardData,
    selectedPeriod,
    selectedCity,
    loading,
    error,
    handlePeriodChange,
    handleCityChange,
    setSelectedPeriod,
    setSelectedCity,
  };
};

export const cityOptions = [
  "Все города",
  "Москва",
  "Санкт-Петербург",
  "Екатеринбург",
  "Казань",
  "Новосибирск",
  "Нижний Новгород",
  "Челябинск",
  "Омск",
];
export const periodOptions = ["Все время", "Неделя", "Месяц", "Год"];
