import { JSX, memo } from "react";
import "./Pagination.css";
type PaginationProps = {
  pages: number;
  activePage: number;
  onPageChange: (page: number) => void;
};
const Pagination = memo(
  ({ pages, activePage, onPageChange }: PaginationProps) => {
    const renderPagination = () => {
      const paginationItems: JSX.Element[] = [];
      if (pages <= 5) {
        for (let i = 1; i <= pages; i++) {
          paginationItems.push(
            <div
              key={i}
              className={`page-item ${i === activePage ? "active" : ""}`}
              onClick={() => onPageChange(i)}
            >
              {i}
            </div>
          );
        }
      } else {
        paginationItems.push(
          <div
            key={1}
            className={`page-item ${1 === activePage ? "active" : ""}`}
            onClick={() => onPageChange(1)}
          >
            {1}
          </div>
        );

        for (let i = activePage - 1; i <= activePage + 1; i++) {
          if (i !== 1 && i !== pages && i !== 0 && i !== pages + 1) {
            paginationItems.push(
              <div
                key={i}
                className={`page-item ${i === activePage ? "active" : ""}`}
                onClick={() => onPageChange(i)}
              >
                {i}
              </div>
            );
          }
        }

        paginationItems.push(
          <div
            key={pages}
            className={`page-item ${pages === activePage ? "active" : ""}`}
            onClick={() => onPageChange(pages)}
          >
            {pages}
          </div>
        );
      }
      for (let i = 0; i < paginationItems.length; i++) {
        if (
          i < paginationItems.length - 1 &&
          Number(paginationItems[i].key) + 1 !==
            Number(paginationItems[i + 1].key)
        ) {
          paginationItems.splice(
            i + 1,
            0,
            <div className='page-item'>...</div>
          );
          i++;
        }
      }
      return paginationItems;
    };
    return <div className='pagination-container'>{renderPagination()}</div>;
  }
);

export default Pagination;
