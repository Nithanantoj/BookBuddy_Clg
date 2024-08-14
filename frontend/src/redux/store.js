import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import ticketSlice from "./ticketSlice";

const store = configureStore({
    reducer: {
        user : userSlice,
        tickets : ticketSlice
    },
});

export default store