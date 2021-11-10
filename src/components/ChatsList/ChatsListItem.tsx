import React from 'react';
import styles from "./ChatsList.module.scss";

const ChatsListItem: React.FC = () => {
    return (
        <>
            <div className={styles.itemHeader}>
                <div className={styles.userInfo}>
                    <div style={{
                        backgroundImage: `url(/images/user3.jpeg)`
                    }} className={styles.avatar}/>
                    <div>
                        <div className={styles.name}>Luy Robin</div>
                        <div className={styles.status}>last online 5 hours ago</div>
                    </div>
                </div>
                <div className={styles.time}>1 minute ago</div>
            </div>
            <div className={styles.messageContainer}>
                <div className={styles.message}>Most of its text is made up from sections 1.10.32–3 of
                    Cicero's De finibus bonorum et malorum (On the Boundaries of Goods and Evils;
                    finibus
                    may
                    also be translated as purposes).
                </div>
                <div className={styles.noChecked}>
                    <span>2</span>
                </div>
            </div>
        </>
    );
};

export default ChatsListItem;
