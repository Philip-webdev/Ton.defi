import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Entry point for invite links: keep the claim token, then send the person to log in or to home.
export default function ClaimInvite() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) localStorage.setItem("pendingClaim", token);
    navigate(localStorage.getItem("token") ? "/home" : "/user", { replace: true });
  }, []);

  return null;
}
