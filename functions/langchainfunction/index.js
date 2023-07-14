import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage, AIChatMessage } from "langchain/schema";

export default async function (event, context, logger) {

  const {messages} = event.data;
	const chat = new ChatOpenAI();
  const langMsgArray = messages.map((message) => {
		if (message.role === "user") {
			return new HumanChatMessage(message.content);
		} else if (message.role === "system") {
			return new SystemChatMessage(message.content);
		} else if (message.role === "assistant") {
			return new AIChatMessage(message.content);
		}
	});

	const response = await chat.call(langMsgArray);
  return response;
}
