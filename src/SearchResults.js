// src/components/SearchResults.js

import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SearchResults({ searchResults }) {
  // Remove duplicates based on the `id`
  const uniqueResults = searchResults.reduce((acc, current) => {
    const isDuplicate = acc.find(item => item.id === current.id);
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <div>
      <h2>Search Results</h2>
      <Row>
        {uniqueResults.map((result) => (
          <Col key={result.id} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={result.profile_path||result.poster_path} alt={result.name || result.title} />
              <Card.Body>
                <Card.Title>{result.title || result.name}</Card.Title>
                <Card.Text>
                  {result.type === 'movie' ? result.overview : result.biography}
                </Card.Text>
                <Link to={`/${result.type}/${result.id}`}>
                  <Card.Link>View Details</Card.Link>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SearchResults;
