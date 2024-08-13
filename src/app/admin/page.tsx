"use client";
import ApiReport from "@/api/report/report-api";
import { useAppSelector } from "@/redux/hooks";
import { customMoney, formatDateSummary } from "@/utils/config";
import {
    DollarOutlined,
    ShoppingCartOutlined,
    AppstoreOutlined,
    SkinOutlined,
} from "@ant-design/icons";
import { Card, Col, DatePicker, Row, Statistic } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import ExportExcel from "../../components/exportExcel";
import { useRouter } from "next/navigation";
const { RangePicker } = DatePicker;
export default function admin() {
    const router = useRouter();
    const [chartData, setChartData] = useState<any[]>([]);
    const [dateRange, setDateRange] = useState<[string, string]>([
        "2024-07-20",
        "2024-07-30",
    ]);
    const [dataSummary, setDataSummary] = useState<any>([]);
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    const fetchData = async (startDate: string, endDate: string) => {
        try {
            const res = await ApiReport.getSummary(startDate, endDate, token);
            setDataSummary(res.data);
            const transformedData = res.data.dailyOrderSummaries.map(
                (item: any) => ({
                    name: formatDateSummary(item.date),
                    revenue: item.totalRevenue,
                    orders: item.totalOrder,
                })
            );
            setChartData(transformedData);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };
    useEffect(() => {
        if (!auth?.isLogin) {
            router.push("/login");
        } else {
            fetchData(dateRange[0], dateRange[1]);
        }
    }, [auth, dateRange, router]);

    const handleDateChange = (dates: any, dateStrings: [string, string]) => {
        setDateRange(dateStrings);
    };
    return auth?.isLogin ? (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tổng doanh thu"
                            value={customMoney(dataSummary.totalRevenue)}
                            precision={2}
                            valueStyle={{ color: "#3f8600" }}
                            prefix={<DollarOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tổng đơn hàng"
                            value={dataSummary.totalOrder}
                            valueStyle={{ color: "#3f8600" }}
                            prefix={<ShoppingCartOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tổng sản phẩm đã bán"
                            value={dataSummary.totalProductSold}
                            valueStyle={{ color: "#3f8600" }}
                            prefix={<SkinOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            {"Thống kê từ  "}{" "}
            <Row gutter={26}>
                <div className="flex">
                    <div className="">
                        {" "}
                        <Col span={24}>
                            <RangePicker
                                onChange={handleDateChange}
                                defaultValue={[
                                    dayjs(dateRange[0]),
                                    dayjs(dateRange[1]),
                                ]}
                            />
                        </Col>
                    </div>
                    <div className="">
                        {" "}
                        <Col span={24}>
                            {" "}
                            <ExportExcel data={dataSummary} />
                        </Col>
                    </div>
                </div>
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={24}>
                    <Card title="Doanh thu và đơn hàng">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="orders"
                                    stroke="#82ca9d"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    ) : null;
}
