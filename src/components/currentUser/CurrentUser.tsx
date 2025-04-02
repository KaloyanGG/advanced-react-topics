import { useAppSelector } from "../../hooks";

const CurrentUser = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <p className='current-user'>
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
