const containers = document.querySelectorAll("[data-indicator]");

containers.forEach((container) => {
  const items = container.querySelectorAll(container.dataset.indicatorItem);
  const overlay = container.querySelector(container.dataset.indicator);
  indicator({ items, container, overlay });
});

function indicator({ items, container, overlay }) {
  let containerStyle = getComputedStyle(container);
  let containerPosition = containerStyle.getPropertyValue("position");
  let { y: containerY } = container.getBoundingClientRect();

  items.forEach((item) => {
    const { x, y, width, height } = item.getBoundingClientRect();
    let itemStyle = getComputedStyle(item);

    // Item position
    item.style.position = "relative";
    item.style.zIndex = "2";

    // Overlay
    item.onclick = () => {
      const top = y - (containerPosition == "static" ? 0 : containerY);

      overlay.style.position = "absolute";
      item.style.zIndex = "1";

      overlay.style.width = `${width}px`;
      overlay.style.height = `${height}px`;
      overlay.style.top = `${top}px`;
      overlay.style.left = `${x}px`;
      overlay.style.borderRadius = itemStyle.borderRadius;
    };
  });
}
