import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayParam = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        if (prompt) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input);
            response = await run(input);
        }

        const responseArray = response.split("**");
        let newResArray = [];

        for (let i = 0; i < responseArray.length; i++) {
            if (i % 2 === 0) {
                newResArray += responseArray[i];
            } else {
                newResArray += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponseArray = newResArray.split("*").join("</br>")
        setResultData(newResponseArray);

        let typingAnimatedRes = newResponseArray.split(" ");
        for (let i = 0; i < typingAnimatedRes.length; i++) {
            const nextWord = typingAnimatedRes[i];
            delayParam(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompts, setPrevPrompts, onSent, setRecentPrompt, recentPrompt, showResult, loading, resultData, input, setInput, newChat
    }

    return <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
}

export default ContextProvider;