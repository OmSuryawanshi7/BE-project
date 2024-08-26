"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import api from "@/helper/api";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState } from "react";

const CardPayment = () => {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    const fullurl = window.location.href;
    const baseUrl = fullurl.split("/").slice(0, 3).join("/");
    try {
      const response: any = await api.post("/payment", {
        amount: amount,
        baseUrl: baseUrl,
      });
      if (response?.data?.success) {
        const paymentPortalURL =
          response?.data?.data?.instrumentResponse?.redirectInfo.url;
        router.push(paymentPortalURL);
      }
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center h-[100vh] gap-y-4">
      <div>
        {" "}
        <Label className="text-xl font-bold">Recharge amount</Label>
      </div>
      <Input
        type="number"
        placeholder="Amount in rupees"
        className="md:w-[20%] w-[80%] "
        value={amount}
        onKeyDown={(e) => {
          if (e.key == "Enter") handlePayment();
        }}
        onChange={(e: any) => {
          setAmount(e.target.value);
        }}
      />

      <Button
        onClick={handlePayment}
        disabled={isLoading || amount.length == 0}
        className="bg-purple-800  hover:bg-purple-700"
      >
        {amount.length == 0
          ? "Enter amount"
          : isLoading
          ? "Processing..."
          : "Make Payment"}
      </Button>
    </div>
  );
};

export default CardPayment;
