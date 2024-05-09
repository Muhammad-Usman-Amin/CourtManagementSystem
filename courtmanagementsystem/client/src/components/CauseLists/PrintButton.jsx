import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableComponent from './PrintableComponent';

const PrintButton = () => {
  const componentRef = useRef(null);
  const [totalPages, setTotalPages] = useState(0);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: async () => {
      // Ensure that componentRef.current is not null before calling getTotalPages
        if (componentRef.current && typeof componentRef.current.getTotalPages === 'function') {
            const total =  await componentRef.current.getTotalPages();
            setTotalPages(total);
        } else {
            console.error("Unable to get total pages: componentRef or getTotalPages is not available");
        }
    }
  });

  
// console.log(componentRef.current);
  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <PrintableComponent ref={componentRef} totalPages={totalPages} />
    </div>
  );
};

export default PrintButton;
