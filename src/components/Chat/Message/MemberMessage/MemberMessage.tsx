import React from 'react';
import {IMessage} from "../../../../interfaces/interfaces";
import styles from './MemberMessage.module.scss';
// import MoreHorizontalIcon from "../../../assets/MoreHorizontal";
import FileIcon from "../../../../assets/FileIcon";
import convertFileSize from '../../../../utils/convertFileSize';
import {timeSince} from "../../../../utils/convertTime";
import {splitFileName} from "../../../../utils/splitFileName";
import {getFileType} from "../../../../utils/getFileType";
import {minimizeFileName} from "../../../../utils/minimizeFileName";

const MemberMessage: React.FC<{ message: IMessage }> = ({ message }) => {
    const imgTypes = ['jpg', 'jpeg', 'png', 'svg'];

    if (message) {
        return (
            <div className={styles.memberMessage}>
                <div style={{
                    backgroundImage: `url(/images/${message.photo})`
                }} className={styles.avatar}/>
                <div className={styles.messageContainer}>
                    <div className={styles.messageContent}>
                        <div className={styles.messageText}>
                            {message.text}
                            { message.file &&
                            <div className={styles.messageFile}>
                                { imgTypes.some((type) => type === getFileType(message.file.name)) ? <img src={`${message.file.href}`} alt=""/> : (
                                    <>
                                        <div className={styles.file}>
                                            <FileIcon />
                                        </div>
                                        <div className={styles.fileInfo}>
                                            <div className={styles.fileName}>{minimizeFileName(splitFileName(message.file.name))}</div>
                                            <div className={styles.fileSize}>{convertFileSize(message.file.size)}</div>
                                        </div>
                                    </>
                                )}
                            </div> }
                        </div>
                    </div>
                    <div className={styles.date}>{timeSince(message.date)}</div>
                </div>
                {/*<div className={styles.moreButton}>*/}
                {/*    <MoreHorizontalIcon/>*/}
                {/*</div>*/}
            </div>
        );
    } else {
        return null
    }
};

export default MemberMessage;
