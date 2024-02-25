import { Ban, CheckCircle } from "lucide-react-native"
import { Text, View } from "react-native"

type Properties = Readonly<{
    type: string
}>

const ModalSuccess = ({type}: Properties) => {
    if (type === 'error')
    {
        return (
            <View className="absolute h-full w-full z-40 bg-slate-50 flex flex-col items-center justify-center">
                <Ban height={'200px'} width={'200px'} className="text-red-600 mb-10" />
                <Text className="text-red-600 font-bold text-3xl">Paiement Refusé</Text>
            </View>
        )
    }
    else if(type === 'success') {
        return (
            <View className="absolute h-full w-full z-40 bg-slate-50 flex flex-col items-center justify-center">
                <CheckCircle height={'200px'} width={'200px'} className="text-[#168489] mb-10"/>
                <Text className="text-[#168489] font-bold text-3xl">Paiement Accepté</Text>
            </View>
        )
    }
    else return
}

export default ModalSuccess