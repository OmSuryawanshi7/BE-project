"use client";

import api from "@/helper/api";
import useSWR from "swr";
import { PassengerLogsDataTable } from "./components/PassengerLogs-data-table";
import { passengerLogColumns } from "./components/PassengerLogs-columns";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const PassengerLogs = () => {
  const { conductorId, source, destination } = useParams();
  const [passengerLogs, setPassengerLogs] = useState([]);
  const [fiteredLogs, setFilteredLogs] = useState([]);
  const [selectedButton, setSelectedButton] = useState<"in" | "out" | "all">(
    "all"
  );
  const router = useRouter();

  const GET_PassengersInBus = async (url: string) => {
    const res = await api.get(url);
    const passengersInBus = res.data.data.passengersInBus;
    setFilteredLogs(passengersInBus);
    setPassengerLogs(passengersInBus);
    return passengersInBus;
  };
  const { data, isLoading, error } = useSWR(
    `/passenger-logs`,
    GET_PassengersInBus
  );

  return (
    <div>
      <div className="p-6 space-x-2 space-y-2 md:flex md:justify-around">
        <Button
          onClick={() => {
            router.push(`/${conductorId}/${source}/to/${destination}`);
          }}
        >
          Continue Journey
        </Button>
        <Button
          variant={selectedButton == "all" ? "outline" : "default"}
          onClick={() => {
            setFilteredLogs(passengerLogs);
            setSelectedButton("all");
          }}
          disabled={passengerLogs.length == 0}
        >
          All Passengers
        </Button>
        <Button
          variant={selectedButton == "in" ? "outline" : "default"}
          disabled={passengerLogs.length == 0}
          onClick={() => {
            const inpassengers = passengerLogs.filter(
              (pass: any) => pass.outTime === undefined
            );
            setFilteredLogs(inpassengers);
            setSelectedButton("in");
          }}
        >
          In Passengers
        </Button>
        <Button
          variant={selectedButton == "out" ? "outline" : "default"}
          disabled={passengerLogs.length == 0}
          onClick={() => {
            const outpassengers = passengerLogs.filter(
              (pass: any) => pass.outTime !== undefined
            );
            setFilteredLogs(outpassengers);
            setSelectedButton("out");
          }}
        >
          Out Passengers
        </Button>
      </div>
      <div className="p-6">
        <PassengerLogsDataTable
          data={data ? fiteredLogs : []}
          columns={passengerLogColumns}
        />
      </div>
    </div>
  );
};

export default PassengerLogs;
