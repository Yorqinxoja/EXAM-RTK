import { Button, Form, Input, Typography, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserSignUpMutation } from "../../../redux/api/authApi";
import { signUp } from "../../../redux/slices/authslices";

const { Title, Text } = Typography;

const SignUp = () => {
  const [userSignUp, { data, isSuccess, isLoading }] = useUserSignUpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    userSignUp(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(signUp({ token: data.token }));
      notification.success({
        message: "Successfully signed up! Go ahead 😊",
      });
      navigate("/");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="p-4 w-full"
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={2} className="text-center">
        Sign Up
      </Title>
      <Form.Item
        label="Firstname"
        name="first_name"
        rules={[{ required: true, message: "Please input your firstname!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Photo URL"
        name="photo_url"
        rules={[{ required: true, message: "Please input your photo URL!" }]}
      >
        <Input type="url" />
      </Form.Item>
      <Form.Item>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </Form.Item>
      <Text>
        Already have an account? <Link to="/auth/login">Log in</Link>
      </Text>
    </Form>
  );
};

export default SignUp;
