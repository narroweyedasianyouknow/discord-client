import { useMemo, useState } from "react";
import DialogWrapper from "@/components/Dialog/DialogWrapper";
import DialogLogin, { DialogRegister } from "./components/DialogLogin";

export default function Authorization() {
  const [type, setType] = useState<"login" | "register">("login");

  const content = useMemo(() => {
    if (type === "register") {
      return <DialogRegister onChangeType={() => setType("login")} />;
    }
    return <DialogLogin onChangeType={() => setType("register")} />;
  }, [type]);

  return (
    <DialogWrapper
      bgColor="--brand-560"
      onClose={() => {
        // действия при закрытии
      }}
      active={true}
    >
      {content}
    </DialogWrapper>
  );
}
