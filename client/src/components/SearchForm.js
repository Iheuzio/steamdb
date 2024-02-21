import './SearchForm.css';
import { useState } from "react";

export default function SearchForm({ handleSubmit }) {
    const filterFields = ['game', 'publisher', 'developer'];
    const [filters, setFilters] = useState({ field: filterFields[0], query: ''});
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFilters(values => ({...values, [name]: value}))
      }

    return <form className="SearchForm" onSubmit={e => handleSubmit(e, filters)} >
        <select name="field" value={filters.field} onChange={e => handleChange(e)}>
            { filterFields.map(filterOption => <option key={filterOption}>{filterOption}</option>) }
        </select>
        <input type="text" name="query" value={filters.query} onChange={e => handleChange(e)} />
        <button type="submit"><img src="https://cdn-icons-png.flaticon.com/512/71/71403.png" alt="Search"/></button>
    </form>
}