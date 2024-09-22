import React, { useState, useEffect } from "react";
import { useUserQuery, useUserDeleteMutation } from "../../redux/api/userApi";
import { ToastContainer, toast } from "react-toastify";
import {
  LikeOutlined,
  DislikeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Card, Row, Col, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./User.css";

const { Meta } = Card;

const User = () => {
  const navigate = useNavigate();
  const { data } = useUserQuery();
  const [likes, setLikes] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userDelete] = useUserDeleteMutation();
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    setLikes(savedLikes);
  }, []);

  const updateLocalStorage = (newLikes) => {
    localStorage.setItem("likes", JSON.stringify(newLikes));
  };

  const handleLike = (userId) => {
    const newLikes = {
      ...likes,
      [userId]: (likes[userId] || 0) + 1,
    };
    setLikes(newLikes);
    updateLocalStorage(newLikes);
    toast.success("Liked this user!");
  };

  const handleUnlike = (userId) => {
    const newLikes = {
      ...likes,
      [userId]: Math.max((likes[userId] || 0) - 1, 0),
    };
    setLikes(newLikes);
    updateLocalStorage(newLikes);
    toast.error("Unliked this user!");
  };

  const handleDelete = () => {
    setDeletingUserId(selectedUserId);
    userDelete(selectedUserId)
      .unwrap()
      .then(() => {
        toast.success(`User with ID: ${selectedUserId} has been deleted!`);
      })
      .catch(() => {
        toast.error("Error deleting user!");
      })
      .finally(() => {
        setOpen(false);
        setDeletingUserId(null);
      });
  };

  const handleEdit = (id) => {
    setEditingUserId(id);
    setTimeout(() => {
      navigate("/dashboard");
      setEditingUserId(null);
    }, 1000);
  };

  const handleOpenDialog = (id) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleViewDetails = (userId) => {
    setLoading(true);
    setLoadingUserId(userId);
    setTimeout(() => {
      navigate(`/details/${userId}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="marquee-container">
        <div className="marquee-content">
          Welcome to the User Management System! Scroll down to view user
          details and interact with users. Remember the API is fake and don't
          worry just click the button!
        </div>
      </div>

      <div style={{ padding: "50px", backgroundColor: "#f0f2f5" }}>
        <Row gutter={[16, 16]}>
          {data?.data?.map((user, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt={user.first_name}
                    src={user.avatar}
                    style={{ height: "280px", objectFit: "cover" }}
                  />
                }
                actions={[
                  <Button
                    type="link"
                    icon={<LikeOutlined />}
                    onClick={() => handleLike(user.id)}
                  />,
                  <Button
                    type="link"
                    icon={<DislikeOutlined />}
                    onClick={() => handleUnlike(user.id)}
                  />,
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(user.id)}
                    loading={editingUserId === user.id}
                  />,
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() => handleOpenDialog(user.id)}
                    loading={deletingUserId === user.id}
                  />,
                ]}
                style={{
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              >
                <Meta
                  title={`${user.first_name} ${user.last_name}`}
                  description={user.email}
                />
                <Button
                  type="primary"
                  block
                  style={{
                    marginTop: "15px",
                    backgroundColor: "#2575fc",
                    borderColor: "#2575fc",
                  }}
                  onClick={() => handleViewDetails(user.id)}
                  loading={loading && loadingUserId === user.id}
                >
                  View Details
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          title="Delete User"
          visible={open}
          onOk={handleDelete}
          onCancel={handleCloseDialog}
          okText="Delete"
          okButtonProps={{ danger: true }}
          cancelText="Cancel"
        >
          <p>Are you sure to delete this user?</p>
        </Modal>

        <ToastContainer />
      </div>
    </>
  );
};

export default User;
