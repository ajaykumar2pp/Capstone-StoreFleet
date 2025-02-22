// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try{

    const { user, shippingInfo, orderedItems, paymentInfo, paidAt, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    console.log(req.body)

    if (!user || !shippingInfo || !orderedItems || orderedItems.length === 0 || !paymentInfo || !totalPrice) {
      return next(new ErrorHandler(400, "All required fields must be provided"));
    }

    const newOrder = {
      user,
      shippingInfo,
      orderedItems,
      paymentInfo,
      paidAt: paidAt ? new Date(paidAt) : new Date(),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    const order = await createNewOrderRepo(newOrder);


    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  }catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};
