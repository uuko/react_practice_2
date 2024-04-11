import {View} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";

function AllExpenses(){
    return(
        <ExpensesOutput periodName={"RecentExpenses"}></ExpensesOutput>
    )
}

export default  AllExpenses