import React, { useState } from "react";
import { useUserCreateMutation } from "../../redux/api/userApi";
import { Input, Button, Typography, notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;

const Dashboard = () => {
  const [userCreate] = useUserCreateMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userCreate({ name, email, profession }).unwrap();
      notification.success({ message: "User created successfully" });
      toast.success("User created successfully");
      setTimeout(() => {
        setName("");
        setEmail("");
        setProfession("");
        setLoading(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      notification.error({ message: "Error creating user" });
      toast.error("Error creating user");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "24px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Title level={2} style={{ color: "#1890ff", fontWeight: "700" }}>
          Create User
        </Title>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            size="large"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              marginBottom: "16px",
              borderRadius: "6px",
              backgroundColor: "#f9f9f9",
            }}
            required
          />
          <Input
            placeholder="Email"
            size="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginBottom: "16px",
              borderRadius: "6px",
              backgroundColor: "#f9f9f9",
            }}
            required
          />
          <Input
            placeholder="Profession"
            size="large"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            style={{
              marginBottom: "16px",
              borderRadius: "6px",
              backgroundColor: "#f9f9f9",
            }}
            required
          />
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            style={{
              backgroundColor: "#1890ff",
              color: "white",
              fontWeight: "bold",
              borderRadius: "6px",
            }}
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : "Create"}
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
