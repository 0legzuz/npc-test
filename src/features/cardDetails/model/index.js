import mockAPI from "../../../shared/lib/api";

const initialState = {
  personData: null,
  loading: false,
  error: null,
};

const fetchPersonData = async (personId, setState) => {
  if (!personId) {
    setState({ ...initialState, personData: null });
    return;
  }
  setState({ ...initialState, loading: true });
  try {
    const data = await mockAPI.getPerson(personId);
    setState({ ...initialState, personData: data, loading: false });
  } catch (err) {
    setState({ ...initialState, error: err.message, loading: false });
  }
};

export { fetchPersonData, initialState };
