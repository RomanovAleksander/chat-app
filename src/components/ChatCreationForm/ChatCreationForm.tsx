import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import styles from './ChatCreationForm.module.scss';
import FormInput from "../FormInput/FormInput";
import {IFile, useSocket} from "../../context/SocketContext/SocketContext";

// rooms: name, photo, [users.email] свій + інші
// chat: [users.email] свій + інший

interface DataInterface {
    name: string,
    users: string[],
    photo: IFile | string,
}

const ChatCreationForm: FC<{ toggleModal: () => void }> = ({ toggleModal }) => {
    const [isChat, setIsChat] = useState<boolean>(true);
    const { user } = useAuth();
    const { createRoom } = useSocket();
    const defaultData: DataInterface = { name: '', photo: '', users: [user ? user.email : ''] };
    const [formData, setFormData] = useState<DataInterface>(defaultData);
    const [email, setEmail] = useState<string>('');
    const formInputs = {
        roomInputs: [
            { value: formData.name, placeholder: 'Room Name', name: 'name' , type: 'text' },
        ],
        chatInputs: [
            { value: email, placeholder: 'User Email', name: 'email' , type: 'email', isNotRequired: true },
        ]
    }

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        if (target.name === 'email') {
            setEmail(target.value);
        } else {
            setFormData(prevState => {
                return {
                    ...prevState,
                    [target.name]: target.value
                }
            });
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const file = files && files[0];
        if (!file) return;
        setFormData((prev) => ({
            ...prev,
            photo: { originalName: file.name, size: file.size, buffer: file },
        }));
    };

    const handleAddUser = () => {
        setFormData(prevState => {
            return {
                ...prevState,
                users: [...prevState.users, email]
            }
        });
        setEmail('');
        formInputs.chatInputs[0].isNotRequired = false;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createRoom(formData.users, formData.photo as IFile, formData.name);
        toggleModal()
    };

    const inputs = (isChat ? formInputs.chatInputs : [...formInputs.roomInputs, ...formInputs.chatInputs]);

    return (
        <div className={styles.modalWrapper} onSubmit={handleSubmit}>
            <form className={styles.modal}>
                <div className={styles.title}>
                    <p className={`${isChat ? styles.titleActive : null}`}
                       onClick={() => setIsChat(true)}
                    >
                        Chat Creation
                    </p>
                    <span className={styles.divingLine}>/</span>
                    <p className={`${!isChat ? styles.titleActive : null}`}
                       onClick={() => setIsChat(false)}
                    >
                        Room Creation
                    </p>
                </div>
                <div className={styles.inputsWrapper}>
                    { !isChat && <input type='file' placeholder='Photo'
                                        name='photo'
                                        accept='.jpg, .jpeg, .png, .svg'
                                        onChange={handleFileChange} />
                    }
                    { inputs.map((item) => <FormInput item={item} handleChange={handleChange} key={item.name} />) }
                    <button onClick={handleAddUser} type="button">Add</button>
                </div>
                <div className={styles.buttonsWrapper}>
                    <button className={styles.close} onClick={() => toggleModal()} type="button">
                        Close
                    </button>
                    <button className={styles.submit} type="submit">
                        {isChat ? 'Create Chat' : 'Create Room'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatCreationForm;