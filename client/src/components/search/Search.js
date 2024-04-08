import './Search.css';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

export default function Search({ results, filters, setFilters, filterFields, updateFilters, handleSubmit, setPage, error }) {
    return <div className="Search">
        <SearchForm updateFilters={updateFilters}
            filters={filters}
            setFilters={setFilters}
            filterFields={filterFields}
            handleSubmit={handleSubmit} />
        {error && <div className="error">{error}</div>}
        <SearchResults results={results} setPage={setPage} />
    </div>
}