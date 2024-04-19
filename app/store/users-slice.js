
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getLogger from "../../../lib/shared/logger";

const logger = getLogger("UsersSlice");
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  usersList: null,
  usersListStatus: "idle",
  submitUserStatus: "idle",
  submitDepartmentStatus: "idle",
  EditSubmissionStatus: "idle",
  deleteUserStatus: "idle",
  currentUser: null,
  currentUserStatus: "idle",

  fetchUsersList: [],
  fetchusersListStatus: "idle",

  
};


export const fetchUsersList = createAsyncThunk(
  "users/fetchUsersList",
  async () => {
   
    let url = `${API_URL}/users`;

    const startTime = new Date();
    logger.log("fetchUsersList::BEGIN");
    const response = await fetch(url, {
      headers: {
        
        Accept: "application/json",
      },
    }).then(async (response) => {
      const data = await response.json();
      const endTime = new Date();
      const seconds = endTime.getTime() - startTime.getTime();
      logger.log("fetchUsersList::END", { took: seconds, data });

      if (!response.ok) {
        throw data;
      }

      return data;
    });

    return response;
  }
);



export const submitUser = createAsyncThunk(
  "UsersSlice/submitUser",
  async ({
    accessToken = null,
    name = null,
    email = null,
    
  } = {}) => {
    if (!accessToken) {
      return;
    }

    let url = `${API_URL}/users`;

    let body = {};

    body["name"] = name;
    body["email"] = email;
    body["company"] = company;
    
    body = JSON.stringify(body);

    const startTime = new Date();
    logger.log("submitUser::BEGIN", body);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    }).then(async (response) => {
      const data = await response.json();
      const endTime = new Date();
      const seconds = endTime.getTime() - startTime.getTime();
      logger.log("submitUser::END", { took: seconds, data });

      if (!response.ok) {
        throw data;
      }

      return data;
    });

    return response;
  }
);

export const submitDepartment = createAsyncThunk(
  "UsersSlice/submitDepartment",
  async ({ accessToken = null, name = null } = {}) => {
    if (!accessToken) {
      return;
    }

    let url = `${API_URL}/add-department`;

    let body = {};

    body["name"] = name;

    body = JSON.stringify(body);

    const startTime = new Date();
    logger.log("submitDepartment::BEGIN", body);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    }).then(async (response) => {
      const data = await response.json();
      const endTime = new Date();
      const seconds = endTime.getTime() - startTime.getTime();
      logger.log("submitDepartment::END", { took: seconds, data });

      if (!response.ok) {
        throw data;
      }

      return data;
    });

    return response;
  }
);



export const deleteUser = createAsyncThunk(
  "UsersSlice/deleteUser",
  async ({ accessToken = null, itemId = null } = {}) => {
    if (!accessToken) {
      return;
    }

    let url = `${API_URL}/users/${itemId}`;

    const startTime = new Date();
    logger.log("deleteUser::BEGIN");
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        
        Accept: "application/json",
      },
    }).then(async (response) => {
      const data = await response.json();
      const endTime = new Date();
      const seconds = endTime.getTime() - startTime.getTime();
      logger.log("deleteUser::END", { took: seconds, data });

      if (!response.ok) {
        throw data;
      }

      return data;
    });

    return response;
  }
);

export const submitEditUser = createAsyncThunk(
  "UsersSlice/submitEditUser",
  async ({
    accessToken = null,
    id = null,
    name = null,
    email = null,
    company = null,
  } = {}) => {
    if (!accessToken) {
      return;
    }

    let url = `${API_URL}/users/${id}`;
    let body = {};

    body["name"] = name;
    body["email"] = email;
    body["phone"] = phone;
    body["location"] = location;
    body["phone"] = phone;
    body["category_id"] = category_id;

    body = JSON.stringify(body);

    const startTime = new Date();
    logger.log("submitEditUser::BEGIN", body);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    }).then(async (response) => {
      const data = await response.json();
      const endTime = new Date();
      const seconds = endTime.getTime() - startTime.getTime();
      logger.log("submitEditUser::END", { took: seconds, data });

      if (!response.ok) {
        throw data;
      }

      return data;
    });

    return response;
  }
);



const users = createSlice({
  name: "users",
  initialState: loadUsersState(),
  reducers: {
    
  },
  extraReducers(builder) {
    builder
      // submitUserData
      .addCase(submitUser.pending, (state) => {
        state.submitUserStatus = "loading";
      })
      .addCase(submitUser.rejected, (state, action) => {
        state.submitUserStatus = "rejected";
        logger.warn("submitUser::REJECTED", action.error);
      })
      .addCase(submitUser.fulfilled, (state, action) => {
        const { payload } = action;
        logger.log("submitUser::FULFILLED", { payload });

        state.submitUserStatus = "fulfilled";
      })

      

      // submitEditUser
      .addCase(submitEditUser.pending, (state) => {
        state.EditSubmissionStatus = "loading";
      })
      .addCase(submitEditUser.rejected, (state, action) => {
        state.EditSubmissionStatus = "rejected";
        logger.warn("submitEditUser::REJECTED", action.error);
      })
      .addCase(submitEditUser.fulfilled, (state, action) => {
        const { payload } = action;
        logger.log("submitEditUser::FULFILLED", { payload });

        state.EditSubmissionStatus = "fulfilled";
      })

      


      

    // END
  },
});



export default users.reducer;
