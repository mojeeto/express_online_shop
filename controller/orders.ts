import controller from "./controller";

export const getOrders: controller = (req, res, next) => {
  res.send("<h1>Orders</h1>");
};
