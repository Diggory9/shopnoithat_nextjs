import React, { ReactNode, useEffect, useState } from "react";
import { Form, Image, Modal, Upload, UploadFile, UploadProps } from "antd";

interface MUploadImageMultipleProps extends UploadProps {
    children?: ReactNode;
    initFileList?: any;
    formName?: (string | number)[];
}

const MUploadImageMultiple: React.FC<MUploadImageMultipleProps> = (props) => {
    const { initFileList, formName, ...rest } = props;
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        console.log(newFileList);

        setFileList(newFileList);
    };

    const getFile = (e: UploadProps) => {
        if (Array.isArray(e)) {
            return e;
        }
        console.log("nnnnn", e.fileList);

        const result = e?.fileList?.map((img) => {
            console.log("DASdas:,", img);

            return img?.response?.data?.[0]?.url
                ? { url: img?.response?.data?.[0]?.url }
                : { url: img?.thumbUrl, id: img.uid };
        });
        console.log(result);

        return result;
    };

    useEffect(() => {
        if (initFileList) {
            const newFileList: UploadFile[] = initFileList.map((item: any) => ({
                thumbUrl: item?.url,
                uid: item.id,
                name: item?.url,
            }));
            setFileList(newFileList);
        }
    }, [initFileList]);

    return (
        <>
            <Form.Item
                label="Hình ảnh"
                name={formName || "images"}
                getValueFromEvent={getFile}
                rules={[
                    // {
                    //     required: true,
                    //     message: "Image is required",
                    // },
                    {
                        validator(_, fileList) {
                            return new Promise((resolve, reject) => {
                                if (fileList && fileList.length > 10) {
                                    reject("Images is limit 10");
                                } else {
                                    resolve("Success");
                                }
                            });
                        },
                    },
                ]}
            >
                <Upload
                    name="file"
                    action={`${process.env.API_URL}UploadPhoto/upload`}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onRemove={() => {}}
                    multiple
                    accept="image/*"
                    {...rest}
                >
                    {fileList.length < 10 && "Upload"}
                </Upload>
            </Form.Item>
        </>
    );
};

export default MUploadImageMultiple;
