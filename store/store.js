import {configureStore} from "@reduxjs/toolkit";
import recent_expenses from "./recent_expenses";

export const store = configureStore(
    {
        reducer:{
            totalExpenses:recent_expenses
        }
    }
)