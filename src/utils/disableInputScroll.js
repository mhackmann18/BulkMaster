export default function disableInputScroll() {
  document.addEventListener("wheel", () => {
    if (document.activeElement.type === "number") {
      document.activeElement.blur();
    }
  });
}
