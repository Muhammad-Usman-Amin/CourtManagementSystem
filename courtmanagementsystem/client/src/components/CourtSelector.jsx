import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@material-ui/core';
import { fetchCourts } from '../api/index';

const CourtSelector = ({ selectedCourt, onCourtChange, disabled = false }) => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourts = async () => {
      try {
        setLoading(true);
        const response = await fetchCourts();
        setCourts(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching courts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCourts();
  }, []);

  return (
    <FormControl fullWidth disabled={disabled || loading}>
      <InputLabel>Select Court</InputLabel>
      <Select
        value={selectedCourt || ''}
        onChange={(e) => onCourtChange(e.target.value)}
        label="Select Court"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={24} />
          </MenuItem>
        ) : courts.length > 0 ? (
          courts.map((court) => (
            <MenuItem key={court._id} value={court._id}>
              {court.courtName || court._id} ({court.caseCount} cases)
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No courts available</MenuItem>
        )}
      </Select>
      {error && <p style={{ color: 'red', fontSize: '12px' }}>Error: {error}</p>}
    </FormControl>
  );
};

export default CourtSelector;
