import React, { useState, useEffect } from "react";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserId, setToken, setPicture } from "../Store/userSlice";
import { loginUser } from "../Services/api";

const lightTheme = {
  background: "#f0f4f8",
  formBackground: "#ffffff",
  textColor: "#333",
  borderColor: "#ccc",
  inputBackground: "#fff",
  buttonBackground: "#007bff",
  buttonHoverBackground: "#0056b3",
  linkColor: "#007bff",
  linkHoverColor: "#0056b3",
};

const darkTheme = {
  background: "#121212",
  formBackground: "#1e1e1e",
  textColor: "#f0f0f0",
  borderColor: "#555",
  inputBackground: "#2c2c2c",
  buttonBackground: "#bb86fc",
  buttonHoverBackground: "#9a67ea",
  linkColor: "#bb86fc",
  linkHoverColor: "#9a67ea",
};

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const user = useSelector((state) => state.user.user); 
  const token = useSelector((state) => state.user.token); 

  useEffect(() => {
    if (user && token) {
      navigate("/");
    }
  }, [user, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await loginUser({ email, password });
      dispatch(setUser(response.email));
      dispatch(setToken(response.token));
      dispatch(setPicture(response.picture));
      dispatch(setUserId(response._id));
      navigate("/");
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleSignupClick = () => {
    navigate("/register"); // Navigate to the registration page
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Wrapper>
        <FormContainer>
          <ToggleDarkMode onClick={toggleDarkMode}>
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </ToggleDarkMode>
          <Title>Welcome Back</Title>
          <Subtitle>Login to your account</Subtitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Sign In</Button>
            <SignupPrompt>
              Don't have an account?{" "}
              <SignupLink onClick={handleSignupClick}>
                Create one
              </SignupLink>
            </SignupPrompt>
          </Form>
        </FormContainer>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Login;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
  padding: 0 20px;
  transition: background-color 0.3s;
`;

const FormContainer = styled.div`
  background: ${(props) => props.theme.formBackground};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 400px;
  width: 100%;
  animation: ${fadeIn} 0.5s ease-out;
  text-align: center;
  transition: background-color 0.3s, box-shadow 0.3s;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 15px;
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBackground};
  transition: border-color 0.3s, background-color 0.3s;
  &:focus {
    border-color: ${(props) => props.theme.buttonBackground};
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => props.theme.buttonBackground};
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
    transform: scale(1.05);
  }
`;

const SignupPrompt = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
`;

const SignupLink = styled.span`
  color: ${(props) => props.theme.linkColor};
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s;
  &:hover {
    color: ${(props) => props.theme.linkHoverColor};
  }
`;

const ToggleDarkMode = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
  &:focus {
    outline: none;
  }
`;
