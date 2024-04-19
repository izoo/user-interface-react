import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./users-slice";


export default configureStore({
  reducer: {
    user:usersSlice
  },
 
});
