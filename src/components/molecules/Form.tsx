import React from "react";
import Button from "../atoms/Button";
import PatientButton from "../atoms/Patient-Button";
import styled from "styled-components";
import { useRouter } from "next/router";

const FormContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  max-width: 1000px;
  margin: auto;
`;

const ButtonContainer = styled.label`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin-top: 0.5rem;
`;

interface FormProps {
  onSubmit: () => void;
  activeTab: string;
  setActiveTab: (state: string) => void;
  children: any;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  activeTab,
  setActiveTab,
  children,
}) => {
  const router = useRouter();

  const handleClickButton = (activeTab: string) => {
    if (activeTab === "prescription") {
      setActiveTab("patient");
    } else {
      router.push("/");
    }
  };
  return (
    <FormContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {children}
        <ButtonContainer>
          <PatientButton
            onClick={(e) => {
              e.preventDefault();
              handleClickButton(activeTab);
            }}
          >
            {activeTab === "prescription" ? "Geri dön" : "Ana sayfa"}
          </PatientButton>
          {activeTab !== "prescription" && (
            <PatientButton
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("prescription");
              }}
            >
              İleri
            </PatientButton>
          )}

          <Button type="submit">Gönder</Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default Form;
