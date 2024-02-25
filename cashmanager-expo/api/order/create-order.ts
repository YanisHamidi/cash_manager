import axios from "axios"

const createOrder = async (userId: number, totalPrice:number, idProducts: number[], status: string) => {
    try{
        const data = {
            userId: userId,
            totalPrice: totalPrice,
            idProducts: idProducts,
            status: status
        }
        const result = await axios.post('https://localhost:3000/orders/create-order-by-user-id', data)
        if (result.status === 201)
            return 201
        return null
    }
    catch (error: any)
    {
        if (error.response.data.message) alert(error.response.data.message);
        else
        console.log(error)
    }
}

export {createOrder}