import { watch, defineComponent, computed } from "vue";
const toastProps = {
  show: Boolean,
  duration: Number,
  message: String,
  type: String,
  icon: String,
};
export default defineComponent({
  name: "Toast",
  props: toastProps,
  emits: ["update:show"],
  setup(props, { emit }) {
    let timer: ReturnType<typeof setTimeout>;
    const renderIcon = () => {
      return (
        <div class="font-bold text-3xl mb-4">
          {props.icon ? (
            <i class={`fa-solid ${props.icon}`}></i>
          ) : props.type === "success" ? (
            <i class="fa-solid fa-check"></i>
          ) : props.type === "error" ? (
            <i class="fa-solid fa-exclamation"></i>
          ) : (
            <i class="fa-solid fa-spinner animate-spin"></i>
          )}
        </div>
      );
    };
    const renderMessage = () => {
      return <h1>{props.message}</h1>;
    };
    const onClick = () => {
      emit("update:show", false);
    };
    const onChildClick = (e: MouseEvent) => {
      e.stopPropagation();
    };
    const updateShow = (show: boolean) => emit("update:show", show);
    const clearTimer = () => clearTimeout(timer);
    watch(
      () => [props.duration, props.show],
      () => {
        clearTimer();
        if (props.show && (props.duration as number) > 0) {
          timer = setTimeout(() => {
            updateShow(false);
          }, props.duration);
        }
      }
    );
    return () =>
      props.show ? (
        <div
          class="text-xl fixed top-0 bottom-0 left-0 right-0 w-full h-full z-2023 fcc"
          onClick={onClick}
        >
          <div
            class="bg-black text-white rounded-md flex-col fcc py-4 px-8 dark:text-slate-900 dark:bg-white"
            onClick={onChildClick}
          >
            {renderIcon()}
            {renderMessage()}
          </div>
        </div>
      ) : null;
  },
});
