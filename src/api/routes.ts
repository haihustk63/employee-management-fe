const API_URL = import.meta.env.VITE_API_URL;

export const API_ROUTES = {
  ACCOUNTS: `${API_URL}/accounts`,
  ACCOUNT_EMAIL: (email: string) => `${API_URL}/accounts/${email}`,
  // positions
  POSITION: `${API_URL}/positions/`,
  POSITION_ID: (positionId: string | number) =>
    `${API_URL}/positions/${positionId}`,

  // candidates
  CANDIDATE_PROFILE: `${API_URL}/candidates/apply`,
  CANDIDATE_PROFILE_ID: (candidateId: string | number) =>
    `${API_URL}/candidates/apply/${candidateId}`,

  // delivery
  DELIVERY: `${API_URL}/deliveries`,
  DELIVERY_ID: (deliveryId: string | number) =>
    `${API_URL}/deliveries/${deliveryId}`,

  // employee
  EMPLOYEE_PROFILE: `${API_URL}/employees/profile`,

  EMPLOYEE_PROFILE_ID: (employeeId: string | number) =>
    `${API_URL}/employees/profile/${employeeId}`,

  // test-questions
  TEST_QUESTIONS: `${API_URL}/test-questions`,
  TEST_QUESTIONS_CLASSIFIED: `${API_URL}/classified/test-questions`,
  TEST_QUESTIONS_ID: (questionId: string | number) =>
    `${API_URL}/test-questions/${questionId}`,

  // test-topics
  TEST_TOPICS: `${API_URL}/test-topics`,

  // constant test-questions
  CONSTANT_TEST_QUESTIONS: `${API_URL}/constants/test-questions`,

  // login
  LOGIN_EMPLOYEE: `${API_URL}/login`,

  // tests
  CREATE_TEST_RANDOM: `${API_URL}/tests/create/random`,
  CREATE_TEST: `${API_URL}/tests/create/manual`,
  SAVE_TEST: `${API_URL}/tests`,
  TEST: `${API_URL}/tests`,
  TEST_ID: (testId: number | string) => `${API_URL}/tests/${testId}`,
  TEST_STATUS: (testId: number | string) => `${API_URL}/tests/status/${testId}`,

  // check-in-out
  CHECK_IN_OUT: `${API_URL}/check-in-out`,

  // jobs
  JOBS: `${API_URL}/jobs`,
  JOB_ID: (jobId: string | number) => `${API_URL}/jobs/${jobId}`,

  // requets
  REQUESTS: `${API_URL}/requests`,
  REQUEST_ID: (requestId: string | number) =>
    `${API_URL}/requests/${requestId}`,
};
