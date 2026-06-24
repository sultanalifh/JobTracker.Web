import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <main>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await login(username, password);

          localStorage.setItem("token", response.token);

          navigate("/dashboard");
        }}
      >
        <h1>Login</h1>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div>
          <label>Don't have an account?</label>
          <a href="/register">register</a>
        </div>

        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default LoginPage;
