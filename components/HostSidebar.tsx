"use client";
import type { MenuProps } from "antd";
import { Dropdown } from 'antd';
import { CustomMenu as Menu } from "@/lib/AntDesignComponents";
import HomeIconsm from "@/assets/icons/HomeIconsm";
import MessageIcon from "@/assets/icons/MessageIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import UserIcon from "@/assets/icons/UserIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import HelpIcon from "@/assets/icons/HelpIcon";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.svg";

import { usePathname } from "next/navigation";

import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useGetHostProfileQuery } from "@/redux/api/hostApi";
import { Spinner } from "./spinner/Spinner";
import sideImg from "@/assets/sidebar.svg"

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const Title = () => <Image className="mxauto py-[0.5rem]" alt="" src={Logo} />;

const HostSidebar = () => {
  const { push } = useRouter();
  const { data, isSuccess, isLoading, isError, error } = useGetHostProfileQuery(
    {}
  );
  const [profile, setProfile] = useState<Record<string, any>>();
  const [active, setActive] = useState("");
  const path = usePathname();

  useEffect(() => {
    if (isSuccess) {
      setProfile(data);
    }
  }, [data, isSuccess]);
  const menuItems: MenuProps["items"] = useMemo(
    () => [
      getItem(
        <Link href="/host">Dashboard</Link>,
        "/host",
        <HomeIconsm
          className={`${
            path === "/host" ? "stroke-colorPrimary" : "stroke-[#7C8493]"
          } h-[18px]`}
        />
      ),
      getItem(
        <Link href="/host/message">Messages</Link>,
        "/host/message",
        <MessageIcon
          className={`${
            path.includes("message")
              ? "stroke-colorPrimary"
              : "stroke-[#7C8493]"
          } h-[18px]`}
        />
      ),
      getItem(
        <Link href="/host/house-listing">Find Property</Link>,
        "/host/house-listing",
        <SearchIcon
          className={`${
            path.includes("house-listing")
              ? "stroke-colorPrimary"
              : "stroke-[#7C8493]"
          } h-[18px]`}
        />
      ),
      getItem(
        <Link href="/host/pricing">Pricing</Link>,
        "/host/pricing",
        <SearchIcon
          className={`${
            path.includes("pricing")
              ? "stroke-colorPrimary"
              : "stroke-[#7C8493]"
          } h-[18px]`}
        />
      ),
      getItem(
        <Link href="/host/profile">My Public Profile</Link>,
        "/dashboard/profile/host",
        <UserIcon
          className={`${
            path.includes("profile/host")
              ? "stroke-colorPrimary"
              : "stroke-[#7C8493]"
          } h-[18px]`}
        />
      ),
      { type: "divider" },
      getItem(
        <Link href="/host/settings">Settings</Link>,
        "/host/settings",
        <SettingsIcon
          className={`${
            path.includes("settings")
              ? "stroke-colorPrimary"
              : "stroke-[#7C8493]"
          } h-[18px]`}
        />
      ),
      getItem(
        <Link href="/dashboard/help-center">Help Center</Link>,
        "/dashboard/help-center",
        <HelpIcon
          className={`${
            path.includes("help-center")
              ? "stroke-colorPrimary"
              : "stroke-[#7C8493]"
          } h-[18px]`}
        />
      ),
    ],
    [path]
  );

  const items: MenuProps['items'] = [
    {
      label: (
        <span
          className=" cursor-pointer p-3 bg-[#e20000] text-[#fff] flex justify-center gap-3 items-center "
          onClick={() => {
            push("/");
            window.sessionStorage.removeItem("authToken");
          }}
        >
          {" "}
          <MdLogout /> Log out
        </span>
      ),
      key: '0',
    },

  ];
  useEffect(() => {
    const rel = path.split("/");
    setActive(() => {
      if (rel[2]) return "/" + rel[1] + "/" + rel[2];
      else return "/" + rel[1];
    });
  }, [path]);
  const onClick: MenuProps["onClick"] = (e) => {
    setActive(e.key);
  };

  return (
    <div className="flex flex-col relative  border-solid border-r-[1px] border-[#D6DDEB] bg-[#F8F8FD] max-h-[100svh] overflow-y-hidden"
   
    >
      <div className=" !absolute !bottom-0 !h-[350px] !w-full">
      <Image
      alt=""
      src={sideImg}
      fill
      className=" "
      />
      </div>
      <Title />
      <Menu
        onClick={onClick}
        defaultSelectedKeys={[active]}
        selectedKeys={[active]}
        items={menuItems}
      />
      {/* <span>Logout</span> */}
      <div className="flex flex-col gap-[1rem] ">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className=" absolute bottom-0 w-full">
            <Dropdown menu={{ items }} trigger={['click']} >
            <div className="flex gap-5 ml-[1rem] items-center p-2 mb-5 hover:cursor-pointer">
              <Image
                alt="user"
                src={
                  profile?.image === null
                    ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    : profile?.image
                }
                width={40}
                height={40}
                className="h-[40px] rounded-full w-[40px]"
              />
              <div className="md:flex flex-col">
                <h4 className="text-[#202430] text-[18px] font-[600]">
                  {profile?.name}
                </h4>
                <p className="text-[#202430]/[50%] text-[14px] font-[600]">
                      {profile?.email}
                    </p>
              </div>
            </div>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostSidebar;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

function SET_USER_NAME(payload: any): any {
  throw new Error("Function not implemented.");
}

