import { createSlice } from "@reduxjs/toolkit";


const ticketSlice = createSlice({
    name: "tickets",
    initialState: {
        items: null,
        quantitys: null
    },
    reducers: {
        addTicket: (state, action) => {
            state.items = action.payload;
           
        },
        addQuantity: (state, action) => {
            state.quantitys = action.payload;
        }
    }
   
});

export const { addTicket, addQuantity} = ticketSlice.actions;
export default ticketSlice.reducer;