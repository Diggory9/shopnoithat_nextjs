"use client";
import ApiBanner from "@/api/banner/banner-api";
import { DetailGroupBannerModel } from "@/models/bannermodel";
import { Button, Modal, Switch, Table, TableColumnsType, Tag } from "antd";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import {
    ArrowLeftOutlined,
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    ExclamationCircleFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
const { confirm } = Modal;

export default function DetailBanner({ params }: { params: { id: string } }) {
    const [dataGroupBanner, setDataGroupBanner] = useState<any>();
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    useEffect(() => {
        fetchData();
    }, [params.id]);

    const fetchData = () => {
        ApiBanner.getDetailGroupBanner(params.id, token)
            .then((res) => {
                setDataGroupBanner(res.data.banners);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getStatus = (isEnable: boolean) => {
        return isEnable ? (
            <Tag color="success">Hoạt động</Tag>
        ) : (
            <Tag color="error">Tạm dừng</Tag>
        );
    };
    const showDeleteConfirm = (id: string) => {
        confirm({
            title: "Bạn muốn xóa banner này?",
            icon: <ExclamationCircleFilled style={{ color: "red" }} />,
            okText: "Có",
            okType: "danger",
            cancelText: "Không",
            onOk: () => {
                ApiBanner.deleteBanner(id, token)
                    .then((res) => {
                        if (res?.ok) {
                            toast.success("Xóa thành công");
                            fetchData();
                        } else {
                            toast.error("Xóa thất bại");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };
    const handleUpdateStatus = (id: string) => {
        ApiBanner.updateBanner(id, token)
            .then((res) => {
                if (res?.ok) {
                    toast.success("Cập nhật thành công");
                    fetchData();
                } else {
                    toast.error("Thất bại");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const columns: TableColumnsType<DetailGroupBannerModel> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Hình ảnh",
            dataIndex: "url",
            key: "url",
            render: (image) => (
                <Image src={image} alt="Product Image" width={60} height={60} />
            ),
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
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Button
                    onClick={() => showDeleteConfirm(record.id || "")}
                    type="link"
                    className="text-xl"
                    danger
                >
                    <DeleteOutlined />
                </Button>
            ),
        },
    ] as TableColumnsType<DetailGroupBannerModel>;

    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3 mb-4 shadow-xl ">
                <Link href="/admin/banner">
                    <Button type="default" className="mr-2">
                        <ArrowLeftOutlined />
                    </Button>
                </Link>
                <h1 className="p-3 text-2xl font-bold">Chi tiết</h1>
                <Toaster position="top-right" richColors />
                <div className="flex justify-between ">
                    <div className="p-2"></div>
                    <div className="order-last content-center">
                        <Link href="/admin/banner/add">
                            <button
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex "
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                Add banner
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-white mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                    <Table
                        columns={columns}
                        dataSource={
                            dataGroupBanner?.map((item: any, index: any) => ({
                                ...item,
                                key: item.id || index,
                                index: index + 1,
                            })) || []
                        }
                    ></Table>
                </div>
            </div>
        </div>
    );
}
