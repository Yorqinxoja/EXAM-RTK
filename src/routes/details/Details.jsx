import React, { useState } from "react";
import { useDetailsQuery } from "../../redux/api/userApi";
import { useParams } from "react-router-dom";
import { Typography, Row, Col, Button, Spin } from "antd";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const { Title, Text } = Typography;

const Details = () => {
  const { id } = useParams();
  const { data, isError } = useDetailsQuery(id);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleGoBack = () => {
    setIsButtonLoading(true);
    setTimeout(() => {
      window.history.back();
    }, 1000);
  };

  if (isError) {
    toast.error("Error fetching user details!");
    return <div>Error loading user details.</div>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {data && (
        <motion.div
          style={{
            width: "100%",
            background: "white",
            padding: "22px",
            borderRadius: "12px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            maxWidth: "800px",
          }}
        >
          <Row align="middle">
            <Col xs={24} md={12} style={{ textAlign: "center" }}>
              <motion.img
                src={data.data.avatar}
                alt={`${data.data.first_name} ${data.data.last_name}`}
                style={{
                  borderRadius: "50%",
                  width: "300px",
                  height: "300px",
                  border: "5px solid #1890ff",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Col>

            <Col xs={24} md={12}>
              <Title level={1} style={{ color: "#1890ff", fontWeight: "700" }}>
                {data.data.first_name} {data.data.last_name}
              </Title>
              <Text
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <FaEnvelope style={{ marginRight: "10px", color: "#1890ff" }} />
                {data.data.email}
              </Text>

              <Button
                type="primary"
                onClick={handleGoBack}
                icon={!isButtonLoading && <FaArrowLeft />}
                size="large"
                block
                style={{
                  backgroundColor: "#1890ff",
                  color: "white",
                  fontWeight: "bold",
                }}
                disabled={isButtonLoading}
              >
                {isButtonLoading ? <Spin size="small" /> : "Go Back"}
              </Button>
            </Col>
          </Row>
        </motion.div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Details;
