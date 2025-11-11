import { useNavigate } from "react-router";
import Button from "../Button/Button";

const ButtonBack = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  return (
    <Button
      text={"< Назад"}
      onClick={handleGoBack}
      style={{ marginBottom: "30px" }}
    />
  );
};

export default ButtonBack;
