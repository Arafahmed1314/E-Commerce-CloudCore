"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { submitOrder } from "../action/SubmitOrder";
import OrderSuccessModal from "./OrderSuccessModal";

const OrderFormModal = ({ isOpen, onClose, product, quantity }) => {
  const [formData, setFormData] = useState({
    c_name: "",
    c_phone: "",
    address: "",
    courier: "steadfast",
    advance: "",
    delivery_charge: "80",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);

  if (!isOpen || !product) return null;

  const discountedPrice =
    product.discount > 0
      ? product.price - product.price * (product.discount / 100)
      : null;

  const totalPrice = (discountedPrice || product.price) * quantity;
  const discountAmount = discountedPrice
    ? product.price * (product.discount / 100) * quantity
    : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const orderData = {
      product_ids: product.id.toString(),
      s_product_qty: quantity.toString(),
      c_phone: formData.c_phone,
      c_name: formData.c_name,
      courier: formData.courier,
      address: formData.address,
      advance: formData.advance ? parseFloat(formData.advance) : null,
      cod_amount: totalPrice.toFixed(2),
      discount_amount: discountAmount ? discountAmount.toFixed(2) : null,
      delivery_charge: formData.delivery_charge || "80",
    };

    const result = await submitOrder(orderData);

    if (result.success) {
      setSuccess(true);
      setSuccessData({ ...orderData, productTitle: product.title });
      console.log("Order submitted successfully:", result.data);
    } else {
      setError(result.error || "Failed to submit order. Please try again.");
    }
  };

  const handleSuccessClose = () => {
    setSuccess(false);
    setSuccessData(null);
    setFormData({
      c_name: "",
      c_phone: "",
      address: "",
      courier: "steadfast",
      advance: "",
      delivery_charge: "80",
    });
    onClose();
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="form-modal"
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
            className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-gray-100"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-display font-semibold text-gray-900 mb-6">
              Place Your Order
            </h2>
            {error && (
              <div className="mb-4 p-3 bg-[#dc2626]/10 text-[#dc2626] rounded-lg text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="c_name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="c_name"
                  name="c_name"
                  value={formData.c_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1d4ed8] focus:border-[#1d4ed8] shadow-sm transition-all bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="c_phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="c_phone"
                  name="c_phone"
                  value={formData.c_phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10,15}"
                  placeholder="e.g., 01734252112"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1d4ed8] focus:border-[#1d4ed8] shadow-sm transition-all bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Enter your full address"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1d4ed8] focus:border-[#1d4ed8] shadow-sm transition-all bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="courier"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Courier Service *
                </label>
                <select
                  id="courier"
                  name="courier"
                  value={formData.courier}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1d4ed8] focus:border-[#1d4ed8] shadow-sm transition-all bg-white text-gray-900"
                >
                  <option value="steadfast">Steadfast</option>
                  <option value="redx">RedX</option>
                  <option value="pathao">Pathao</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="advance"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Advance Payment (Optional)
                </label>
                <input
                  type="number"
                  id="advance"
                  name="advance"
                  value={formData.advance}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g., 500"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1d4ed8] focus:border-[#1d4ed8] shadow-sm transition-all bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="delivery_charge"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Delivery Charge
                </label>
                <input
                  type="number"
                  id="delivery_charge"
                  name="delivery_charge"
                  value={formData.delivery_charge}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="Default: 80"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1d4ed8] focus:border-[#1d4ed8] shadow-sm transition-all bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    <strong>Product:</strong> {product.title}
                  </p>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    <strong>Quantity:</strong> {quantity}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    <strong>Total:</strong> ${totalPrice.toFixed(2)}
                    {discountAmount && (
                      <span className="text-[#dc2626]">
                        {" "}
                        (Discount: ${discountAmount.toFixed(2)})
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1d4ed8] to-[#1e40af] text-white py-3.5 rounded-lg font-medium text-lg shadow-md hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#1d4ed8]/50"
              >
                Submit Order
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
      <OrderSuccessModal
        key="success-modal"
        isOpen={success}
        onClose={handleSuccessClose}
        successData={successData}
      />
    </AnimatePresence>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default OrderFormModal;
