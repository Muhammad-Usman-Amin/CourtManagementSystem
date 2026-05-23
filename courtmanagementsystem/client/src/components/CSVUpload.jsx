import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';

import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  // Alert,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { uploadCasesCSV, extractCourtCodeFromFilename } from '../api/index';

const CSVUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [courtCode, setCourtCode] = useState('');
  const [courtName, setCourtName] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      
      // Auto-extract court code from filename
      const filename = selectedFile.name;
      // Simple extraction: take everything before "March", "April", etc.
      const match = filename.match(/^([A-Za-z0-9\s]+?)\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)/i);
      if (match) {
        const extracted = match[1].trim();
        setCourtCode(extracted);
      } else {
        setCourtCode(filename.split('.')[0]);
      }
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setError('Please select a CSV file');
        return;
      }
      if (!courtCode) {
        setError('Please enter a court code');
        return;
      }
      if (!courtName) {
        setError('Please enter a court name');
        return;
      }

      setLoading(true);
      setError(null);
      const response = await uploadCasesCSV(file, courtCode, courtName);
      
      setUploadResult(response.data);
      setFile(null);
      setCourtCode('');
      setCourtName('');
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload Court Cases CSV
        </Typography>
        
        <Box style={{ marginBottom: '15px' }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={loading}
            style={{ marginBottom: '10px' }}
          />
          {file && <Typography variant="body2" color="textSecondary">{file.name}</Typography>}
        </Box>

        <TextField
          fullWidth
          label="Court Code"
          value={courtCode}
          onChange={(e) => setCourtCode(e.target.value)}
          disabled={loading}
          margin="normal"
          placeholder="e.g., DsJ, ADsJ"
          helperText="Extracted from filename or enter manually"
        />

        <TextField
          fullWidth
          label="Court Name"
          value={courtName}
          onChange={(e) => setCourtName(e.target.value)}
          disabled={loading}
          margin="normal"
          placeholder="e.g., District & Sessions Judge, Additional District & Sessions Judge"
        />

        {error && (
          <Alert severity="error" style={{ marginTop: '10px' }}>
            {error}
          </Alert>
        )}

        {uploadResult && (
          <Box style={{ marginTop: '15px' }}>
            <Alert severity={uploadResult.success ? 'success' : 'warning'}>
              {uploadResult.message}
            </Alert>
            
            <Box style={{ marginTop: '10px' }}>
              <Typography variant="body2">
                <strong>Total Rows:</strong> {uploadResult.total}
              </Typography>
              <Typography variant="body2" style={{ color: 'green' }}>
                <strong>Imported:</strong> {uploadResult.imported}
              </Typography>
              <Typography variant="body2" style={{ color: 'red' }}>
                <strong>Failed:</strong> {uploadResult.failed}
              </Typography>
            </Box>

            {uploadResult.failedRows && uploadResult.failedRows.length > 0 && (
              <Box style={{ marginTop: '15px' }}>
                <Typography variant="subtitle2">Failed Rows (showing first 10):</Typography>
                <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell>Row #</TableCell>
                        <TableCell>Case No</TableCell>
                        <TableCell>Error</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {uploadResult.failedRows.map((failedRow, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{failedRow.rowNumber}</TableCell>
                          <TableCell>{failedRow.data?.['Case No'] || '-'}</TableCell>
                          <TableCell style={{ fontSize: '12px' }}>
                            {Array.isArray(failedRow.errors)
                              ? failedRow.errors.join(', ')
                              : failedRow.error}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        )}
      </CardContent>

      <CardActions>
        <Button
          onClick={handleUpload}
          disabled={!file || !courtCode || !courtName || loading}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={24} /> : 'Upload CSV'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CSVUpload;
