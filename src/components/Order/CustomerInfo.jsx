import { Mail, Phone, User } from "lucide-react";

const CustomerInfo = ({ userData }) => {
  return (
    <div className="rounded-md bg-white p-4 shadow">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Customer Info
      </h2>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2">
          <User size={18} className="text-gray-500" />{" "}
          <span>{userData.name}</span>
        </li>
        <li className="flex items-center space-x-2">
          <Mail size={18} className="text-gray-500" />{" "}
          <span>{userData.email}</span>
        </li>
        <li className="flex items-center space-x-2">
          <Phone size={18} className="text-gray-500" />{" "}
          <span>{userData.contact}</span>
        </li>
      </ul>
    </div>
  );
};
export default CustomerInfo;
