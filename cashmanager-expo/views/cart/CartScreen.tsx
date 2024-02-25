import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
// Context
import { useUser, useUserDispatch } from "../../store/Context";
// Components
import NavbarComponent from "../../components/navbar/NavbarComponent";
import ScanScreen from "./ScanScreen";
import { onPressUpdateState } from "../shop/utils";
import { requestTransaction } from "../../api/bank/request-transaction";
import { createOrder } from "../../api/order/create-order";
import ModalSuccess from "../../components/modalSuccess/ModalSuccess";

export default function CartScreen({ navigation }: any) {
  const [paymentState, setPaymentState] = useState<string>('')
  const [modalState, setModalState] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false)
  const [modalSuccessType, setModalSuccessType] = useState<string>('')

  const user = useUser();
  const dispatch = useUserDispatch();

  const removeFromCart = (productId: React.Key | null | undefined) => {
    dispatch({ type: "removeFromCart", payload: { productId } });
  };

  useEffect(() => {
    if (user && user.products && user.products.length > 0) {
      const cartTotal = user.products.reduce(
        (acc: number, product: { price: string }) =>
          acc + parseFloat(product.price),
        0
      );
      setTotal(cartTotal);
    } else {
      setTotal(0);
    }
  }, [user.products]);

  useEffect(() => {
    const performTransaction = async () => {
      if (paymentState && total > 0) {
        const productId = user.products ? user.products.map((product: any) => {
          return product.id
        }) : [];
        const response = await requestTransaction(total, paymentState);
        if (response === 200 && productId > 0) {
          createOrder(user.id, total, productId, 'complete')
          setModalSuccessType('success')
          setTimeout(() => setModalSuccessType(''), 2000);
          setTimeout(() => dispatch({type: "paymentComplete"}), 2000)
          setPaymentState('')
        }
        else if (response === 400 && productId > 0){
          createOrder(user.id, total, productId, 'pending')
          setModalSuccessType('error')
          setTimeout(() => setModalSuccessType(''), 2000);
          setPaymentState('')      
        }
        else {
          createOrder(user.id, total, productId, 'error')
          setModalSuccessType('error')
          setTimeout(() => setModalSuccessType(''), 2000); 
          setPaymentState('')     
        }
      }
    };
  
    performTransaction();
  }, [paymentState, total, user.products]);
  

  if (!user || !user.products || user.products.length === 0) {
    return (
      <View className="relative h-screen">
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-semibold text-[#168489]">
              Votre panier est vide.
            </Text>
          </View>
        </ScrollView>
        <NavbarComponent navigation={navigation} />
      </View>
    );
  }

  return (
    <View className="relative h-screen">
    {modalSuccessType && (
        <ModalSuccess type={modalSuccessType} />
    )}
    {modalState && (
          <ScanScreen
            setPaymentState={setPaymentState}
            setModalState={setModalState}
            modalState={modalState}
          />
        )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View className="mb-4 px-5">
          <Text className="text-3xl text-[#168489] font-semibold mb-2">
            Panier
          </Text>
          <Text className="text-xl">Total : {total} €</Text>
        </View>
        <View>
          {user.products.map(
            (product: {
              id: React.Key | null | undefined;
              name: string;
              price: string;
              description: string;
              image: string;
            }) => (
              <View
                key={product.id}
                className="flex flex-row items-center justify-between border-b border-[#E6E6E6] pb-4 mt-3 mx-6"
              >
                <View className="w-[70%]">
                  <Text className="text-xl font-semibold">{product.name}</Text>
                  <Text className="text-lg text-[#808080] font-semibold mb-1">
                    {product.price} €
                  </Text>
                  <Text className="font-light">{product.description}</Text>
                  <Pressable
                    onPress={() => removeFromCart(product.id)}
                    className="mt-2"
                  >
                    <Text>Supprimer</Text>
                  </Pressable>
                </View>
                <ImageBackground
                  className="h-20 w-20 rounded-full overflow-hidden"
                  source={{ uri: product.image }}
                ></ImageBackground>
              </View>
            )
          )}
        </View>
      </ScrollView>
      <View className="absolute z-10 bottom-28 w-full flex items-center justify-center">
        <Pressable
          onPress={onPressUpdateState(setModalState, modalState)}
          className="h-12 w-[90%] bg-black flex items-center justify-center rounded-lg"
        >
          <Text className="text-white text-xl">Finaliser votre commande</Text>
        </Pressable>
      </View>
      <NavbarComponent navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    marginTop: 50,
    padding: 16,
  },
});
