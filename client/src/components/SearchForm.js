import './SearchForm.css';
import { useState } from "react";

export default function SearchForm({ handleSubmit }) {
    const [query, setQuery] = useState('');

    return <form class="SearchForm" onSubmit={handleSubmit} >
        <input type="text"/>
        <button type="submit"><img src="https://cdn-icons-png.flaticon.com/512/71/71403.png" alt="Search"/></button>
    </form>
}