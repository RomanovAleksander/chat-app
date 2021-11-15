import {IChatsListItem} from "../components/ChatsList/ChatsList";
import {timeSince} from "./convertTime";

enum status {
    dispatch = 'dispatch'
}

export const getStatus = (chat: IChatsListItem) => {
    if (chat.status !== status.dispatch) return chat.status;
    if (chat.online) return 'online';
    if (chat.exitDate) return `last online ${timeSince(chat.exitDate)}`;
    return 'offline';
}