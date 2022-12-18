const API_URL = import.meta.env.VITE_API_URL;

export const API_ROUTES = {
  // candidates
  CANDIDATE_PROFILE: `${API_URL}/candidates/apply`,

  // delivery
  DELIVERY: `${API_URL}/deliveries`,
  DELIVERY_ID: (deliveryId: string) => `${API_URL}/deliveries/${deliveryId}`,

  // employee
  EMPLOYEE_PROFILE: `${API_URL}/employees/profile`,

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
  CREATE_TEST: `${API_URL}/tests/create`,
  SAVE_TEST: `${API_URL}/tests/save`,
  GET_TEST: (testId: number) => `${API_URL}/tests/${testId}`,

  // check-in-out
  CHECK_IN_OUT: `${API_URL}/check-in-out`,
};
