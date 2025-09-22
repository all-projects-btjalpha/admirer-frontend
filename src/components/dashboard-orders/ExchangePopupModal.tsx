import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { exchange, exchangeStatus } from "../api/api-end-points";
import axios from "axios";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

const { TextArea } = Input;

interface ExchangePopupModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (comment: string, images: File[]) => void;
  productId: string;
  orderId: string | undefined;
  onSuccess: () => void;
}

const ExchangePopupModal: React.FC<ExchangePopupModalProps> = ({
  visible,
  onClose,
  onSubmit,
  productId,
  orderId,
  onSuccess,
}) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [additionalComment, setAdditionalComment] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const res = await axios.post(exchangeStatus, {
          orderid: orderId,
          productid: productId,
        });

        setStatus(res.data.status);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      fetchStatus();
    }
  }, [visible, orderId, productId]);

  const handleSubmit = async () => {
    const images = fileList.map((file) => file.originFileObj);

    if (!selectedReason) {
      message.error("Please select a reason for exchange.");
      return;
    }

    if (images.length === 0) {
      message.error("Please upload at least one photo.");
      return;
    }

    const formData = new FormData();
    formData.append("reason", selectedReason)
    formData.append(
      "comment",
      `${additionalComment ? `${additionalComment}` : ""}`
    );
    formData.append("orderid", orderId ?? "");
    formData.append("productid", productId);

    images.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      const response = await axios.post(exchange, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      });

      // console.log(status)
      // console.log(fileList)
      // console.log(additionalComment)
      // console.log(selectedReason)
      setSelectedReason("");
      setAdditionalComment("");
      setFileList([]);
      toast.success("Exchange request submitted successfully.");
      onSuccess();
      onClose();

    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!visible || status === null) {
    return null; // prevent initial flash
  }

  return (
    <Modal
      title="Exchange Request"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      {loading ? (
        <div className="flex justify-center">
          <Loader className="text-[#7b48a5]" />
        </div>
      ) : status === 1 ? (
        <div>
          Your request has already been submitted. Please wait for confirmation.
        </div>
      ) : status === 2 ? (
        <div>Your request has been rejected.</div>
      ) : status === 3 ? (
        <div>Your request has been approved.</div>
      ) : (
        <div className="!space-y-4 mt-3 mb-1">
          <div className="space-y-2">
            <label className="font-medium text-sm">
              Select reason for exchange:
            </label>
            <Radio.Group
              onChange={(e) => setSelectedReason(e.target.value)}
              value={selectedReason}
              className="flex flex-col gap-2"
            >
              {/* <Radio value="Received wrong size">Received wrong size</Radio>
              <Radio value="Design looks different than shown online">
                Design looks different than shown online
              </Radio> */}
              <Radio value="Ring is damaged or defective">
                Ring is damaged or defective
              </Radio>
              <Radio value="Quality not as expected">
                Quality not as expected
              </Radio>
              {/* <Radio value="Want to exchange for a different design">
                Want to exchange for a different design
              </Radio> */}
            </Radio.Group>
          </div>

          {selectedReason && (
            <TextArea
              rows={4}
              placeholder="Add more details (optional)..."
              className="!mb-3 hover:!border-[#7b48a5]"
              value={additionalComment}
              onChange={(e) => setAdditionalComment(e.target.value)}
            />
          )}

          <Upload
            multiple
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            accept=".jpg,.jpeg,.png"
          >
            <Button
              className="hover:!border-[#7b48a5] mt-3 hover:!text-[#7b48a5]"
              icon={<UploadOutlined />}
            >
              Upload Photos
            </Button>
          </Upload>

          <Button
            className="bg-[#7b48a5] text-white py-5 hover:!border-purple-800 hover:!text-white hover:!bg-purple-800"
            block
            onClick={handleSubmit}
            disabled={!selectedReason}
          >
            Submit Request
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ExchangePopupModal;
