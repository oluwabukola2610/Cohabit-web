"use client";
import Property from "@/components/property/Property";
import Header from "@/components/header/Header";
import BackIcon from "@/assets/icons/BackIcon";
import Registry from "../../registry";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <Registry>
      <div className="grid grid-cols-1 grid-rows-[10%_90%] max-h-screen overflow-y-scroll">
        <Header>
          <div className="flex items-center gap-[0.5rem]">
            <BackIcon
              onClick={() => {
                router.back();
              }}
              className="w-[40px] h-[40px] font-[400] text-[15px] cursor-pointer"
            />
            <h4 className="text-[#25324B] text-[18px] md:text-[25px] font-[700]">
              Find Property
            </h4>
          </div>
        </Header>
        <Property />
      </div>
    </Registry>
  );
};

export default Page;
