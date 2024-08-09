import React, { useState } from "react";
import {
  useGetPatientByIdQuery,
  useGetPatientsQuery,
} from "../../services/api";
import styled from "styled-components";
import PatientButton from "../atoms/Patient-Button";
import { useRouter } from "next/router";
import Modal from "../molecules/Modal";
import Button from "../atoms/Button";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonModalContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;
`;

const PatientList: React.FC = () => {
  const { data: patients } = useGetPatientsQuery();
  const router = useRouter();
  const [selectedModalId, setSelectedModalId] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const { data: patient, isLoading } = useGetPatientByIdQuery(
    selectedModalId as unknown as string
  );

  const handleClickPatientDetail = (id: number) => {
    router.push(`/doctor-monitor/${id}`);
  };

  const handleClickPrescriptionDetail = (id: number) => {
    setSelectedModalId(id);
    setOpenModal(true);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <TableHeader>Ad</TableHeader>
            <TableHeader>Doğum Tarihi</TableHeader>
            <TableHeader>İletişim Bilgileri</TableHeader>
            <TableHeader>İşlemler</TableHeader>
          </tr>
        </thead>
        <tbody>
          {patients?.map((patient) => (
            <TableRow key={patient.id}>
              <TableData>
                {patient.firstName} {patient.lastName}
              </TableData>
              <TableData>
                {new Date(patient.birthDate).toLocaleDateString("tr-TR")}
              </TableData>
              <TableData>{patient.contactInfo}</TableData>
              <TableData>
                <ButtonContainer>
                  <PatientButton
                    onClick={() => handleClickPatientDetail(patient.id)}
                  >
                    Detay
                  </PatientButton>
                  <PatientButton
                    onClick={() => handleClickPrescriptionDetail(patient.id)}
                  >
                    Reçete Görüntüle
                  </PatientButton>
                </ButtonContainer>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <h2>
          {patient?.firstName} {patient?.lastName} Reçetesi
        </h2>
        <p>Reçete Numarası: {patient?.prescriptionNumber}</p>
        <p>Reçete Tarihi: {patient?.prescriptionDate?.split("T")[0]}</p>
        <p>İlacın Adı: {patient?.medicineName}</p>
        <p>Talimatı: {patient?.instruction}</p>
        <p>Açıklama: {patient?.description}</p>
        <ButtonModalContainer>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push(`/doctor-monitor/${patient?.id}`);
            }}
          >
            Reçeteyi Düzenle
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(false);
              setSelectedModalId(0);
            }}
          >
            Kapat
          </Button>
        </ButtonModalContainer>
      </Modal>
    </>
  );
};

export default PatientList;
