type RestTransaction = Readonly <{
    message: string
}>

type TransactionError = Readonly<{
    statusCode: 400,
    message: "Insufficient balance"
}>

export type {RestTransaction, TransactionError}