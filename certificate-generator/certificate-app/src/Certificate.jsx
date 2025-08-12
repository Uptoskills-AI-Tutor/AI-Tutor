import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Certificate.css';

const Certificate = ({ name, course, startDate, endDate }) => {
  const certRef = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(certRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('portrait', 'pt', [canvas.width, canvas.height]);
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${name}_certificate.pdf`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div ref={certRef} className="certificate">
        <div className="name">{name}</div>
        <div className="details">for successfully completing the <br />
         <b>"Advanced Web Development Bootcamp"</b> <br />
         conducted from <b>{formatDate(startDate)}</b> to <b>{formatDate(endDate)}</b>. <br />
         This certificate acknowledges the dedication and consistent effort<br /> demonstrated
         throughout the course. 
          Your performance has been <br />exemplary, and your achievement reflects a strong <br />
          commitment to learning and growth.

          
        </div>
      </div>
      <button onClick={downloadPDF} className="download-btn">
        Download Certificate
      </button>
    </div>
  );
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default Certificate;
