// editModeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const editModeSlice = createSlice({
    name: 'editMode',
    initialState: {
        editMode: false,
    },
    reducers: {
        setEditMode: (state, action) => {
            state.editMode = action.payload;
        },
    },
});

export const { setEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;
