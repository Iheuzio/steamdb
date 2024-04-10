import './Search.css';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

export default function Search({ results, filters, setFilters, filterFields, filterFieldsToDisplay, updateFilters, handleSubmit, setPage }) {
    return <div className="Search">
        <SearchForm updateFilters={updateFilters}
            filters={filters}
            setFilters={setFilters}
            filterFields={filterFields}
            filterFieldsToDisplay={filterFieldsToDisplay}
            handleSubmit={handleSubmit} />
        <SearchResults results={results} setPage={setPage} />
    </div>
}