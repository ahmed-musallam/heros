/**
 *
 * @param {HTMLParagraphElement} p
 * @returns
 */
const toAnswerButton = (p, nextQRoute) => {
  const buttonContainer = document.createElement("p");
  buttonContainer.classList.add("button-container");
  const em = document.createElement("em");
  const a = document.createElement("a");
  a.href = `#${nextQRoute}`;
  a.addEventListener("click", (e) => {
    e.preventDefault();
    // TODO: save answer
    window.location.hash = `#${nextQRoute}`;
  });
  a.title = p.textContent;
  a.classList.add("button", "secondary");
  a.textContent = p.textContent;
  em.append(a);
  buttonContainer.append(em);
  return buttonContainer;
};

/**
 *
 * @param {HTMLDivElement} block
 */
export default function decorate(block) {
  const innerDiv = block.querySelector(":scope > div > div");
  const question = innerDiv.firstElementChild;
  const section = block.closest(".section");
  const nextSection = section.nextElementSibling;
  const nextQRoute = nextSection ? nextSection.getAttribute("data-route") : "";

  const decoratedAnswers = [...innerDiv.querySelectorAll("p")].map((p) =>
    toAnswerButton(p, nextQRoute)
  );

  const questionDiv = document.createElement("div");
  // add question to questionDiv
  questionDiv.append(question);
  // create a text input and append it to questionDiv
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Your answer";
  input.required = true;
  input.classList.add("question-input");
  questionDiv.append(input);
  // append all decoratedAnswers to questionDiv
  decoratedAnswers.forEach((a) => questionDiv.append(a));

  // replace block with questionDiv
  block.replaceWith(questionDiv);
}
