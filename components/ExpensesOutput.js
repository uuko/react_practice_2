import {StyleSheet, View} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {useSelector} from "react-redux";
const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e6',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e7',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e8',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e9',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2022-02-18')
    }
];
function ExpensesOutput({periodName}
){
    const expensesOutData = useSelector((state)=>state.totalExpenses.expenses)
    return (<View style={styles.container}>
        <ExpensesSummary periodName={periodName} expense={expensesOutData}></ExpensesSummary>
        <ExpensesList expense={expensesOutData}></ExpensesList>
    </View>)
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:20
    }
})
export  default  ExpensesOutput