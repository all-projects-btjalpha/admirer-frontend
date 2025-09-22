import { Modal, Button } from "antd";
import React from "react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface RemoveFromBagProps {
  id: string | number;
  productImage: string;
  onRemove: (id: number) => void;
  onMoveToWishlist: (id: number) => void;
  onQuantityChange: (
    id: number,
    newQty: number,
    options: { forceRemove?: boolean }
  ) => void;
}

const RemoveFromBag: React.FC<RemoveFromBagProps> = ({
  id,
  productImage,
  onRemove,
  onMoveToWishlist,
  onQuantityChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleRemove = () => {
    onRemove(Number(id));
    setIsModalOpen(false);
    onQuantityChange(Number(id), 1, { forceRemove: true });
  };

  const handleMoveToWishlist = () => {
    onMoveToWishlist(Number(id));
    onRemove(Number(id));
    setIsModalOpen(false);
    onQuantityChange(Number(id), 1, { forceRemove: true });
  };

  return (
    <>
      <button
        onClick={showModal} 
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Remove item"
      >
        <FaTimes className="w-4 h-4" />
      </button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closeIcon={false}
        centered
        width="420px"
        className="custom-modal"
        bodyStyle={{ borderRadius: "4px" }}
      >
        <div className="flex flex-col items-start gap-0 ">
          <div className="flex gap-5 ">
            <img
              src={productImage}
              alt="Product"
              className="w-20 h-20 object-cover "
            />
            <div className="flex items-start  w-full">
              <div className="">
                <p className="font-semibold text-[16px] !mb-1">
                  Move from Cart
                </p>
                <p className="text-sm text-gray-500 ">
                  Are you sure you want to move this item from cart?
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 focus:outline-none top-4 right-4 absolute"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-center pt-2 border-t w-full">
            <div className="flex border-r pr-4 w-1/2  justify-center">
              <Button
                type="text"
                className="text-black "
                onClick={handleRemove}
              >
                REMOVE
              </Button>
            </div>
            <div className="flex pl-4 border-l w-1/2">
              <Button
                type="text"
                className="text-purple-600 font-semibold"
                onClick={handleMoveToWishlist}
              >
                MOVE TO WISHLIST
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RemoveFromBag;
