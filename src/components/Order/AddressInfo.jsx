"use client";
import { formatAddress } from "@/utils/formatAddress";
import { Home, Phone, User } from "lucide-react";

const AddressInfo = ({ title, addressData }) => {
  return (
    <div className="rounded-md bg-white p-4 shadow">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">{title}</h2>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2">
          <User size={18} className="mt-1 text-gray-500" />{" "}
          <span className="w-full whitespace-pre-line">
            {addressData?.name}
          </span>
        </li>
        <li className="flex items-center space-x-2">
          <Phone size={18} className="mt-1 text-gray-500" />{" "}
          <span className="w-full whitespace-pre-line">
            {addressData?.contact}
          </span>
        </li>
        <li className="flex items-start space-x-2">
          <Home size={18} className="mt-1 text-gray-500" />{" "}
          <address className="w-full whitespace-pre-line not-italic">
            {formatAddress({
              ...addressData?.address,
              addressline1: addressData?.address?.addressLine1,
              addressline2: addressData?.address?.addressLine2,
              landmark: addressData?.address?.landmark,
              city: addressData?.address?.city,
              state: addressData?.address?.state,
              country: addressData?.address?.country,
              pin: addressData?.address?.pin,
            })}
            {/* {JSON.stringify(addressData?.address, null, 2)} */}
          </address>
        </li>
      </ul>
    </div>
  );
};

export default AddressInfo;
