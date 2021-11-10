import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
    return (
        <p className={styles.loader}>Loading...</p>
    );
};

export default Loader;
