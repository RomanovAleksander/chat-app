import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {useAuth} from "../../context/AuthContext";
import FormInput from "../FormInput/FormInput";
import {IFile, useSocket} from "../../context/SocketContext/SocketContext";
import 'react-toastify/dist/ReactToastify.css';
import styles from './ChatCreationForm.module.scss';

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
    const [emailRequired, setEmailRequired] = useState<boolean>(true)
    const formInputs = {
        roomInputs: [
            { value: formData.name, placeholder: 'Room Name', name: 'name' , type: 'text' },
        ],
        chatInputs: [
            { value: email, placeholder: 'User Email', name: 'email' , type: 'email' },
        ]
    };

    const showToast = (message: string) => {
        toast(`${message} added`, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
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
        setFormData(prev => ({...prev, users: [...prev.users, email]}));
        if (email) showToast(email);
        setEmail('');
        setEmailRequired(false);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setFormData(prev => ({...prev, users: [...prev.users, email]}));
        createRoom([...formData.users, email], formData.photo as IFile, formData.name);
        toggleModal()
    };

    const inputs = (isChat ? formInputs.chatInputs : [...formInputs.roomInputs, ...formInputs.chatInputs]);

    return (
        <>
        <ToastContainer />
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
                                            className={styles.customFileInput}
                                            onChange={handleFileChange} />
                        }
                        { inputs.map((item) =>
                            <FormInput item={item} emailRequired={emailRequired} handleChange={handleChange} key={item.name} />)
                        }
                        { !isChat && <button onClick={handleAddUser} type="button">Add</button> }
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
        </>
    );
};

export default ChatCreationForm;
