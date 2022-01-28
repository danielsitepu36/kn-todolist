import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  access_token: null,
  expires_in: null,
  txtUsername: null,
  roleList: null,
  intRoleID: null,
  txtRoleName: null,
  optionsUoM: null,
  optionsType: null,
  optionsStatus: null,
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.access_token = action.payload.access_token;
      state.expires_in = action.payload.expires_in;
    },
    saveUser: (state, action) => {
      state.txtUsername = action.payload.txtUsername;
      // state.roleList = action.payload.roleList;
    },
    // setRole: (state, action) => {
    //   state.intRoleID = action.payload.intRoleID;
    //   state.txtRoleName = action.payload.txtRoleName;
    // },
    logout: (state) => {
      state.txtUsername = initialState.txtUsername;
      state = { ...initialState };
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveToken, saveUser, setRole, logout } = authSlice.actions;

export default authSlice.reducer;
