import axios from "axios"
import { RestTransaction, TransactionError } from "./entities"

const requestTransaction = async (price: number, paymentState:string) => {
    try{
        const data = {
            identifier: paymentState,
            price: price
        }
        const result = await axios.post<RestTransaction | TransactionError>('https://localhost:3000/transactions/confirm-transaction', data)
        if (result.status === 200)
            return 200
        else (result.status === 400)
        return 400
    }
    catch(error: unknown)
    {
        console.log(error)
        return null
    }
}

export {requestTransaction}