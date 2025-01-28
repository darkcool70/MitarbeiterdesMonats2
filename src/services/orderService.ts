import { db } from "../../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { Order } from "../types/database.types";

export const orderService = {
  async createOrder(
    orderData: Omit<Order, "id" | "created_at" | "updated_at">
  ) {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        ...orderData,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  async savePrintFile(orderId: string, itemId: string, base64Image: string) {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        [`items.${itemId}.print_file_data`]: base64Image,
      });
      return true;
    } catch (error) {
      console.error("Error saving print file:", error);
      throw error;
    }
  },
};
