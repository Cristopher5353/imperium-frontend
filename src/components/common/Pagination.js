import React from 'react';

export const Pagination = ({page, totalPages, handleChangeSetPage}) => {
    return (
        <>
            <div className="d-flex justify-content-between">
        <div>
          {(totalPages === 0 ?page :page + 1) + " de " + totalPages + " páginas"}
        </div>
        <nav aria-label="Page navigation example border">
          <ul class="pagination justify-content-end">
            {page === 0 ? (
              <li class="page-item disabled me-2">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
            ) : (
              <li class="page-item ative me-2">
                <a
                  class="page-link active"
                  href="#"
                  aria-label="Previous"
                  onClick={() => handleChangeSetPage(false)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
            )}
            {page + 1 === totalPages ? (
              <li class="page-item disabled">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => handleChangeSetPage(true)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            ) : (
              <li class="page-item active">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => handleChangeSetPage(true)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
        </>
    )
}