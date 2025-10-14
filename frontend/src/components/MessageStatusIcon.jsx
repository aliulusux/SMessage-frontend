import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

export default function MessageStatusIcon({ status }) {
  switch(status) {
    case "sent": return <BsCheck className="text-gray-400" />;
    case "delivered": return <BsCheckAll className="text-gray-400" />;
    case "read": return <BsCheckAll className="text-blue-500" />;
    default: return null;
  }
}
