import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  contactInfo: string;
  currentMedications: string;
  medicalHistory: string;
  doctorName: string;
  prescriptionNumber: string;
  prescriptionDate: string;
  medicineName: string;
  medicineForm: string;
  medicineDose: string;
  instruction: string;
  description: string;
}

const getToken = () => {
  return localStorage.getItem("token");
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPatients: builder.query<Patient[], void>({
      query: () => "patient",
      keepUnusedDataFor: 0,
    }),
    getPatientById: builder.query<Patient, string>({
      query: (id) => `patient/${id}`,
      keepUnusedDataFor: 0,
    }),
    addPatient: builder.mutation<void, Partial<Patient>>({
      query: (newPatient) => ({
        url: "patient",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      }),
    }),
    updatePatient: builder.mutation<
      void,
      { id: string; data: Partial<Patient> }
    >({
      query: ({ id, data }) => ({
        url: `patient/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useAddPatientMutation,
  useUpdatePatientMutation,
} = api;
