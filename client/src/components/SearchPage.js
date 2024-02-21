import { games } from './games';
import SearchForm from './SearchForm';
import { useState } from 'react';

export default function SearchPage() {
    const handleSubmit = async () => {
       
    }

    return <div>
        <SearchForm handleSubmit={handleSubmit} />
        
    </div>
}