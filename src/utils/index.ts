export function changeTheme() {
  const classList: Array<string> = Array.from(
    document.documentElement.classList
  );
  if (!classList.includes("dark"))
    document.documentElement.classList.add("dark");
  else {
    document.documentElement.classList.remove("dark");
  }
}

export function getDateArr(lastRule: string = "day"): Array<string> {
  const now = new Date();
  const year = now.getFullYear() + '';
  const month = now.getMonth() + 1 + '';
  const day = now.getDate() + '';
  if (lastRule === "year") {
    return [year];
  } else if (lastRule === "month") {
    return [year, month];
  } else {
    return [year, month, day];
  }
}
