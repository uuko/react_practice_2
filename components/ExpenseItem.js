import {Pressable, Text, View} from "react-native";
import {StyleSheet} from "react-native";
import {GlobalStyles} from "../style/GlobalStyles";
import {getFormattedDate} from "../utils/date";
import {useNavigation} from "@react-navigation/native";
function ExpenseItem({item}){
    const  navigation = useNavigation()
    // console.log(JSON.stringify(item))
    function expensePressHandler() {
        navigation.navigate('ManageExpense', {
            expenseId: item.id
        });
    }
    return (

        <Pressable    style={({ pressed }) => pressed && styles.pressed}
          onPress={expensePressHandler}
        >
            <View style={styles.expenseItem}>
                <View >
                    <Text style={[styles.textBase, styles.description]}>
                        {item.description}
                    </Text>
                    <Text style={styles.textBase}>{item.date}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{item.amount}</Text>
                </View>
            </View>

        </Pressable>
    )

}

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth:80,
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.75,
    },
})

export default ExpenseItem