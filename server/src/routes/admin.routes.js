import { Router } from "express";
import { authenticate, authorizeRoles } from "../middleware/authenticate.js";
import {
  dashboardStats,
  getAllUsers,
  getAdminOrders,
  updateOrderDelivery,
  updatePaymentStatus,
  getOrdersRevenue,
} from "../controller/admin.controller.js";

const router = Router();
router.get("/stats", authenticate, authorizeRoles("admin"), dashboardStats);
router.get("/get_users", authenticate, authorizeRoles("admin"), getAllUsers);
router.get(
  "/get_orders",
  authenticate,
  authorizeRoles("admin"),
  getAdminOrders
);
router.patch(
  "/update_delivery_status/:bookingId",
  authenticate,
  authorizeRoles("admin"),
  updateOrderDelivery
);
router.patch(
  "/update_payment_status/:bookingId",
  authenticate,
  authorizeRoles("admin"),
  updatePaymentStatus
);
router.get(
  "/revenue_stats",
  authenticate,
  authorizeRoles("admin"),
  getOrdersRevenue
);

export default router;
