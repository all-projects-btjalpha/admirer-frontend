import React, { useState, useEffect } from "react";
import { changeNumberOtpVerify, changeNumberSendOtp, UPDATE_PROFILE_API, user_profile_API } from "../api/api-end-points";
import axios from "axios";

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


const Dashboard_Address = () => {
  interface profileDataProps {
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
  const [newNumber, setNewNumber] = useState("");
  const [editedMobile, setEditedMobile] = useState("");
  const [mainMobileError, setMainMobileError] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formErrors, setFormErrors] = useState({
    flat: "",
    street: "",
    locality: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
    addressType: "",
  });

  // New address fields
  const [flat, setFlat] = useState("");
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [addressType, setAddressType] = useState("");

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

        // Set new address fields
        setFlat(data.flat || "");
        setStreet(data.street || "");
        setLocality(data.locality || "");
        setCity(data.city || "");
        setZipcode(data.zipcode || "");
        setState(data.state || "");
        setCountry(data.country || "");
        setAddressType(data.address_type || "");
        setIsLoading(false);
      });
  }, []);

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "flat":
        return value.trim() ? "" : "Flat/House number is required";
      case "street":
        return value.trim() ? "" : "Street is required";
      case "locality":
        return value.trim() ? "" : "Locality is required";
      case "city":
        return value.trim() ? "" : "City is required";
      case "zipcode":
        if (!value) return "Pincode is required";
        if (!/^\d{6}$/.test(value)) return "Enter a valid 6-digit pincode";
        return "";
      case "state":
        return value.trim() ? "" : "State is required";
      case "addressType":
        return value.trim() ? "" : "Address type is required";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    const value = e.target.value;

    if (field === "flat") {
      setFlat(value);
      setFormErrors((prev) => ({
        ...prev,
        flat: validateField(field, value),
      }));
    } else if (field === "street") {
      setStreet(value);
      setFormErrors((prev) => ({
        ...prev,
        street: validateField(field, value),
      }));
    } else if (field === "locality") {
      setLocality(value);
      setFormErrors((prev) => ({
        ...prev,
        locality: validateField(field, value),
      }));
    } else if (field === "city") {
      setCity(value);
      setFormErrors((prev) => ({
        ...prev,
        city: validateField(field, value),
      }));
    } else if (field === "zipcode") {
      // Allow only digits and limit to 6 characters
      if (/^\d{0,6}$/.test(value)) {
        setZipcode(value);
        setFormErrors((prev) => ({
          ...prev,
          zipcode: validateField(field, value),
        }));
      }
    } else if (field === "state") {
      setState(value);
      setFormErrors((prev) => ({
        ...prev,
        state: validateField(field, value),
      }));
    } else if (field === "addressType") {
      setAddressType(value);
      setFormErrors((prev) => ({
        ...prev,
        addressType: validateField(field, value),
      }));
    }
  };

  const isValid =
    Object.values(formErrors).every((val) => !val);

  const updateProfileAPI = (mobile?: string) => {
    const payload = {
      flat,
      street,
      locality,
      city,
      zipcode,
      state,
      country,
      address_type: addressType,
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
            setGender(freshData.gender || "male");
            setFlat(freshData.flat || "");
            setStreet(freshData.street || "");
            setLocality(freshData.locality || "");
            setCity(freshData.city || "");
            setZipcode(freshData.zipcode || "");
            setState(freshData.state || "");
            setCountry(freshData.country || "");
            setAddressType(freshData.address_type || "");
            setIsEditable(false);
            
          });
      })
      .catch((err) => {
        console.error("❌ Update Failed:", err);
      });
  };

  const toggleEdit = () => {
    if (isEditable) {
      // Validate all fields before saving
      const newErrors = {
        flat: validateField("flat", flat),
        street: validateField("street", street),
        locality: validateField("locality", locality),
        city: validateField("city", city),
        zipcode: validateField("zipcode", zipcode),
        state: validateField("state", state),
        country: validateField("country", country),
        addressType: validateField("addressType", addressType),
      };

      setFormErrors(newErrors);

      if (!isValid || Object.values(newErrors).some((error) => error)) {
        console.log("Form has errors or is incomplete.");
        return;
      }

       else {
        updateProfileAPI();
      }
    } else {
    }

    setIsEditable((prev) => !prev);
  };
  if (isLoading) return <Loader />;
  return (
    <div className="m-auto bg-white shadow-md p-8 max-sm:p-4 max-sm:mt-3 w-full">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2">Edit Address</h2>
      {/* {isLoading &&   <Loader />} */}
    

      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Flat/House No.*
          </label>
          <input
            type="text"
            placeholder="Flat/House No."
            value={flat}
            onChange={(e) => handleInputChange(e, "flat")}
            className={`w-full border rounded px-4 py-3 text-sm ${
              isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isEditable}
          />
          {formErrors.flat && (
            <p className="text-red-500 text-sm">{formErrors.flat}</p>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Street*
          </label>
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => handleInputChange(e, "street")}
            className={`w-full border rounded px-4 py-3 text-sm ${
              isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isEditable}
          />
          {formErrors.street && (
            <p className="text-red-500 text-sm">{formErrors.street}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Locality*
        </label>
        <input
          type="text"
          placeholder="Locality"
          value={locality}
          onChange={(e) => handleInputChange(e, "locality")}
          className={`w-full border rounded px-4 py-3 text-sm ${
            isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEditable}
        />
        {formErrors.locality && (
          <p className="text-red-500 text-sm">{formErrors.locality}</p>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            City*
          </label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => handleInputChange(e, "city")}
            className={`w-full border rounded px-4 py-3 text-sm ${
              isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isEditable}
          />
          {formErrors.city && (
            <p className="text-red-500 text-sm">{formErrors.city}</p>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Pincode*
          </label>
          <input
            type="text"
            placeholder="Pincode"
            value={zipcode}
            onChange={(e) => handleInputChange(e, "zipcode")}
            className={`w-full border rounded px-4 py-3 text-sm ${
              isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isEditable}
            maxLength={6}
          />
          {formErrors.zipcode && (
            <p className="text-red-500 text-sm">{formErrors.zipcode}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            State*
          </label>
          <select
            value={state}
            onChange={(e) => handleInputChange(e, "state")}
            className={`w-full border rounded px-4 py-3 text-sm appearance-none ${
              isEditable
                ? "text-black"
                : "text-gray-400 cursor-not-allowed bg-gray-100"
            }`}
            disabled={!isEditable}
          >
            <option value="">Select a state</option>
            {indianStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          {formErrors.state && (
            <p className="text-red-500 text-sm">{formErrors.state}</p>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Country*
          </label>
          <input
            type="text"
            placeholder="Country"
            value="INDIA"
            className={`w-full border rounded px-4 py-3 text-gray-400 text-sm
               cursor-not-allowed
            `}
            disabled
          />
          {formErrors.country && (
            <p className="text-red-500 text-sm">{formErrors.country}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Address Type*
        </label>
        <input
          type="text"
          placeholder="Address Type (e.g., Home, Office)"
          value={addressType}
          onChange={(e) => handleInputChange(e, "addressType")}
          className={`w-full border rounded px-4 py-3 text-sm ${
            isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEditable}
        />
        {formErrors.addressType && (
          <p className="text-red-500 text-sm">{formErrors.addressType}</p>
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


    </div>
  );
};

export default Dashboard_Address;
