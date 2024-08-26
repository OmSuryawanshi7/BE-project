"use client";

import formatDate from "@/helper/formatedDate";
import { ColumnDef } from "@tanstack/react-table";

export type PassengerLogProps = {
  passengerID: string;
  rfidCard: string;
  inTime: string;
  inPlace: string;
  outTime?: string;
  outPlace?: string;
  ticketPrice?: number;
  passengerDetails: {
    rfid_no: string;
    name: string;
    mobile_number: string;
    email_id: string;
    aadhaar_no: string;
    age: number;
    balance: number;
  };
};

export const passengerLogColumns: ColumnDef<PassengerLogProps>[] = [
  {
    id: "index",
    header: "Sr no.",
    cell: ({ row }) => {
      return (
        <div>
          {" "}
          <span> {row.index + 1}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "rfidCard",
    header: "Rfid no.",
  },
  {
    accessorKey: "passengerDetails.name",
    header: "Passenger name",
  },
  {
    accessorKey: "passengerDetails.aadhaar_no",
    header: "Aadhaar no.",
  },
  {
    accessorKey: "passengerDetails.balance",
    header: "balance",
    cell: ({ row }) => {
      return <span>{row.original.passengerDetails.balance} ₹</span>;
    },
  },
  {
    accessorKey: "inPlace",
    header: "In Place",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-green-600 font-bold">
            {" "}
            {row.original.inPlace}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "inTime",
    header: "In Time",
    cell: ({ row }) => {
      return (
        <div>
          <span> {formatDate(row.original.inTime)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "outPlace",
    header: "Out Place",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-red-600 font-bold">
            {" "}
            {row.original.outPlace}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "outTime",
    header: "Out Time",
    cell: ({ row }) => {
      return (
        <div>
          <span>
            {" "}
            {row.original.outTime ? formatDate(row.original.outTime) : null}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "ticketPrice",
    header: "Ticket price",
    cell: ({ row }) => {
      return (
        <span className="text-red-500 font-bold">
          {" "}
          {row.original.ticketPrice ? `${row.original.ticketPrice} ₹` : null}
        </span>
      );
    },
  },
];
