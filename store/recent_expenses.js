import {createSlice} from "@reduxjs/toolkit";

const recent_expenses = createSlice({
    name: 'recent_expenses',
    initialState: {
        expenses: []
    },
    reducers: {
        addExpenses: (state, action) => {
            state.expenses.push(action.payload);
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload;

        },
        removeExpenses: (state, action) => {
            const index = state.expenses.findIndex(exp => exp.id === action.payload.id);
            console.log("index" + index + " payload: " + action.payload.id)
            if (index !== -1) {
                state.expenses.splice(index, 1);
            }
        },
        updateExpenses: (state, action) => {
            const index = state.expenses.findIndex(exp => exp.id === action.payload.id);

            if (index !== -1) {
                state.expenses[index] = {
                    ...state.expenses[index],
                    ...action.payload.data
                };
            }
        }
    }
});
export const setExpenses = recent_expenses.actions.setExpenses;
export const updateExpenses = recent_expenses.actions.updateExpenses;

export const addExpenses = recent_expenses.actions.addExpenses;
export const removeExpenses = recent_expenses.actions.removeExpenses;
export default recent_expenses.reducer;