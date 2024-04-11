import axios from "axios";


const BG_URL ="https://mymail-e843e.firebaseio.com/"

export async function storeExp(exp) {
    const res = await axios.post(BG_URL + "/expense.json", exp)
    const id = res.data.name
    console.log("storeExp id is: " + id )
    return id
}

export async function getExp(){
    const response = await axios.get(BG_URL + '/expenses.json');

    const expenses = [];
    for (const key in response.data){

        const obj ={
            id:key,
            amount:response.data[key].amount,
            date: response.data[key].date,
            description: response.data[key].description
        }
        expenses.push(obj);
    }
    return expenses

}

export  function updateExpense(id, expenseData) {
    console.log("updateExpense id is :" + id)
    return  axios.put(BG_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return axios.delete(BG_URL + `/expenses/${id}.json`);
}