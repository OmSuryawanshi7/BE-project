"use client";

import { useToast } from "@/components/ui/use-toast";
import api from "@/helper/api";
import formatDate from "@/helper/formatedDate";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { DataTable } from "./components/DataTable";
import { TravelLogColumns } from "./components/columns";

const TravelLogs = () => {
  const { toast } = useToast();
  const [rfid, setRfid] = useState<string>("");
  const fetchTravelLogs = async (url: string) => {
    try {
      const response = await api.get(url);
      setRfid(response.data.data.travelLogs.rfid);

      return response.data.data.travelLogs.entries;
    } catch (error) {
      toast({ title: "Something went wrong" });
      console.log(error);
    }
  };

  const { data, isLoading, error } = useSWR("/travel-logs", fetchTravelLogs);

  //   setInterval(() => {
  //     mutate("/travel-logs");
  //   }, 10000);

  return (
    <div className={`${data ? "" : "flex justify-center items-center h-full"}`}>
      {isLoading ? (
        <span className="font-bold text-xl">Loading...</span>
      ) : data ? (
        <div>
          <div className="md:p-14 p-4">
            <DataTable columns={TravelLogColumns} data={data} />
          </div>
        </div>
      ) : (
        <span className="font-bold text-xl">Travel logs are empty !!</span>
      )}
    </div>
  );
};

export default TravelLogs;
