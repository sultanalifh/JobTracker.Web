function RegisterPage() {
  return (
    <main>
      <form>
        <h1>Register</h1>
        <div>
            <label>Username</label>
            <input type="text"/>
        </div>
        <div>
            <label>Password</label>
            <input type="password"/>
        </div>
        <div>
            <label>Repeat password</label>
            <input type="password"/>
        </div>
        <div>
            <label>Already have an account?</label>
            <a href="/login">login</a>
        </div>
        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default RegisterPage;
