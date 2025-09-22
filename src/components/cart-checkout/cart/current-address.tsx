import React, { useState, useEffect } from "react";
import { Modal, Select } from "antd";
import AddressBar from "./address";
import {
  HomeOutlined,
  EnvironmentOutlined,
  PushpinOutlined,
} from "@ant-design/icons";

interface Address {
  first_name?: string;
  // firstname?: string;
  last_name?: string;
  // lastname?: string;
  flat: string;
  street: string;
  locality: string;
  city: string;
  state: string;
  zip_code?: string;
  // zipcode?: string;
  addr_type: string;
  email?: string | null;
}

interface DeliveryInfoProps {
  billingAddress: Address;
  shippingAddresses: Address[];
  onAddressSelect: (address: Address) => void;
  onAddressSaved: () => void;
  externalTriggerOpen?: boolean; // 👈 Add this new prop
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({
  billingAddress,
  shippingAddresses,
  onAddressSelect,
  onAddressSaved, // ✅ extract it
  externalTriggerOpen,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [allAddresses, setAllAddresses] = useState<Address[]>([]);
  const reversedAddresses = [...allAddresses].reverse();

  useEffect(() => {
    const combined = [billingAddress, ...shippingAddresses].filter(
      (addr) => addr && addr.flat
    );
    setAllAddresses(combined);
    if (combined.length > 0) {
      const latestAddress = combined[combined.length - 1]; // select last added
      setSelectedAddress(latestAddress);
      onAddressSelect(latestAddress);
    } else {
      setSelectedAddress(null);
    }
  }, [billingAddress, shippingAddresses]);

  useEffect(() => {
    if (externalTriggerOpen) {
      setIsModalVisible(true);
    }
  }, [externalTriggerOpen]);

  const handleAddressSelect = (index: number) => {
    const selected = allAddresses[index];
    setSelectedAddress(selected);
    onAddressSelect(selected);
  };

  const getName = (address: Address) => {
    return address.first_name || "";
  };

  const getLastName = (address: Address) => {
    return address.last_name || "";
  };

  const getZipCode = (address: Address) => {
    return address.zip_code || "";
  };

  function onModalClose() {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      {allAddresses.length === 0 ? (
        <div className="flex items-center justify-center p-6 px-0 !max-md:p-4 gap-2">
          <div
            className="justify-between w-[80%] max-md:w-[75%]"
            style={{
              height: "40px",
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #e8e8e8",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <p
              className="font-semibold p-3 max-md:px-2 max-md:text-base"
              style={{ color: "#555", marginBottom: "16px"}}
            >
              There are no saved addresses.
            </p>
          </div>
          <button
            className="px-1 w-[20%] text-xs max-md:px-0 max-md:w-[25%]"
            style={{
              border: "none",
              borderRadius: "10px",
              height: "40px",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "white",
              backgroundColor: "#722ed1",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(114, 46, 209, 0.3)",
            }}
            onClick={() => setIsModalVisible(true)}
          >
            Add Address
          </button>
        </div>
      ) : (
        <div
          className="p-6 max-md:p-3"
          style={{
            display: "flex",
            width: "100%",
            margin: "16px 0",
            borderRadius: "12px",
            backgroundColor: "white",
            border: "1px solid #e8e8e8",
            position: "relative",
            minHeight: "150px",
          }}
        >
          <div style={{ width: "100%" }}>
            <div
              style={{
                fontWeight: "600",
                marginBottom: "12px",
                fontSize: "18px",
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <EnvironmentOutlined style={{ color: "#722ed1" }} />
              Deliver to {getName(selectedAddress!)}{" "}
              {getLastName(selectedAddress!)}
            </div>

            <div
              style={{
                marginBottom: "8px",
                color: "#555",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                lineHeight: "1.5",
              }}
            >
              <HomeOutlined style={{ color: "#722ed1", marginTop: "3px" }} />
              <div>
                <div style={{ fontWeight: "500" }}>
                  {selectedAddress?.flat}, {selectedAddress?.street},{" "}
                  {selectedAddress?.locality}
                </div>
                <div></div>
              </div>
            </div>

            <div
              style={{
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <PushpinOutlined style={{ color: "#722ed1" }} />
              {selectedAddress?.city}, {selectedAddress?.state},{" "}
              {getZipCode(selectedAddress!)}
            </div>

            <div
              className="flex justify-between gap-3 max-md:gap-2"
              style={{ marginTop: "16px" }}
            >
              <Select
                style={{  height: "35px" }}
                value={JSON.stringify(selectedAddress)}
                onChange={(value) => {
                  const selected = JSON.parse(value) as Address;
                  setSelectedAddress(selected);
                  onAddressSelect(selected);
                }}
                options={reversedAddresses.map((address) => ({
                  value: JSON.stringify(address),
                  label: `${address.addr_type}: ${getName(
                    address
                  )} ${getLastName(address)}, ${address.flat}, ${address.city}`,
                }))}
                className="w-[80%] max-md:w-[70%]"
              />
              <button
                className="text-[14px] max-md:text-[12px] p-1 w-[20%] max-md:w-[30%]"
                style={{
                  border: "none",
                  borderRadius: "6px",
                  height: "34px",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: "white",
                  backgroundColor: "#722ed1",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(114, 46, 209, 0.3)",
                }}
                onClick={() => setIsModalVisible(true)}
              >
                Add New
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        title={
          <span style={{ color: "#722ed1" }}>Add New Address</span>
        }
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          onModalClose?.();
        }}
        footer={null}
        width={700}
        centered
      >
        <AddressBar
          setIsModalVisible={setIsModalVisible}
          onAddressChange={onAddressSaved}
        />
      </Modal>
    </>
  );
};

export default DeliveryInfo;
