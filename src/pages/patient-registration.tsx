import React, { useEffect } from "react";
import PatientForm from "../components/organisms/PatientForm";
import Navbar from "../components/organisms/Navbar";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/utils/auth";

const PatientRegistration: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <PatientForm />
    </>
  );
};

export default PatientRegistration;
