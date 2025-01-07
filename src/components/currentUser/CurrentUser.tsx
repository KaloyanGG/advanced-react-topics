import { useAppSelector } from "../../hooks";

const CurrentUser = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <p style={{ textAlign: "end", paddingRight: "1rem" }}>
      Hi, {currentUser ? currentUser.email : "guest"}!
    </p>
  );
};
export default CurrentUser;
