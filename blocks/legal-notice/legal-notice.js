/**
 *
 * @param {HTMLDivElement} block
 */
export default function decorate(block) {
  const children = block.querySelectorAll(":scope > div > div > *");
  block.replaceChildren(...children);
}
