"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import api from "@/helper/api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const MerchantTransactionId = () => {
  const { merchantTransactionId } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const [status, setStatus] = useState<"success" | "failed" | "">("");

  const CheckPaymentStatus = async (url: string) => {
    try {
      const resposne = await api.get(url);

      if (resposne.data.success) {
        setStatus("success");
      }
    } catch (error) {
      setStatus("failed");
      toast({ title: "Something went wrong." });
    }
  };

  const { data, error, isLoading } = useSWR(
    `/payment/validate/${merchantTransactionId}`,
    CheckPaymentStatus
  );

  return (
    <div className="flex h-[100vh] justify-center items-center flex-col gap-y-6">
      {isLoading ? "Processing payment status..." : null}

      <div>
        {status == "success" ? (
          <Button className="bg-green-600">
            {" "}
            Payment Done Successfully ✅{" "}
          </Button>
        ) : status == "" ? null : (
          <Button className="bg-red-400"> Payment Failed ❌</Button>
        )}
      </div>
      {!isLoading ? (
        <div>
          <Button
            onClick={() => {
              router.push("/");
            }}
          >
            Go Back
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default MerchantTransactionId;
