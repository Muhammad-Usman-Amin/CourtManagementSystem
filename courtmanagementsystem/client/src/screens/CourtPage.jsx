import React from 'react';
import { useParams } from 'react-router-dom';

const CourtPage = () => {
    const { courtId } = useParams();

    // Use the courtId to fetch court details or perform other actions

    return (
        <div>
            <h2>Court Details</h2>
            <p>Court ID: {courtId}</p>
            {/* Add more court-specific content and functionality */}
        </div>
    );
};

export default CourtPage;
