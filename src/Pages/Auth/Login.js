import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const { data } = await axios.post(loginAPI, values);
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/");
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Login failed. Please try again!", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        overflow: "hidden",
      }}
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#1a1a2e" } },
          particles: {
            number: { value: 150, density: { enable: true, value_area: 900 } },
            color: { value: ["#ff0099", "#00ccff"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 4, random: true },
            move: { enable: true, speed: 1.5 },
          },
          detectRetina: true,
        }}
      />
      {/* Login Form Section */}
      <Container
        style={{
          position: "relative",
          zIndex: 2,
          padding: "20px",
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.1)", // Glass effect
          backdropFilter: "blur(10px)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div style={{ textAlign: "center" }}>
              <h1>
                <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
              </h1>
              <h2 className="text-white">Login</h2>
            </div>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                />
              </Form.Group>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                <Link to="/forgotPassword" className="text-white">
                  Forgot Password?
                </Link>

                <Button
                  type="submit"
                  style={{
                    background: "linear-gradient(90deg, #ff0099, #493240)",
                    border: "none",
                    padding: "10px 20px",
                    width: "100%",
                    borderRadius: "5px",
                    marginTop: "15px",
                    transition: "0.3s",
                  }}
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Signing in…" : "Login"}
                </Button>

                <p style={{ marginTop: "15px", color: "#ccc" }}>
                  Don't Have an Account?{" "}
                  <Link to="/register" className="text-white">
                    Register
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
