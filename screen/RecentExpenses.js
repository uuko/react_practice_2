import {View} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import {useEffect, useState} from "react";
import {getExp} from "../https/https";
import {useDispatch, useSelector} from "react-redux";
import {setExpenses} from "../store/recent_expenses";
import LoadingOverlay from "../components/LoadingOverlay";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const dispatch = useDispatch()
    useEffect(() => {
        async function getExps() {
            setIsFetching(true)
            try {
               const exps =  await getExp()
                console.log("getExp  is :" + JSON.stringify(exps))
                dispatch(setExpenses(exps))
            } catch (error) {

            } finally {
                setIsFetching(false)
            }
        }
        getExps()
    }, []);
    if (isFetching) {
        return <LoadingOverlay />;
    }

    return (
        <View>
            <ExpensesOutput periodName={"AllExpenses"}></ExpensesOutput>

        </View>
    )
}

export default RecentExpenses