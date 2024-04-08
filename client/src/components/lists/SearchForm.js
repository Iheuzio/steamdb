import './SearchForm.css';

export default function SearchForm({ updateFilters, filterFields, filters }) {
    return <form className="SearchFormR">
        <select className="textG" name="field" value={filters.field} onChange={e => updateFilters(e)}>
            { filterFields.map(filterOption => <option key={filterOption}>{filterOption}</option>) }
        </select>
        <input className="inputG" type="text" name="query" value={filters.query} onChange={e => updateFilters(e)} />
    </form>
}