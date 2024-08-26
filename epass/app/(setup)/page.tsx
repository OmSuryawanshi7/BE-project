import api from "@/helper/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = cookies().get("ecopass_passenger_token");

  if (token) {
    const resposne = await api.get("/get-passengerDetails", {
      headers: {
        Cookie: `ecopass_passenger_token = ${token?.value}`,
      },
    });
    if (resposne.data.success) {
      const data = resposne.data.data;
      redirect(`/${data.passengerDetails._id}/profile`);
    } else {
      redirect("/login");
    }
  } else {
    redirect("/login");
  }
  return (
    <main className="w-full h-[100vh]">
      <div>Ecopass Passengers Portal Loading...</div>
    </main>
  );
}
