import React, {ChangeEvent, FC} from 'react';

interface IAuthFormInput {
    name: string,
    secretKey: { [key: string]: string },
    onChange: (e:ChangeEvent<HTMLInputElement>) => void
}

const ConfirmationInput: FC<IAuthFormInput> = ({ name, secretKey, onChange }) => {
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    }

    return (
        <input type="tel" name={name} pattern="[\d]*"
               maxLength={1} required
               value={secretKey[name]}
               onChange={handleChange}
        />
    );
};

export default ConfirmationInput;
