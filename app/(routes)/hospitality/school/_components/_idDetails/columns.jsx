"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ModifyIdCardAllocationStatusButton } from "@/app/(routes)/hospitality/school/_components/buttonBar";

export const columns = (fetchAllParticipants) => [
  {
    accessorKey: "festId",
    header: "TechFusion ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "school",
    header: "School",
  },
  {
    accessorKey: "studentClass",
    header: "Class",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
  },
  {
    accessorKey: "parentPhoneNumber",
    header: "Parent Phone No.",
  },
  {
    accessorKey: "idCardAllocation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id Card Allocation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const student = row.original;
      return student?.idCardAllocation !== true ? (
        <ModifyIdCardAllocationStatusButton
          schoolStudentId={student?.value}
          isPaymentConfirmed={student?.paymentStatus}
          idCardAllocation={student?.idCardAllocation}
          registeredStudent={student}
          fetchAllParticipants={fetchAllParticipants}
        />
      ) : (
        <p className="text-purple-500">Id Allocated</p>
      );
    },
  },
];
