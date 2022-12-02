import { mountComponent, usePopupState } from "@/utils/mountComponent";
import { ComponentPublicInstance, getCurrentInstance, ref } from "vue";
import Toast from "./Toast";
type ToastWrapperInstance = ComponentPublicInstance<{
  close: () => void;
  open: (props: IToastOptions) => void;
}>;
interface IToastOptions {
  duration?: number;
  message: string;
  type?: "success" | "loading" | "error";
  icon?: string;
}
const defaultOptions: IToastOptions = {
  type: "success",
  message: "",
  duration: 2000,
  icon: "",
};
let queue: ToastWrapperInstance[] = [];
let allowMultiple = false;
function createInstance() {
  const { instance, unmount } = mountComponent({
    setup() {
      const { open, state, close, toggle } = usePopupState();
      const onClosed = () => {
        if (allowMultiple) {
          queue = queue.filter((item) => item !== instance);
          unmount();
        }
      };
      const render = () => {
        const attrs: Record<string, unknown> = {
          onClosed,
          "onUpdate:show": toggle,
        };
        return <Toast {...state} {...attrs} />;
      };
      (getCurrentInstance() as any).render = render;
      return {
        open,
        close,
      };
    },
  });
  return instance as ToastWrapperInstance;
}
function getInstance() {
  if (!queue.length || allowMultiple) {
    const instance = createInstance();
    queue.push(instance);
  }
  return queue[queue.length - 1];
}

const getOptions = (sourceOptions: string | IToastOptions): IToastOptions => {
  if (typeof sourceOptions === "string") {
    return { ...defaultOptions, message: sourceOptions };
  }
  return { ...defaultOptions, ...sourceOptions };
};

export function showToast(sourceOptions: string | IToastOptions) {
  const toast = getInstance();
  const options = getOptions(sourceOptions);
  toast.open(options);
  return toast;
}
