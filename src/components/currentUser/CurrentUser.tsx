import { useAppSelector } from "../../hooks";

const CurrentUser = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <p style={{ textAlign: "end", paddingRight: "1rem" }}>
      Hi,{" "}
      <span
        style={{
          color: "var(--button)",
        }}
      >
        {currentUser ? currentUser.email : "guest"}
      </span>
      !
    </p>
  );
};
export default CurrentUser;
