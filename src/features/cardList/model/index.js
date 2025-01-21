import { useState, useEffect, useCallback } from "react";
import mockAPI from "../../../shared/lib/api";

export const useCardListModel = (page, itemsPerPage, filter) => {
  const [peopleData, setPeopleData] = useState({ people: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    statusOptions: [],
    cityOptions: [],
    citizenshipOptions: [],
    educationLevelOptions: [],
    maritalStatusOptions: [],
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockAPI.getPeople(page, itemsPerPage, filter);
      const statusOptions = [
        "Все",
        ...new Set(data.people.map((person) => person.status)),
      ];
      const cityOptions = [
        "Все",
        ...new Set(data.people.map((person) => person.city)),
      ];
      const citizenshipOptions = [
        "Все",
        ...new Set(data.people.map((person) => person.citizenship)),
      ];
      const educationLevelOptions = [
        "Все",
        ...new Set(
          data.people.flatMap((person) =>
            person.educationData.map((edu) => edu.educationLevel)
          )
        ),
      ];
      const maritalStatusOptions = [
        "Все",
        ...new Set(data.people.map((person) => person.maritalStatus)),
      ];

      setFilterOptions({
        statusOptions,
        cityOptions,
        citizenshipOptions,
        educationLevelOptions,
        maritalStatusOptions,
      });

      setPeopleData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, filter, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { peopleData, loading, error, filterOptions };
};
