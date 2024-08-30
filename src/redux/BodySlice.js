import { createSlice } from "@reduxjs/toolkit";



// Create slice
const BodySlice = createSlice({
  name: "items",
  initialState: { 
    selectedBodyPart: "head", 
    status: "idle",
    error: null },
    reducers: {
        // Reducer to set the selected body part
        setBodyPart(state, action) {
          state.selectedBodyPart = action.payload;
        },
      },
  
});

export const { setBodyPart } = BodySlice.actions;

export default BodySlice.reducer;
