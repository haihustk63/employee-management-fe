const API_URL = import.meta.env.VITE_API_URL;

export const API_ROUTES = {
  //candidates
  CANDIDATE_PROFILE: `${API_URL}/candidates/apply`,

  //delivery
  DELIVERY: `${API_URL}/deliveries`,

  // employee
  EMPLOYEE_PROFILE: `${API_URL}/employees/profile`,
};
