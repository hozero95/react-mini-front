export const setPaging = (gridView) => {
    let page = -1;
    let totalPage = -1;

    gridView.setPaging(true, 10);

    page = gridView.getPage();
    totalPage = gridView.getPageCount();

    document.getElementById("current-page-view").innerHTML = page + 1;
    document.getElementById("total-page-view").innerHTML = totalPage;

    gridView.onPageChanged = function (grid, page) {
        document.getElementById("current-page-view").innerHTML = page + 1;
    };

    gridView.onPageCountChanged = function (grid, pageCount) {
        document.getElementById("total-page-view").innerHTML = totalPage;
    };
}