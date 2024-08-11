import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
} from "../../services/api";
import Navbar from "../../components/organisms/Navbar";
import styled from "styled-components";
import PatientInput from "@/components/atoms/Patient-Input";
import PatientLabel from "@/components/atoms/Patient-Label";
import Form from "@/components/molecules/Form";
import { toast } from "react-toastify";
import { isAuthenticated } from "@/utils/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const MainContainer = styled.div`
  width: 100%;
  padding-top: 4rem;
`;

const Textarea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 75%;
  height: 100px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
`;

const Tab = styled.div<{ active: boolean }>`
  flex: 1;
  padding: 12px 20px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
`;

const ContentContainer = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
`;

const PatientDetail: React.FC = () => {
  const router = useRouter();
  const { id, module } = router.query as { id?: string; module?: string };

  const { data: patient, isLoading } = useGetPatientByIdQuery(id as string);

  const [updatePatient] = useUpdatePatientMutation();

  const [activeTab, setActiveTab] = useState<
    "patient" | "prescription" | undefined | string
  >(module ?? "patient");

  const doctorId = useSelector((state: RootState) => state.auth.id);

  const [updatePatientData, setUpdatePatientData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    birthDate: "",
    contactInfo: "",
    medicalHistory: "",
    currentMedications: "",
    doctorName: "",
    prescriptionNumber: "",
    prescriptionDate: "",
    medicineName: "",
    medicineForm: "",
    medicineDose: "",
    instruction: "",
    description: "",
    userId: doctorId,
  });

  useEffect(() => {
    if (patient) {
      setUpdatePatientData({
        ...patient,
        birthDate: patient.birthDate.split("T")[0],
        prescriptionDate: patient.prescriptionDate.split("T")[0],
      });
    }
  }, [patient]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async () => {
    try {
      await updatePatient({ id, data: updatePatientData });
      toast.success(`Hasta verisi başarılı bir şekilde güncellendi`, {
        autoClose: 3000,
      });
      router.push("/");
    } catch (error) {
      toast.error(`Veritabanı hatası`, {
        autoClose: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <MainContainer>Yükleniyor...</MainContainer>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <MainContainer>
        <h2>Hasta Detayı</h2>

        <TabContainer>
          <Tab
            active={activeTab === "patient"}
            onClick={() => setActiveTab("patient")}
          >
            Hasta Bilgileri
          </Tab>
          <Tab
            active={activeTab === "prescription"}
            onClick={() => setActiveTab("prescription")}
          >
            Reçete Bilgileri
          </Tab>
        </TabContainer>

        <Form
          onSubmit={handleSubmit}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          {activeTab === "patient" && (
            <ContentContainer>
              <PatientLabel>
                Hastanın Adı:
                <PatientInput
                  type="text"
                  placeholder="Hastanın adı"
                  value={updatePatientData.firstName}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      firstName: e.target.value,
                    })
                  }
                />
              </PatientLabel>
              <PatientLabel>
                Hastanın Soyadı:
                <PatientInput
                  type="text"
                  placeholder="Hastanın soyadı"
                  value={updatePatientData.lastName}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      lastName: e.target.value,
                    })
                  }
                />
              </PatientLabel>
              <PatientLabel>
                Hastanın Doğum Tarihi:
                <PatientInput
                  type="date"
                  placeholder="Hastanın doğum tarihi"
                  value={updatePatientData.birthDate}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      birthDate: e.target.value,
                    })
                  }
                />
              </PatientLabel>
              <PatientLabel>
                İletişim Bilgisi:
                <PatientInput
                  type="tel"
                  placeholder="İletişim bilgisi"
                  value={updatePatientData.contactInfo}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      contactInfo: e.target.value,
                    })
                  }
                />
              </PatientLabel>
              <PatientLabel>
                Önceki hastalıkları:
                <Textarea
                  placeholder=" Önceki hastalıkları"
                  value={updatePatientData.medicalHistory}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      medicalHistory: e.target.value,
                    })
                  }
                />
              </PatientLabel>
              <PatientLabel>
                Kullandığı İlaçları:
                <PatientInput
                  placeholder="Kullandığı İlaçları"
                  value={updatePatientData.currentMedications}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      currentMedications: e.target.value,
                    })
                  }
                />
              </PatientLabel>
            </ContentContainer>
          )}

          {activeTab === "prescription" && (
            <ContentContainer>
              <PatientLabel>
                Reçete Numarası:
                <PatientInput
                  type="text"
                  placeholder="Reçete numarası"
                  value={updatePatientData.prescriptionNumber}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      prescriptionNumber: e.target.value,
                    })
                  }
                />
              </PatientLabel>
              <PatientLabel>
                Reçete Tarihi:
                <PatientInput
                  type="date"
                  placeholder="Reçete tarihi"
                  value={updatePatientData.prescriptionDate}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      prescriptionDate: e.target.value,
                    })
                  }
                />
              </PatientLabel>
              <PatientLabel>
                İlaç Adı:
                <PatientInput
                  type="text"
                  placeholder="İlaç adı"
                  value={updatePatientData.medicineName}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      medicineName: e.target.value,
                    })
                  }
                />
              </PatientLabel>
              <PatientLabel>
                İlaç Formu:
                <PatientInput
                  type="text"
                  placeholder="İlaç formu"
                  value={updatePatientData.medicineForm}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      medicineForm: e.target.value,
                    })
                  }
                />
              </PatientLabel>
              <PatientLabel>
                İlaç Dozu:
                <PatientInput
                  type="text"
                  placeholder="İlaç dozu"
                  value={updatePatientData.medicineDose}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      medicineDose: e.target.value,
                    })
                  }
                />
              </PatientLabel>
              <PatientLabel>
                Talimatlar:
                <Textarea
                  placeholder="Talimatlar"
                  value={updatePatientData.instruction}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      instruction: e.target.value,
                    })
                  }
                />
              </PatientLabel>
              <PatientLabel>
                Açıklamalar:
                <Textarea
                  placeholder="Açıklamalar"
                  value={updatePatientData.description}
                  onChange={(e) =>
                    setUpdatePatientData({
                      ...updatePatientData,
                      description: e.target.value,
                    })
                  }
                />
              </PatientLabel>
            </ContentContainer>
          )}
        </Form>
      </MainContainer>
    </>
  );
};

export default PatientDetail;
