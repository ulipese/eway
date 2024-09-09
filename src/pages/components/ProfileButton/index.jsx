import { Link, useLocation } from "react-router-dom";

export const ProfileButton = () => {
  const { pathname } = useLocation();

  return (
    <Link
      to="/profile"
      className={`sm:flex absolute right-[2em] top-[2em] bg-white w-[5em] h-[2em] p-[1.5em] flex justify-center items-center gap-[.5em]
         rounded-full transition-all hover:shadow-[0_0_30px_-10px_rgba(39,193,184,.9)] shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] xl:top-[0em] xl:right-[0em] max-sm:top-[8em] ${
           pathname === "/ProfileButton" ? "bg-eblue" : ""
         }`}
    >
      <img
        src="/assets/images/profileButton/profileUserIcon.svg"
        alt="ProfileButton button icon"
        className="w-[1.5em]"
      />
      <img
        src="/assets/images/profileButton/profileMenuIcon.svg"
        alt="ProfileButton button menu icon"
        className="w-[1em]"
      />
    </Link>
  );
};
