import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import LogInCard from "../components/LoginCard";
import SignupCard from "../components/SignUpCard";

function AuthPage() {
  const authScreenState = useRecoilValue(authScreenAtom);
  return <>{authScreenState === "login" ? <LogInCard /> : <SignupCard />}</>;
}

export default AuthPage;
