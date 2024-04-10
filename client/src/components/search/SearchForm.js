import './SearchForm.css';

export default function SearchForm({ updateFilters, filterFields, filterFieldsToDisplay, filters, handleSubmit }) {
    return (
        <form className="SearchForm" onSubmit={e => handleSubmit(e, filters)}>
            <select name="field" value={filters.field} onChange={e => updateFilters(e)}>
                {filterFields.map((filterOption, i) => (
                    <option key={filterOption} value={filterOption}>{filterFieldsToDisplay[i]}</option>
                ))}
            </select>
            {filters.field === "peak" ? (
                <SpecialSearchForm
                    filters={filters}
                    updateFilters={updateFilters}
                    options={['less than', 'equal to', 'more than']}
                    inputType="number" />
            ) : filters.field === "release_date" ? (
                <SpecialSearchForm
                    filters={filters}
                    updateFilters={updateFilters}
                    options={['before', 'on', 'after']}
                    inputType="date"
                    defaultValue={'2024-03-24'}/>
            ) : (
                <StringSearchForm filters={filters} updateFilters={updateFilters} />
            )}
            <button type="submit">Search</button>
        </form>
    );
}

function StringSearchForm({ filters, updateFilters }) {
    return <input type="text" name="query" value={filters.query} onChange={e => updateFilters(e)} />
}

function SpecialSearchForm({ filters, updateFilters, options, inputType }) {
    const optionNames = ['lt', 'eq', 'gt'];

    return <>
        <select name="operator" value={filters.operator} onChange={e => updateFilters(e)} >
            {options.map((filterOption, i) => (
                <option key={filterOption} value={optionNames[i]}>{filterOption}</option>
            ))}
        </select>
        <input type={inputType} name="query" value={filters.query} onChange={e => updateFilters(e)} />
    </>
}