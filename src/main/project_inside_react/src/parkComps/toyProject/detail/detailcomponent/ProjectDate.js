import React from 'react';

function ProjectDate({ date }) {
    const formattedDate = new Date(date);

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDateString = formattedDate.toLocaleDateString('en-US', options);

    return (
        <span>{formattedDateString}</span>
    );
}

export default ProjectDate;