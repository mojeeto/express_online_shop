import Order from "../models/order";
import {
  InvoiceDataType,
  InvoiceDataTypeItem,
  createInvoice,
} from "../utils/invoice";
import controller from "./controller";

export const getOrders: controller = (req, res, next) => {
  Order.find({ userId: req.user!._id })
    .then((orders) => {
      res.render("pages/orders/index", {
        pageTitle: "orders",
        path: "/orders",
        orders,
        isAuthenticated: req.session.isAuthenticated,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addOrder: controller = (req, res, next) => {
  req
    .user!.populate("cart.products._id")
    .then((user) => {
      const products = user.cart.products.map((product) => {
        return {
          product: product._id["_doc"],
          count: product.count,
        };
      });
      const totalPrice = user.cart.totalPrice;
      const order = new Order({
        products: products,
        totalPrice,
        userId: user._id,
      });
      return order.save();
    })
    .then((result) => req.user!.clearCart())
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getInvoicePdf: controller = (req, res, next) => {
  const { orderId } = req.params;
  Order.findOne({ _id: orderId })
    .populate("userId")
    .then((order) => {
      if (order!.userId.id !== req.user!.id) return res.redirect("/orders");
      const invoiceItems: InvoiceDataTypeItem[] = order!.products.map(
        ({ product, count }) => {
          return {
            title: product.title,
            description: product.description,
            quantity: count,
            price: product.price,
            amount: +(product.price * count).toFixed(2),
          };
        }
      );
      const invoiceData: InvoiceDataType = {
        items: invoiceItems,
        orderNumber: order!.id,
        shipping: {
          email: order!.userId.email,
        },
        subtotal: order!.totalPrice,
      };
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename:'document.pdf'"
      );
      createInvoice(invoiceData, res);
    })
    .catch((err) => next(new Error(err)));
};
