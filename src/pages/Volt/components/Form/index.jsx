import { useState, useEffect } from "react";
import { callGeminiApi } from "../../api";
import { checkAuthToken } from "../../../../auth";

export const Form = ({ setMessages, setIsTyping, isTyping }) => {
  const [value, setValue] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    checkAuthToken().then((res) => {
      setUser(res.data.user);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userMessage = {
      interactor: "Você",
      text: value,
    };

    localStorage.setItem("name", await user?.userName);

    // Adiciona a última mensagem do usuário ao histórico
    setMessages((prevValue) => [...prevValue, userMessage]);
    setValue("");

    // Chama a API do Gemini e aguarda até ele retornar a resposta
    const aiResponse = await callGeminiApi(value, user);

    // Atualiza a resposta da VoltAI de forma gradual
    const aiMessage = { interactor: "VoltAI", text: "" };
    setMessages((prevValue) => [...prevValue, aiMessage]);
    setIsTyping(true); // Define o estado de digitação como verdadeiro

    let currentText = "";
    const typingSpeed = 35; // Velocidade

    aiResponse.split("").forEach((char, index) => {
      setTimeout(() => {
        currentText += char;
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].text = currentText;
          return updatedMessages;
        });

        // Verifica se terminou a digitação
        if (index === aiResponse.length - 1) {
          setIsTyping(false); // Finaliza o estado de digitação quando o texto termina
        }
      }, typingSpeed * index);
    });
  };

  return (
    <form
      className="absolute w-[98%] h-[4em] left-1 bottom-0 flex justify-center items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className={`w-full h-full transition-all outline-none border-1 indent-2 pl-6 pr-24 rounded-full shadow-[0px_0px_5px_2px_rgba(39,193,184,.9)] ${
          isTyping && "bg-gray-200"
        }`}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={isTyping}
      />
      <button
        className="w-[3em] absolute right-3 bg-eblue flex justify-center items-center p-2 px-3 rounded-full"
        disabled={isTyping}
      >
        <img src="/assets/images/voltAi/voltAiArrow.svg" alt="Volt Ai Arrow" />
      </button>
    </form>
  );
};
