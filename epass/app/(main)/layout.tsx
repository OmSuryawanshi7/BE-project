import Header from "@/components/Header";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full h-[100vh]">
      <div className="h-[8vh]">
        {" "}
        <Header />
      </div>
      <hr className="h-[0.3vh] bg-gray-200" />
      <div className="h-[91.7vh] w-full  overflow-y-auto">{children}</div>
    </main>
  );
};

export default MainLayout;
