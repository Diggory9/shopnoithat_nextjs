"use client";
import ApiBanner from "@/api/banner/banner-api";
import { GroupBannerModel } from "@/models/bannermodel";
import { Button, Switch, Table, TableColumnsType, Tag } from "antd";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { formatDateToRender } from "@/utils/config";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/redux/hooks";

export default function Banner() {
    const [dataGroupBanners, setDataGroupBanners] = useState<
        GroupBannerModel[]
    >([]);
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    useEffect(() => {
        ApiBanner.getGroupBanners(token)
            .then((res) => {
                setDataGroupBanners(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    // console.log(dataGroupBanner);
    const getStatus = (isEnable: boolean) => {
        if (isEnable) {
            return <Tag color="success">Hoạt động</Tag>;
        } else {
            return <Tag color="error">Tạm dừng</Tag>;
        }
    };

    const handleUpdateStatus = (id: string) => {
        ApiBanner.updateGroupBanner(id, token)
            .then((res) => {
                if (res?.ok) {
                    toast.success("Cập nhật thành công");
                    setDataGroupBanners((prevData) =>
                        prevData.map((groupBanner) =>
                            groupBanner.id === id
                                ? {
                                      ...groupBanner,
                                      isEnable: !groupBanner.isEnable,
                                  }
                                : groupBanner
                        )
                    );
                } else {
                    toast.error("Thất bại");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const columns: TableColumnsType<GroupBannerModel> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Nhóm",
            dataIndex: "groupName",
            key: "groupName",
        },
        {
            title: "Ngày tạo",
            dataIndex: "dateCreate",
            key: "dateCreate",
        },

        {
            title: "Trạng thái",
            dataIndex: "isEnable",
            key: "isEnable",
            render: (isEnable: boolean) => getStatus(isEnable),
        },
        {
            title: "Enable",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <Switch
                    onChange={() => handleUpdateStatus(record.id || "")}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked={record.isEnable}
                />
            ),
        },
        {
            title: "Chi tiết",
            key: "action",
            render: (_: any, record: { key: string }) => (
                <Link href={`/admin/banner/detail/${record.key}`}>
                    <Button type="link">Chi tiết</Button>
                </Link>
            ),
        },
    ] as TableColumnsType<GroupBannerModel>;

    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3 mb-4 shadow-xl ">
                <h1 className="p-3 text-2xl font-bold">Quản lý nhóm banner</h1>
                <Toaster position="top-right" richColors />
                <div className="flex justify-between ">
                    <div className="p-2"></div>
                    <div className="order-last content-center"></div>
                </div>
            </div>
            <div className="bg-white mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                    <Table
                        columns={columns}
                        dataSource={
                            dataGroupBanners?.map((item, index) => ({
                                ...item,
                                key: item.id || index,
                                index: index + 1,
                                dateCreate: formatDateToRender(item.dateCreate),
                            })) || []
                        }
                    ></Table>
                </div>
            </div>
        </div>
    );
}
