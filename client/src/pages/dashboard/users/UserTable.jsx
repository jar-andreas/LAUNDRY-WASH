import { adminUserColumn } from "@/utils/constants";
import TableBody from "@/components/TableBody";
import { useCallback } from "react";
import { Mail, Phone } from "lucide-react";

export default function UserTable({ presentUsers }) {
  const renderCell = useCallback((users, columnKey) => {
    const cellValue = users[columnKey];
    switch (columnKey) {
      case "fullname":
        return (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-(--servicebg) flex items-center justify-center">
              <span className="text-sm font-medium text-neutral-content">
                {users?.fullname
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>

            <p className="text-sm">{users.fullname}</p>
          </div>
        );
      case "email":
        return <p className="text-sm">{users?.email}</p>;
      case "phone":
        return <p className="text-sm">{users?.phone}</p>;
      case "action":
        return (
          <div className="flex items-center gap-3 text-sm">
            <div className="tooltip tooltip-left" data-tip={`email ${users?.fullname}`}>
              <Mail
                className="text-green-500 cursor-pointer"
                onClick={() => window.open(`mailto:${users?.email}`, "_blank")}
                size={20}
              />
            </div>
            <div className="tooltip tooltip-left tooltip-accent" data-tip={`phone ${users?.fullname}`}>
              <Phone
                className="text-blue-500"
                onClick={() => window.open(`tel:${users?.phone}`, "_blank")}
                title={`phone ${users?.fullname}`}
                size={20}
              />
            </div>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <TableBody
        tableColumns={adminUserColumn}
        tableData={presentUsers}
        renderCell={renderCell}
      />
    </>
  );
}
