export interface IMessage {
    id: string,
    type?: string,
    photo: string,
    text: string,
    date: number,
    status: string,
    file: {
        name: string,
        size: number,
        type: string,
        href: string
    }
}
