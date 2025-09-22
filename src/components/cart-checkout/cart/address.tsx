import React, { useState, useCallback } from "react";
import { Form, Input, Button, Spin, Alert, Select } from "antd";
import {
  CompassOutlined,
  UserOutlined,
  EnvironmentOutlined,
  MailOutlined,
  HomeOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { signUp_API } from "../../api/api-end-points";
interface AddressData {
  firstName: string;
  lastName: string;
  email?: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  flat: string;
  locality: string;
  addressType: string;
}

interface AddressBarProps {
  setIsModalVisible: (visible: boolean) => void;
  onAddressChange: (address: AddressData) => void;
}

const AddressBar = ({
  setIsModalVisible,
  onAddressChange,
}: AddressBarProps) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const handleGeolocationSuccess = useCallback(
  //   async (position: GeolocationPosition) => {
  //     try {
  //       setIsLoading(true);
  //       setError(null);

  //       const response = await fetch(
  //         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
  //       );

  //       if (!response.ok) throw new Error("Address lookup failed");

  //       const data = await response.json();
  //       const newAddress = {
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         street: data.address.road || data.address.highway || "",
  //         city:
  //           data.address.city ||
  //           data.address.town ||
  //           data.address.village ||
  //           "",
  //         state: data.address.state || "",
  //         pincode: data.address.postcode || "",
  //         flat: "",
  //         locality: data.address.neighbourhood || data.address.suburb || "",
  //         addressType: "home", // Default to home
  //       };

  //       form.setFieldsValue(newAddress);
  //       onAddressChange(newAddress);
  //     } catch (err) {
  //       setError("Failed to fetch address details");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [form, onAddressChange]
  // );

  // const getCurrentLocation = useCallback(() => {
  //   if (!navigator.geolocation) {
  //     setError("Geolocation is not supported by your browser");
  //     return;
  //   }

  //   setIsLoading(true);
  //   navigator.geolocation.getCurrentPosition(
  //     handleGeolocationSuccess,
  //     (error) => {
  //       setError("Unable to retrieve your location");
  //       setIsLoading(false);
  //     }
  //   );
  // }, [handleGeolocationSuccess]);

  const handleSubmit = async (values: AddressData) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(signUp_API, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("auth_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email?.trim() === "" ? null : values.email,
          flat: values.flat,
          street: values.street,
          locality: values.locality,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
          addressType: values.addressType,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save address");
      }

      // ✅ Close modal
      setIsModalVisible(false);

      // ✅ Trigger parent refresh
      onAddressChange(values);
    } catch (err) {
      console.error("Address submission failed:", err);
      setError("Failed to save address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="max-w-2xl mx-auto"
    >
      {/* First Name and Last Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
          className="mb-3"
        >
          <Input
            allowClear
            prefix={<UserOutlined className="text-gray-400" />}
          />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
          className="mb-3"
        >
          <Input allowClear />
        </Form.Item>
      </div>

      {/* Email Field */}
      <Form.Item
        label="Email (Optional)"
        name="email"
        rules={[
          {
            type: "email",
            message: "Please enter a valid email address!",
          },
        ]}
          className="mb-3"
      >
        <Input
          allowClear
          prefix={<MailOutlined className="text-gray-400" />}
          placeholder="example@domain.com"
        />
      </Form.Item>

      {/* Address Type Field */}
      <Form.Item
        label="Address Type"
        name="addressType"
        rules={[{ required: true, message: "Please select address type!" }]}
        initialValue="home"
          className="mb-3"
      >
        <Select
          options={[
            { value: "home", label: "Home", icon: <HomeOutlined /> },
            { value: "work", label: "Work", icon: <ShopOutlined /> },
            { value: "other", label: "Other" },
          ]}
          optionRender={(option) => (
            <div>
              {option.data.icon} {option.data.label}
            </div>
          )}
        />
      </Form.Item>

      {/* Flat Field */}
      <Form.Item
        label="Flat/House No."
        name="flat"
        rules={[
          { required: true, message: "Please input your flat/house number!" },
        ]}
          className="mb-3"
      >
        <Input allowClear placeholder="e.g. B-102, Sunshine Apartments" />
      </Form.Item>

      <Form.Item
        label="Street Address"
        name="street"
        rules={[
          { required: true, message: "Please input your street address!" },
        ]}
          className="mb-3"
      >
        <Input
          allowClear
          prefix={<CompassOutlined className="text-gray-400" />}
        />
      </Form.Item>

      {/* Locality Field */}
      <Form.Item
        label="Locality/Area"
        name="locality"
        rules={[{ required: true, message: "Please input your locality!" }]}
          className="mb-3"
      >
        <Input allowClear placeholder="e.g. Downtown, Westside" />
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please input your city!" }]}
          className="mb-3"
        >
          <Input allowClear placeholder="Enter your city" />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please input your state!" }]}
          className="mb-3"
        >
          {/* <Input allowClear /> */}
          <Select
            allowClear
            showSearch
            placeholder="Enter your state"
            options={[
              {
                value: "ANDAMAN AND NICOBAR ISLANDS",
                label: "ANDAMAN AND NICOBAR ISLANDS",
              },
              { value: "ANDHRA PRADESH", label: "ANDHRA PRADESH" },
              { value: "ARUNACHAL PRADESH", label: "ARUNACHAL PRADESH" },
              { value: "ASSAM", label: "ASSAM" },
              { value: "BIHAR", label: "BIHAR" },
              { value: "CHANDIGARH", label: "CHANDIGARH" },
              { value: "CHHATTISGARH", label: "CHHATTISGARH" },
              {
                value: "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
                label: "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
              },
              { value: "DELHI", label: "DELHI" },
              { value: "GOA", label: "GOA" },
              { value: "GUJARAT", label: "GUJARAT" },
              { value: "HARYANA", label: "HARYANA" },
              { value: "HIMACHAL PRADESH", label: "HIMACHAL PRADESH" },
              { value: "JAMMU AND KASHMIR", label: "JAMMU AND KASHMIR" },
              { value: "JHARKHAND", label: "JHARKHAND" },
              { value: "KARNATAKA", label: "KARNATAKA" },
              { value: "KERALA", label: "KERALA" },
              { value: "LADAKH", label: "LADAKH" },
              { value: "LAKSHADWEEP", label: "LAKSHADWEEP" },
              { value: "MADHYA PRADESH", label: "MADHYA PRADESH" },
              { value: "MAHARASHTRA", label: "MAHARASHTRA" },
              { value: "MANIPUR", label: "MANIPUR" },
              { value: "MEGHALAYA", label: "MEGHALAYA" },
              { value: "MIZORAM", label: "MIZORAM" },
              { value: "NAGALAND", label: "NAGALAND" },
              { value: "ODISHA", label: "ODISHA" },
              { value: "PUDUCHERRY", label: "PUDUCHERRY" },
              { value: "PUNJAB", label: "PUNJAB" },
              { value: "RAJASTHAN", label: "RAJASTHAN" },
              { value: "SIKKIM", label: "SIKKIM" },
              { value: "TAMIL NADU", label: "TAMIL NADU" },
              { value: "TELANGANA", label: "TELANGANA" },
              { value: "TRIPURA", label: "TRIPURA" },
              { value: "UTTAR PRADESH", label: "UTTAR PRADESH" },
              { value: "UTTARAKHAND", label: "UTTARAKHAND" },
              { value: "WEST BENGAL", label: "WEST BENGAL" },
            ]}
            optionRender={(option) => <div>{option.data.label}</div>}
          />
        </Form.Item>
      </div>

      {/* Pincode Field */}
      <Form.Item
        label="Pincode/Zip Code"
        name="pincode"
        normalize={(value: string) => {
          const digitsOnly = value.replace(/\D/g, ""); // Remove non-numeric chars
          return digitsOnly.slice(0, 6); // Limit to 6 digits
        }}
        rules={[
          { required: true, message: "Please input your pincode!" },
          {
            pattern: /^[0-9]{6}$/,
            message: "Pincode must be exactly 6 digits",
          },
        ]}
          className="mb-3"
      >
        <Input
          placeholder="6 digits [0-9] PIN code"
          allowClear
          maxLength={6}
          prefix={<EnvironmentOutlined className="text-gray-400" />}
        />
      </Form.Item>

      <Form.Item>
        <div style={{ display: "flex", gap: "8px" }}>
          {/* <Button
            className="w-[180px] border rounded h-[40px] py-2 hover:!border-none text-sm text-white hover:!bg-purple-700 hover:!text-white bg-purple-600"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              getCurrentLocation();
            }}
            loading={isLoading}
            icon={<CompassOutlined />}
            htmlType="button"
          >
            {isLoading ? "Detecting Location..." : "Use Current Location"}
          </Button> */}
          <Button
            className="w-[130px] border rounded hover:!border-none mt-3 h-[40px] py-2 text-sm text-white hover:!bg-purple-700 hover:!text-white bg-purple-600"
            htmlType="submit"
            style={{ marginLeft: "auto" }}
          >
            Submit
          </Button>
        </div>
      </Form.Item>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
        />
      )}
    </Form>
  );
};

export default AddressBar;
