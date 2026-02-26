import { Form } from "./components/Form";
import { Interaction } from "./components/Interaction";
import { useState, useRef, useEffect } from "react";

export const Volt = () => {
  const [messages, setMessages] = useState([
    { interactor: "VoltAI", text: "Olá, como posso te ajudar hoje? ⚡" },
  ]);
  const [isTyping, setIsTyping] = useState(false); 
  const [autoScroll, setAutoScroll] = useState(true); 

  const messagesEndRef = useRef(null); 
  const messagesContainerRef = useRef(null); 

  const scrollToBottom = (behavior = "smooth") => {
    if (messagesEndRef.current && autoScroll) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  };
l
  const handleUserScroll = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setAutoScroll(isAtBottom);
    }
  };

  useEffect(() => {
    scrollToBottom("instant");
  }, [messages]);

  return (
    <main className="w-full h-full flex flex-col gap-[2em] relative">
      <h1 className="text-6xl md:text-5xl font-bold">Volt</h1>
      <section
        className="flex flex-col w-full h-[70%] rounded-lg gap-[1em] justify-baseline overflow-y-auto scrollbar"
        onScroll={handleUserScroll}
        ref={messagesContainerRef} // Referência para o container
      >
        {messages.map((message, index) => {
          return (
            <Interaction
              key={`voltChat-${index}`}
              interactor={message.interactor ? message.interactor : "VoltAI"}
              text={message.text}
              isTyping={
                isTyping &&
                message.interactor === "VoltAI" &&
                index === messages.length - 1
              } // Conferindo se a Volt está digitando
            />
          );
        })}
        {/* Referência para garantir que o scroll vai até o fim */}
        <div ref={messagesEndRef} />
      </section>

      <Form
        setMessages={setMessages}
        messages={messages}
        setIsTyping={setIsTyping}
        isTyping={isTyping}
      />
    </main>
  );
};
