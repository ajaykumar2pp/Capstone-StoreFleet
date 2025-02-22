import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  // Write your code here for placing a new order
  try {
    const newOrder = new OrderModel(data);
    return await newOrder.save();
  } catch (error) {
    throw new Error("Error while creating a new order: " + error.message);
  }
};
