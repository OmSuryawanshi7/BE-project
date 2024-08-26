"use client";

import { ColumnDef } from "@tanstack/react-table";
import formatDate from "@/helper/formatedDate";
import { MoreHorizontal, Ticket, TicketCheck, TicketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type TravelLogColumns = {
  place: string;
  entryAt: string;
  status: "in" | "out" | "scanned" | "test";
  ticketPrice?: number;
  balance?: number;
};

export const TravelLogColumns: ColumnDef<TravelLogColumns>[] = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let status = row.original.status;
      return (
        <div>
          <span
            className={`${
              status == "in"
                ? "text-green-600"
                : status == "out"
                ? "text-red-600"
                : "text-blue-600"
            } font-bold`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "place",
    header: "Place",
    cell: ({ row }) => {
      let status = row.original.status;
      return (
        <div>
          <span
            className={`${
              status == "in"
                ? "text-green-600"
                : status == "out"
                ? "text-red-600"
                : "text-blue-600"
            } font-bold`}
          >
            {row.original.place}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "entryAt",
    header: "Entry Time",
    cell: ({ row }) => {
      return (
        <div>
          <span>{formatDate(row.original.entryAt)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "ticketPrice",
    header: "Ticket Price",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.ticketPrice ? (
            <span className="text-orange-600 font-bold">
              {row.original.ticketPrice} ₹
            </span>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.balance ? (
            <span
              className={`${
                row.original.balance < 50 ? "text-red-500" : ""
              } font-bold`}
            >
              {row.original.balance} ₹
            </span>
          ) : null}
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const ticketDetails = row.original;

  //     return (
  //       <>
  //         {ticketDetails.status == "out" ? (
  //           <DropdownMenu>
  //             <DropdownMenuTrigger asChild>
  //               <Button variant="ghost" className="h-8 w-8 p-0">
  //                 <span className="sr-only">Open menu</span>
  //                 <MoreHorizontal className="h-4 w-4" />
  //               </Button>
  //             </DropdownMenuTrigger>
  //             <DropdownMenuContent align="end">
  //               <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //               <DropdownMenuSeparator />
  //               <DropdownMenuItem>
  //                 <TicketIcon className="mr-2 w-5 translate-y-[0.04rem] h-5" />{" "}
  //                 View ticket details
  //               </DropdownMenuItem>
  //             </DropdownMenuContent>
  //           </DropdownMenu>
  //         ) : null}
  //       </>
  //     );
  //   },
  // },
];
