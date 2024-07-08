"use client";
import ApiRole from "@/api/role/role-api";
import ApiUser from "@/api/user/user-api";
import { MRole } from "@/models/role";
import { MUser } from "@/models/user";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Spin, Select, Form, notification, Input, Tag } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
interface UserDetailProps {
    params: {
        id: string;
    };
}

export default function UserDetail({ params }: UserDetailProps) {
    const [user, setUser] = useState<MUser | null>(null);
    const [dataRoles, setDataRoles] = useState<MRole[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                ApiRole.getAllRole()
                    .then((res) => {
                        setDataRoles(res.data);
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };
        fetchRoles();
    }, []);
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await ApiUser.getUserById(params.id);
                setUser(response);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetails();
    }, [params.id]);
    const handleUpdateRoles = async () => {
        if (!user) return;
        try {
            await ApiUser.updateUserRoles(
                params.id,
                form.getFieldValue("roles")
            );
            // const updatedUser = { ...user, roles: form.getFieldValue("roles") };
            // setUser(updatedUser);
        } catch (error) {
            console.error("Error updating roles:", error);
        }
    };

    return (
        <div className="bg-gray-50 max-w-screen-xl p-6 mx-auto">
            <Toaster position="top-right" richColors></Toaster>
            <div className="bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items mb-6">
                    <Link href="/admin/user">
                        <Button type="default" className="mr-2">
                            <ArrowLeftOutlined />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Chi tiết người dùng</h1>
                </div>
                <div className="mb-6">
                    <label>
                        ID <Input disabled value={user?.id}></Input>
                    </label>
                    <label>
                        UserName <Input disabled value={user?.userName}></Input>
                    </label>
                    <label>
                        Email <Input disabled value={user?.email}></Input>
                    </label>
                    <label>
                        Phone <Input disabled value={user?.phone}></Input>
                    </label>
                    <label>
                        Address <Input disabled value={user?.address}></Input>
                    </label>

                    <p className="text-xl">
                        Roles:{" "}
                        {user?.roles?.map((role, index) => (
                            <Tag key={index}>{role}</Tag>
                        ))}
                    </p>
                </div>
                <Form
                    layout="vertical"
                    onFinish={handleUpdateRoles}
                    form={form}
                >
                    <Form.Item label="Roles" name="roles">
                        <Select
                            placeholder="Select roles"
                            style={{ width: "100%" }}
                            options={dataRoles.map((item) => ({
                                value: item.name,
                                label: item.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update Roles
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
