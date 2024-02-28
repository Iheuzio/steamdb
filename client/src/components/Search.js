import './Search.css';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

export default function Search({ results, filters, setFilters, filterFields, updateFilters }) {
    return <div className="Search">
        <SearchForm updateFilters={updateFilters}
            filters={filters}
            setFilters={setFilters}
            filterFields={filterFields} />
        <SearchResults results={results} />
    </div>
}