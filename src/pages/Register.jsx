import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    //Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    //Prevent duplicate email
    const exists = users.find((u) => u.email === data.email);
    if (exists) {
      alert("User already exists");
      return;
    }

    //Assign ID
    const newUser = {
      id: Date.now(),
      ...data,
    };

    //Save users array
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    //Save logged-in user
    localStorage.setItem("user", JSON.stringify(newUser));

    navigate("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>

      <label> Name</label>
      <input type="name" {...register("name")} required />

      <label> Email </label>
      <input type="email" {...register("email")} required />

      <label> Role </label>
      <select {...register("role")} required>
        <option value="">Select role</option>
        <option value="job_seeker">Job Seeker</option>
        <option value="employer">Employer</option>
      </select>

      <label> Password </label>
      <input type="password" {...register("password")} required />

      <button type="submit"> Register </button>
    </form>
  );
}

export default Register;
