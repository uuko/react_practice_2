import {Text, View} from 'react-native';
import {GlobalStyles} from "../style/GlobalStyles";
import {useNavigation} from "@react-navigation/native";
import IconButton from "../components/IconButton";
import {StyleSheet} from "react-native";
import Button from "../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {addExpenses, removeExpenses, updateExpenses} from "../store/recent_expenses";
import {_uuid} from "../utils/date";
import {useLayoutEffect, useState} from "react";
import ExpenseForm from "../components/ExpenseForm";
import {deleteExpense, storeExp, updateExpense} from "../https/https";
import LoadingOverlay from "../components/LoadingOverlay";

function ManageExpense({route, navigation}) {
    const expensesOutData = useSelector((state) => state.totalExpenses.expenses)
    const dispatch = useDispatch()
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const selectedExpense = expensesOutData.find(expense => expense.id === editedExpenseId);
    const [isLoading, setLoading] = useState(false)
    useLayoutEffect(() => {
        navigation.setOptions(
            {
                title: isEditing ? "Edit" : "Add"
            }
        )
    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        setLoading(true)
        try {
            await deleteExpense(route.params.expenseId)
            dispatch(removeExpenses(
                {
                    id: route.params.expenseId
                }
            ))
            navigation.goBack()
        } catch (error) {
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    function cancelHandler() {
        navigation.goBack()
    }

    async function addHandler(expenseData) {
        setLoading(true)
        if (isEditing) {
            await updateExpense(editedExpenseId, expenseData)
            dispatch(updateExpenses(
                {
                    id: editedExpenseId,
                    data: expenseData
                }
            ));
            setLoading(false)
        } else {
            // console.log(JSON.stringify(expenseData))

            storeExp(expenseData).then(r => {
                    expenseData.id = r
                    dispatch(addExpenses(expenseData))
                    setLoading(false)
                }
            ).catch(e => {
                console.error(e)
                return e;
            })

        }

        navigation.goBack()
    }

    if (isLoading) {
        return <LoadingOverlay/>;
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={addHandler}
                onCancel={cancelHandler}
                defaultValues={selectedExpense}
            />
            <View>
                <IconButton
                    icon="trash"
                    color={GlobalStyles.colors.error500}
                    size={36}
                    onPress={deleteExpenseHandler}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});
export default ManageExpense;