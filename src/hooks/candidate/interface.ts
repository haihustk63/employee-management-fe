export interface ICandidateProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  positionId?: number;
  testLink?: string;
  cvLink?: string;
  interviewerId?: number;
  appointmentTime?: any;
  createdAt: string;
  updatedAt: string;
}
