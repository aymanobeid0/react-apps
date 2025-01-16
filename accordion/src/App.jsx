import { useState } from "react";
import "./styles.css";
const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <>
      <Accordion />
    </>
  );
}

function Accordion() {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div className="accordion">
      {faqs.map((faq, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          itemNumber={i + 1}
          title={faq.title}
          text={faq.text}
          key={faq.title}
        />
      ))}
    </div>
  );
}

function AccordionItem({ itemNumber, title, text, curOpen, onOpen }) {
  // Determine if this item is currently open by comparing its number with curOpen state
  const isOpen = itemNumber === curOpen;

  // Handler function for click events that triggers the open/close action
  function handleToggle() {
    //set the curOpen to the item number and makes the other isOpen false
    onOpen(itemNumber);
    console.log(isOpen);
    console.log(itemNumber);
  }

  // Render the accordion item with conditional styling and content
  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{itemNumber}</p>
      <p className="title">{title}</p>
      {/* Show minus when open, plus when closed */}
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {/* Conditionally render content box only when item is open */}
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}
