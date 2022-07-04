import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page, pdfjs } from 'react-pdf';
import LoadingIndicator from '../../../components/LoadingIndicator';
import SEO from '../../../components/seo';
import AppContext from '../../../contexts/AppContext';
import { GET_TERMS_URL } from '../../../graphql/queries';

const Conditions = () => {
  // TODO - delete if terms fix works
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  const { restaurantId } = useContext(AppContext);
  const { t } = useTranslation();
  const { data, loading } = useQuery(GET_TERMS_URL, {
    variables: {
      restaurantId,
    },
  });
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (loading) return <LoadingIndicator />;

  return (
    <>
      <SEO title={t('Blipp')} />
      <h2 style={{ marginLeft: 8 }}>
        {t('PurchaseConditions')}
      </h2>
      <div>
        <Document
          file={data.termsUrls[0].url}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index++}`}
              pageNumber={index++}
            />
          ))}
        </Document>
      </div>
    </>
  );
};

export default Conditions;
