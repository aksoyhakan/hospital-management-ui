import React from "react";
import PatientList from "../components/organisms/PatientList";
import Navbar from "../components/organisms/Navbar";
import { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { isAuthenticated } from "../utils/auth";

const MainContainer = styled.div`
  width: 100%;
  padding-top: 4rem;
`;

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <MainContainer>
        <PatientList />
      </MainContainer>
    </>
  );
};

export default Home;
