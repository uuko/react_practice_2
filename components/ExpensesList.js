import {FlatList} from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem({item}){
    return(
        <ExpenseItem item={item}></ExpenseItem>
    )
}
function ExpensesList({expense}){
    return(
        <FlatList data={expense} renderItem={renderExpenseItem}
                  keyExtractor={(item, index)=>item.id}/>
    )

}


export default ExpensesList