import React from "react";
import { Modal, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  orderId?: string;
  onClose: () => void;
}

const OrderSuccessModal: React.FC<Props> = ({ open, orderId, onClose }) => {
  console.log(orderId)
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onClose}
      centered
      closable={false}
      width={400}
    >
      <div className="text-center py-4">
        <CheckCircleOutlined style={{ fontSize: "48px", color: "#52c41a" }} />
        <h2 className="text-xl font-semibold mt-3">Order Successful!</h2>
        <p className="text-gray-600 mt-1">Thank you for shopping with us.</p>

        {orderId && (
          <p className="text-sm text-gray-500 mt-2">
            Your Order ID:{" "}
            <span className="font-medium text-black">{orderId}</span>
          </p>
        )}

        <div className="flex gap-3 justify-center mt-5">
          <Link to="/dashboard?section=orders">
            <button className="ml-2 px-4 py-2 rounded border text-black border-gray-300 hover:border-purple-600 hover:text-purple-900">
              VIEW ORDER
            </button>
          </Link>
          <Link to="/">
            <button className=" bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
              CONTINUE SHOPPING
            </button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default OrderSuccessModal;
