import React, { useState } from "react";
import { useRouter } from "next/router";
import { useLoginMutation } from "../services/auth";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import styled from "styled-components";
import { toast } from "react-toastify";

const LoginContainer = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: auto;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMesagge, setErrorMessage] = useState("");
  const router = useRouter();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap();
      Object.entries(response).map(([key, value]) =>
        localStorage.setItem(key, value)
      );
      toast.success(`${response.name} başarılı bir şekilde girdiniz`, {
        autoClose: 3000,
      });
      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMessage(
        Array.isArray(err?.data?.message)
          ? err?.data?.message[0]
          : err?.data?.message
      );
      toast.error(`Hatalı giriş`, {
        autoClose: 3000,
      });
    }
  };

  return (
    <LoginContainer>
      <h2>Hastane Yönetim Sistemi</h2>
      <h3>Giriş Yap</h3>
      <Input
        type="text"
        placeholder="Kullanıcı Adı"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
      </Button>
      {error && <div>Giriş başarısız: {errorMesagge}</div>}
    </LoginContainer>
  );
};

export default Login;
