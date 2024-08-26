"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import api from "@/helper/api";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const ProfilePage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const GET_PassengerDetails = async (url: string) => {
    try {
      const response = await api.get(url);
      if (response.data.success) {
        return response.data.data.passengerDetails;
      } else {
        toast({ title: "Please check your internet connection." });
      }
    } catch (error) {
      toast({ title: "Something went wrong." });
    }
  };

  const { data, error, isLoading } = useSWR(
    "/get-passengerDetails",
    GET_PassengerDetails
  );

  if (isLoading || !data) return null;

  return (
    <div className="h-full flex items-center  flex-col w-full">
      <div className=" gap-y-5 h-full w-[100vw] flex items-center flex-col  md:pt-10 pt-3 pb-8 overflow-y-auto">
        <div className="text-xl flex flex-col mb-6 md:flex-row justify-center items-center">
          <span className="font-bold">{data.name}&apos;s &nbsp;</span>
          <span>passenger card details</span>
        </div>
        <div className="grid place-items-center md:grid-cols-2 grid-cols-1 gap-y-3 gap-x-3 md:w-[70%] w-[100%] ">
          <div>
            <Label>RFID Card Id</Label>
            <Input value={data?.rfid_no} />
          </div>
          <div>
            <Label>Your good name</Label>
            <Input value={data?.name} />
          </div>
          <div>
            <Label>Card balance ₹</Label>
            <Input value={`${data?.balance} ₹`} disabled />
          </div>
          <div>
            <Label>Email Id</Label>
            <Input value={data?.email_id} />
          </div>
          <div>
            <Label>Mobile Number</Label>
            <Input value={data?.mobile_number} />
          </div>
          <div>
            <Label>Aadhar number</Label>
            <Input value={data?.aadhaar_no} />
          </div>
        </div>
        <div className=" w-[50%] mt-6 flex md:flex-row flex-col gap-y-4 justify-around">
          <Button
            className="lg:w-[20%]"
            onClick={() => {
              router.push(`/${data?._id}/payment`);
            }}
          >
            Recharge Card
          </Button>
          <Button
            className="lg:w-[20%]"
            onClick={() => {
              router.push(`/${data?._id}/travel-logs`);
            }}
          >
            Travel logs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
