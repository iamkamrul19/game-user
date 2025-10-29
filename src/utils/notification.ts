import toast from "react-hot-toast";

type MessageType = "error" | "success";

interface Idata {
  path: string;
  message: string;
}

export const showSingle = (type: MessageType, message: string) => {
  if (type === "success") {
    toast.success(message);
  }
  if (type === "error") {
    toast.error(message);
  }
};

export const showMultiple = (type: MessageType, data: Idata[]) => {
  for (const item of data) {
    if (type === "success") {
      toast.success(item?.message || "");
    } else if (type === "error") {
      toast.error(item?.message || "");
    }
  }
};
