import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  changeNumberOtpVerify,
  changeNumberSendOtp,
  UPDATE_PROFILE_API,
  user_profile_API,
} from "../api/api-end-points";
import axios from "axios";
import { toast } from "react-toastify";

const indianStates = [
  "ANDAMAN AND NICOBAR ISLANDS",
  "ANDHRA PRADESH",
  "ARUNACHAL PRADESH",
  "ASSAM",
  "BIHAR",
  "CHANDIGARH",
  "CHHATTISGARH",
  "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
  "DELHI",
  "GOA",
  "GUJARAT",
  "HARYANA",
  "HIMACHAL PRADESH",
  "JAMMU AND KASHMIR",
  "JHARKHAND",
  "KARNATAKA",
  "KERALA",
  "LADAKH",
  "LAKSHADWEEP",
  "MADHYA PRADESH",
  "MAHARASHTRA",
  "MANIPUR",
  "MEGHALAYA",
  "MIZORAM",
  "NAGALAND",
  "ODISHA",
  "PUDUCHERRY",
  "PUNJAB",
  "RAJASTHAN",
  "SIKKIM",
  "TAMIL NADU",
  "TELANGANA",
  "TRIPURA",
  "UTTAR PRADESH",
  "UTTARAKHAND",
  "WEST BENGAL",
];
const Loader = () => (
  <div className=" max-md:mt-5  bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
    {/* Loader content */}
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7b48a5] mb-4"></div>
      {/* <p className="text-lg font-bold text-gray-800">Loading your experience, please wait...</p> */}
    </div>
  </div>
);

const Dashboard_Profile = () => {
  interface profileDataProps {
    first_name?: string;
    last_name?: string;
    mobile: string;
    email?: string;
    flat?: string;
    street?: string;
    locality?: string;
    city?: string;
    zipcode?: string;
    state?: string;
    country?: string;
    address_type?: string;
    status?: string;
  }

  const [profileData, setProfileData] = useState<profileDataProps>();
  const [gender, setGender] = useState("male");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [editedMobile, setEditedMobile] = useState("");
  const [mainMobileError, setMainMobileError] = useState("");
  const [modalMobileError, setModalMobileError] = useState("");
  const [altNumber, setAltNumber] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    fetch(user_profile_API, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setEditedMobile(data.mobile || "");
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || "");
        setGender(data.gender || "male");

        setIsLoading(false);
      });
  }, []);

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "firstName":
        return value.trim() ? "" : "First name is required";
      case "lastName":
        return value.trim() ? "" : "Last name is required";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Enter a valid email address";
      default:
        return "";
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    setEditedMobile(value);

    if (value.length > 0 && value[0] === "0") {
      setMainMobileError("Number cannot start with 0");
    } else if (value.length > 10) {
      setMainMobileError("Number cannot exceed 10 digits");
    } else if (value.length === 10) {
      setMainMobileError("");
    } else {
      setMainMobileError("Enter a valid 10-digit number");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    const value = e.target.value;

    if (field === "firstName") {
      setFirstName(value);
      setFormErrors((prev) => ({
        ...prev,
        firstName: validateField(field, value),
      }));
    } else if (field === "lastName") {
      setLastName(value);
      setFormErrors((prev) => ({
        ...prev,
        lastName: validateField(field, value),
      }));
    } else if (field === "email") {
      setEmail(value);
      setFormErrors((prev) => ({
        ...prev,
        email: validateField(field, value),
      }));
    }
  };

  const isValid =
    editedMobile.length === 10 &&
    mainMobileError === "" &&
    Object.values(formErrors).every((val) => !val);

  const updateProfileAPI = (mobile?: string) => {
    const payload = {
      firstName,
      lastName,
      email,
      gender,
      mobile: mobile ?? profileData?.mobile ?? "",
    };

    console.log("🔄 Sending update payload:", payload);

    fetch(UPDATE_PROFILE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Update response from server:", data);

        // 🔁 After update, fetch the latest full profile
        fetch(user_profile_API, {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        })
          .then((res) => res.json())
          .then((freshData) => {
            setProfileData(freshData);
            setEditedMobile(freshData.mobile || "");
            setFirstName(freshData.first_name || "");
            setLastName(freshData.last_name || "");
            setEmail(freshData.email || "");
            setGender(freshData.gender || "male");
            setIsEditable(false);
          });
      })
      .catch((err) => {
        console.error("❌ Update Failed:", err);
      });
  };

  const handleSendOtp = async () => {
    if (newNumber.length !== 10 || modalMobileError) return;

    try {
      await axios.post(
        changeNumberSendOtp,
        { phone: newNumber },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      );
      setOtpSent(true);
      toast.success(`OTP sent on ${newNumber}`)
    } catch (error) {
      console.error("Send OTP error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpError("OTP is required");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setOtpError("OTP must be exactly 6 digits");
      return;
    }
    try {
      await axios.post(
        changeNumberOtpVerify,
        {
          phone: newNumber,
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      );
      setProfileData((prevData) => ({
        ...prevData,
        mobile: newNumber, // Set the new mobile number
      }));
      setEditedMobile(newNumber); // Update the edited mobile state with the new number

      toast.success("Mobile number updated successfully.")
      setIsModalOpen(false);
      setNewNumber("");
      setOtp("");
      setOtpSent(false);
      setModalMobileError("");
    } catch (error) {
      console.error("Verify OTP error:", error);
    }
  };

  const toggleEdit = () => {
    if (isEditable) {
      // Validate all fields before saving
      const newErrors = {
        firstName: validateField("firstName", firstName),
        lastName: validateField("lastName", lastName),
        email: validateField("email", email),
      };

      setFormErrors(newErrors);

      if (!isValid || Object.values(newErrors).some((error) => error)) {
        console.log("Form has errors or is incomplete.");
        return;
      }

      if (editedMobile !== profileData?.mobile) {
        setNewNumber(editedMobile);
        setIsModalOpen(true);
      } else {
        updateProfileAPI();
      }
    } else {
      setEditedMobile(profileData?.mobile || "");
    }

    setIsEditable((prev) => !prev);
  };
  if (isLoading) return <Loader />;
  return (
    <div className="m-auto bg-white shadow-md p-8 max-sm:p-4 max-sm:mt-3 w-full">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2">Edit Profile</h2>
      {/* {isLoading &&   <Loader />} */}
      {/* Mobile Number */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Mobile Number*
        </label>
        <input
          type="tel"
          placeholder="Mobile Number"
          value={isEditable ? editedMobile : profileData?.mobile || ""}
          onChange={handleMobileChange}
          className={`w-full border rounded px-4 py-3 text-sm ${
            isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEditable}
        />
        {mainMobileError && (
          <p className="text-red-500 text-sm">{mainMobileError}</p>
        )}
      </div>

      {/* First & Last Name */}
      <div className="flex gap-4 ">
      <div className="w-1/2 mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          First Name
        </label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => handleInputChange(e, "firstName")}
          className={`w-full border rounded px-4 py-3 text-sm ${
            isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEditable}
        />
        {formErrors.firstName && (
          <p className="text-red-500 text-sm">{formErrors.firstName}</p>
        )}
      </div>
      <div className="w-1/2 mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Last Name
        </label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => handleInputChange(e, "lastName")}
          className={`w-full border rounded px-4 py-3 text-sm ${
            isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEditable}
        />
        {formErrors.lastName && (
          <p className="text-red-500 text-sm">{formErrors.lastName}</p>
        )}
      </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleInputChange(e, "email")}
          className={`w-full border rounded px-4 py-3 text-sm ${
            isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEditable}
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm">{formErrors.email}</p>
        )}
      </div>

      {/* Save / Edit Button */}
      <button
        className={`w-full mt-2 py-3 rounded text-white ${
          isEditable
            ? isValid
              ? "bg-[#7b48a5] hover:bg-purple-700"
              : "bg-gray-400 cursor-not-allowed"
            : "bg-[#7b48a5] hover:bg-purple-700"
        }`}
        onClick={toggleEdit}
        disabled={isEditable && !isValid}
      >
        {isEditable ? "SAVE DETAILS" : "EDIT DETAILS"}
      </button>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          setNewNumber("");
          setModalMobileError("");
          setOtpSent(false);
          setOtp("");
        }}
        closeIcon={<CloseOutlined />}
        centered
        className="!w-[420px]"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Change Mobile Number
        </h2>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Mobile Number
          </label>
          <input
            type="text"
            value={profileData?.mobile}
            readOnly
            className="w-full border px-4 py-3 rounded bg-gray-100 text-sm text-gray-600 cursor-not-allowed"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Mobile Number
          </label>
          <input
            type="tel"
            value={newNumber}
            onChange={(e) => {
              if (otpSent) return;
              const value = e.target.value;
              if (!/^\d*$/.test(value)) return;
              setNewNumber(value);

              if (value.length > 0 && value[0] === "0") {
                setModalMobileError("Number cannot start with 0");
              } else if (value.length > 10) {
                setModalMobileError("Number cannot exceed 10 digits");
              } else if (value.length === 10) {
                setModalMobileError("");
              } else {
                setModalMobileError("Enter a valid 10-digit number");
              }
            }}
            readOnly={otpSent}
            className={`w-full border rounded px-4 py-3 text-sm ${
              otpSent ? "bg-gray-100 text-gray-600 cursor-not-allowed" : ""
            }`}
          />
          {modalMobileError && (
            <p className="text-red-500 text-sm">{modalMobileError}</p>
          )}
        </div>

        {otpSent && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>

            <div className="flex gap-3 justify-center">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-10 h-12 text-center border-b border-gray-600  text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  id={`otp-${index}`}
                  value={otp[index] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    const otpArr = otp.split("");
                    otpArr[index] = val;
                    const newOtp = otpArr.join("").padEnd(6, "");
                    setOtp(newOtp);
                    if (otpError) setOtpError("");

                    if (val && index < 5) {
                      document.getElementById(`otp-${index + 1}`)?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index] && index > 0) {
                      document.getElementById(`otp-${index - 1}`)?.focus();
                    }
                  }}
                />
              ))}
            </div>

            {otpError && (
              <p className="text-red-500 text-sm mt-1">{otpError}</p>
            )}
          </div>
        )}

        {!otpSent ? (
          <Button
            className="w-full !bg-[#7b48a5] hover:!bg-purple-700 h-[45px] mt-2 !text-white !border-none"
            onClick={handleSendOtp}
          >
            SEND OTP
          </Button>
        ) : (
          <Button
            className="w-full !bg-[#7b48a5] hover:!bg-purple-700 h-[45px] mt-2 !text-white !border-none"
            onClick={handleVerifyOtp}
          >
            VERIFY OTP
          </Button>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard_Profile;
