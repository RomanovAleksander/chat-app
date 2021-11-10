import React, {ChangeEvent, FC} from 'react';

interface IFormInput {
    item: {
        [key: string]: string
    },
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormInput: FC<IFormInput> = ({ item, handleChange }) => {
    const { value, placeholder, name , type } = item;
    return (
        <input type={type} placeholder={placeholder}
               name={name} required
               value={value}
               onChange={handleChange}
        />
    );
};

export default FormInput;
