import React from 'react';
import PendencyCheckPrint from './PendencyCheckPrint';

// const PrintableComponent = React.forwardRef(({ totalPages }, ref) => {
//   // Method to calculate the total number of pages
//   const getTotalPages = () => {
//     // Logic to determine the total number of pages
//     return totalPages;
//   };

//   React.useImperativeHandle(ref, () => ({
//     getTotalPages
//   }));

//   return (
//     <div>
//       {/* Your printable content */}
//       <PendencyCheckPrint />
//     </div>
//   );
// });
const PrintableComponent = React.forwardRef(({ currentPage, totalPages }, ref) => {

    const getTotalPages = () => {
        // Logic to determine the total number of pages
        return totalPages;
      };
    
      React.useImperativeHandle(ref, () => ({
        getTotalPages
      }));

    return (
        <div ref={ref}>
        <header>
          <p>Page {currentPage} of {totalPages}</p>
        </header>
        <PendencyCheckPrint />
        {/* Your printable content */}
      </div>
    );
  });

export default PrintableComponent;