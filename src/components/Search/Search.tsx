import React, {ChangeEvent, FC} from 'react';
import SearchIcon from "../../assets/SearchIcon";
import styles from "./Search.module.scss";
import {useChat} from "../../context/ChatContext";

const Search: FC = () => {
    const { changeSearchQuery, searchQuery } = useChat();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        changeSearchQuery(event.target.value)
    }

    return (
        <div className={styles.searchContainer}>
            <SearchIcon/>
            <input type="search" className={styles.search}
                   id="search-input" placeholder="Search"
                   onChange={handleChange} value={searchQuery}
            />
            <label htmlFor="search-input">Messages</label>
        </div>
    );
};

export default Search;