import './SearchForm.css';

export default function SearchForm({ updateFilters, filterFields, filters }) {
    return <form className="SearchForm">
        <select name="field" value={filters.field} onChange={e => updateFilters(e)}>
            { filterFields.map(filterOption => <option key={filterOption}>{filterOption}</option>) }
        </select>
        <input type="text" name="query" value={filters.query} onChange={e => updateFilters(e)} />
    </form>
}