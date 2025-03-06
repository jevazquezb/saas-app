import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name }) => {
  return isLoggedIn ? (
    <Link href="dashboard" className="btn btn-primary">
      Welcome back {name}
    </Link>
  ) : (
    <button>Login</button>
  );
};

export default ButtonLogin;
