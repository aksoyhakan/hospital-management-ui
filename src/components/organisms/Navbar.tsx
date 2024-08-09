import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  justify-content: space-between;
  z-index: 1000;
`;

const NavbarMenuContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  padding-right: 40px;
`;

const NavbarButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  &:hover {
    color: #bdbdbd;
    font-size: 1rem;
    padding: 0rem;
  }
  transition: all 0.5s ease-in-out;
`;

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    ["id", "name", "token"].forEach((key) => localStorage.removeItem(key));
    toast.success(`Başarılı bir şekilde oturumunuz kapatılmıştır`, {
      autoClose: 3000,
    });
    router.push("/login");
  };

  const handleClickMainPage = () => {
    router.push("/");
  };

  const handleClickPatientRegister = () => {
    router.push("/patient-registration");
  };

  return (
    <NavbarContainer>
      <div style={{ padding: "0.5rem" }}>Hasta Yönetim Sistemi</div>
      <NavbarMenuContainer>
        <NavbarButton onClick={handleClickMainPage}>Hasta Listesi</NavbarButton>
        <NavbarButton onClick={handleClickPatientRegister}>
          Yeni Hasta
        </NavbarButton>
        <NavbarButton onClick={handleLogout}>Çıkış Yap</NavbarButton>
      </NavbarMenuContainer>
    </NavbarContainer>
  );
};

export default Navbar;
