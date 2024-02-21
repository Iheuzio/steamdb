export default function SearchResults({ results }) {
    return <div>
        { results.map(result => <div>{ result.game }</div>)}
    </div>
}