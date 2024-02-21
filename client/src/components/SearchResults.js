export default function SearchResults({ results }) {
    return <div>
        { results.map(result => <div key={result.id}>{ result.game }</div>)}
    </div>
}