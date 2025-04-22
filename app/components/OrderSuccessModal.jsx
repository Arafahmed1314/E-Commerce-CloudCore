"use client";
import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

const OrderSuccessModal = ({ isOpen, onClose, successData }) => {
  if (!isOpen || !successData) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-xl max-w-lg w-full p-8 relative shadow-2xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-gray-100"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Close success modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-[#22c55e] mx-auto mb-4" />
              <h2 className="text-3xl font-display font-semibold text-gray-900 mb-4">
                Order Placed Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Your order has been received. We’ll contact you soon for
                confirmation.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  <strong>Product:</strong> {successData.productTitle}
                </p>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  <strong>Quantity:</strong> {successData.s_product_qty}
                </p>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  <strong>Total:</strong> ${successData.cod_amount}
                  {successData.discount_amount && (
                    <span className="text-[#dc2626]">
                      {" "}
                      (Discount: ${successData.discount_amount})
                    </span>
                  )}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  <strong>Delivery:</strong> {successData.courier} to{" "}
                  {successData.address}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-[#1d4ed8] to-[#1e40af] text-white py-3 rounded-lg font-medium text-lg shadow-md hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#1d4ed8]/50"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default OrderSuccessModal;
