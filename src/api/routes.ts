const API_URL = import.meta.env.VITE_API_URL;

export const API_ROUTES = {
  // positions
  POSITION: `${API_URL}/positions/`,

  // candidates
  CANDIDATE_PROFILE: `${API_URL}/candidates/apply`,
  CANDIDATE_PROFILE_ID: (candidateId: string) =>
    `${API_URL}/candidates/apply/${candidateId}`,
  CANDIDATE_ACCOUNT: `${API_URL}/candidates/accounts`,
  CANDIDATE_ACCOUNT_USERNAME: (username: string) =>
    `${API_URL}/candidates/accounts/${username}`,

  // delivery
  DELIVERY: `${API_URL}/deliveries`,
  DELIVERY_ID: (deliveryId: string) => `${API_URL}/deliveries/${deliveryId}`,

  // employee
  EMPLOYEE_PROFILE: `${API_URL}/employees/profile`,
  EMPLOYEE_PROFILE_ID: (employeeId: string) =>
    `${API_URL}/employees/profile/${employeeId}`,

  // test-questions
  TEST_QUESTIONS: `${API_URL}/test-questions`,
  TEST_QUESTIONS_CLASSIFIED: `${API_URL}/classified/test-questions`,
  TEST_QUESTIONS_ID: (questionId: string) =>
    `${API_URL}/test-questions/${questionId}`,

  // test-topics
  TEST_TOPICS: `${API_URL}/test-topics`,

  // constant test-questions
  CONSTANT_TEST_QUESTIONS: `${API_URL}/constants/test-questions`,

  // login
  LOGIN_CANDIDATE: `${API_URL}/login/candidate`,
  LOGIN_EMPLOYEE: `${API_URL}/login/employee`,

  // tests
  CREATE_TEST_RANDOM: `${API_URL}/tests/create/random`,
  CREATE_TEST: `${API_URL}/tests/create/manual`,
  SAVE_TEST: `${API_URL}/tests`,
  TEST: `${API_URL}/tests`,
  TEST_ID: (testId: number) => `${API_URL}/tests/${testId}`,
  TEST_STATUS: (testId: number) => `${API_URL}/tests/status/${testId}`,

  // check-in-out
  CHECK_IN_OUT: `${API_URL}/check-in-out`,

  // jobs
  JOBS: `${API_URL}/jobs`,
  JOB_ID: (jobId: string) => `${API_URL}/jobs/${jobId}`,
};
