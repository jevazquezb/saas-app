import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, extraStyles }) => {
  return isLoggedIn ? (
    <Link
      href="dashboard"
      className={`btn btn-primary ${extraStyles ? extraStyles : ""}`}
    >
      Welcome back {name}
    </Link>
  ) : (
    <button>Login</button>
  );
};

export default ButtonLogin;
