import './SearchForm.css';
import { useState } from "react";

export default function SearchForm({ handleOptionChange }) {
    const filterFields = ['game', 'publisher', 'developer'];
    const [filters, setFilters] = useState({ field: filterFields[0], query: ''});

    const updateFilters = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const updatedFilters = {...filters, [name]: value};

        handleOptionChange(e, updatedFilters);
        setFilters(updatedFilters);    
    }
    
    return <form className="SearchForm">
        <select name="field" value={filters.field} onChange={e => updateFilters(e)}>
            { filterFields.map(filterOption => <option key={filterOption}>{filterOption}</option>) }
        </select>
        <input type="text" name="query" value={filters.query} onChange={e => updateFilters(e)} />
    </form>
}