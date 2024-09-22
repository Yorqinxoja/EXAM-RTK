import { Link, useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../../../redux/api/authApi";
import { logIn } from "../../../redux/slices/authslices";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Typography, notification } from "antd";

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const [userLogin, { data, isSuccess, isLoading }] = useUserLoginMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    userLogin(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(logIn({ token: data.token }));
      notification.success({
        message: "Successfully logged in! Go ahead 😊",
      });
      navigate("/auth/signup/");
    }
  }, [isSuccess]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="p-4 w-full max-w-sm mx-auto"
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={3} className="text-center text-blue-500">
        Login
      </Title>

      <Form.Item
        label={<span className="text-blue-500">Email</span>}
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input className="bg-white text-black" />
      </Form.Item>

      <Form.Item
        label={<span className="text-blue-500">Password</span>}
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password className="bg-white text-black" />
      </Form.Item>

      <Form.Item>
        <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white" type="primary" htmlType="submit" loading={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </Form.Item>

      <Text className="text-black">
        Don't have an account? <Link className="text-blue-500 hover:text-blue-700" to="/auth/signup">Sign Up</Link>
      </Text>
    </Form>
  );
};

export default Login;
