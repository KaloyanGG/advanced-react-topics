import { act, memo, useEffect, useState } from "react";
import "./SimplePagination.css";
type SimplePaginationProps = {
  pages: number;
  activePage: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
};
const SimplePagination = memo(
  ({
    pages,
    activePage,
    onPreviousClick,
    onNextClick,
  }: SimplePaginationProps) => {
    return (
      <div className='simple-pagination'>
        {activePage !== 1 && (
          <button className='left' onClick={onPreviousClick}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path d='M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z'></path>
            </svg>
          </button>
        )}
        <div className='active-page'>{activePage}</div>
        {activePage !== pages && (
          <button className='right' onClick={onNextClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z'></path>
            </svg>
          </button>
        )}
      </div>
    );
  }
);

export default SimplePagination;
