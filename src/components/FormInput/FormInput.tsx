import React, {ChangeEvent, FC} from 'react';

interface IFormInput {
    item: {
        value?: string,
        placeholder: string,
        name: string,
        type: string,
        accept?: string,
    },
    emailRequired?: boolean
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormInput: FC<IFormInput> = ({ item, handleChange, emailRequired }) => {
    const { value, placeholder, name , type } = item;
    return (
        <input type={type} placeholder={placeholder}
               name={name} required={ emailRequired }
               value={value}
               accept={item.accept}
               onChange={handleChange}
        />
    );
};

export default FormInput;
