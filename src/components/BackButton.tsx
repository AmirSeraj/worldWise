import { Button } from "@heroui/react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      variant="bordered"
      color="success"
      className="w-28"
      onPress={() => navigate(-1)}
      startContent={<MdKeyboardBackspace color="success" />}
    >
      Back
    </Button>
  );
}
