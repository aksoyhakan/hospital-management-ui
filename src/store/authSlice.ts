import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  name: string | null;
  id: number | null;
}

const getInitialState = (): AuthState => {
  if (typeof window !== "undefined" && window.localStorage) {
    return {
      token: localStorage.getItem("token"),
      name: localStorage.getItem("name"),
      id: JSON.parse(localStorage.getItem("id") || "null"),
    };
  } else {
    return {
      token: null,
      name: null,
      id: null,
    };
  }
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; name: string; id: number }>
    ) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.id = action.payload.id;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("name", action.payload.name);
        localStorage.setItem("id", JSON.stringify(action.payload.id));
      }
    },
    logout: (state) => {
      state.token = null;
      state.name = null;
      state.id = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
