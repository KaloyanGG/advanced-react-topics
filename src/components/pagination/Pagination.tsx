import { JSX, memo } from "react";
import "./Pagination.css";

type PaginationProps = {
  pages: number;
  activePage: number;
  onPageChange: (page: number) => void;
};

const Pagination = memo(
  ({ pages, activePage, onPageChange }: PaginationProps) => {
    const calculateRenderedPages = () => {
      const renderedPagesSet = new Set<number>();
      renderedPagesSet.add(1);

      for (let i = activePage - 1; i <= activePage + 1; i++) {
        if (i >= 1 && i <= pages) {
          renderedPagesSet.add(i);
        }
      }

      renderedPagesSet.add(pages);
      return Array.from(renderedPagesSet);
    };

    const addEmptyPages = (pages: number[]) => {
      const result = [];
      for (let i = 0; i < pages.length; i++) {
        result.push(pages[i]);
        if (pages[i + 1] && pages[i] + 1 !== pages[i + 1]) {
          result.push(0);
        }
      }
      return result;
    };

    const renderPagination = () => {
      const renderedPagesArray = calculateRenderedPages();
      const renderedPagesWithEmptyArray = addEmptyPages(renderedPagesArray);

      const divsArray: JSX.Element[] = [];
      renderedPagesWithEmptyArray.forEach((number, idx) => {
        if (number === 0) {
          divsArray.push(
            <div key={`ellipsis-${idx}`} className='page-item ellipsis'>
              ...
            </div>
          );
        } else {
          divsArray.push(
            <div
              key={number}
              className={`page-item number${
                number === activePage ? " active" : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </div>
          );
        }
      });

      return divsArray;
    };
    return <div className='complex-pagination'>{renderPagination()}</div>;
  }
);

export default Pagination;
