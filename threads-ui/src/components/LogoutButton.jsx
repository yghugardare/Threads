import { Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";

function LogoutButton() {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.removeItem("user-threads");
      showToast("Success", "User Loged Out Successfully!", "success");
      setUser(null);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };
  return (
    <Button
      // position={"fixed"}
      // top={"30px"}
      // right={"30px"}
      size={"xs"}
      // size={20}
      onClick={handleLogout}
    >
      <FiLogOut size={20} />
    </Button>
  );
}

export default LogoutButton;
