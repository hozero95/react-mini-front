import {productsColumns, productsField, productsRows} from "./data/productsData";
import {getProductsAll} from "../apis/productsApi";
import {usersColumns, usersField, usersRows} from "./data/usersData";
import {deleteUsers, getUsersAll, updateUsers} from "../apis/usersApi";
import {setPaging} from "./paging";

/*
    Sorting
    - 첫 번째 인자: 정렬을 위한 컬럼의 이름
    - 두 번째 인자: 정렬방식
    - 세 번째 인자: 대소문자 구분 유형

    gridView.sortingOptions.enabled = false; // 모든컬럼 정렬 불가
    gridView.columnByName("Column").sortable = false; // 특정컬럼 정렬 불가

    - Sort Style 지정
    gridView.sortingOptions.style = "none"; // 정렬하지 않습니다.
    gridView.sortingOptions.style = "exclusive"; // 마지막으로 클릭한 컬럼으로 정렬합니다.
    gridView.sortingOptions.style = "inclusive"; // 처음으로 클릭한 컬럼을 우선으로 순서대로 정렬합니다.
    gridView.sortingOptions.style = "reverse"; // 마지막으로 클릭한 컬럼을 우선으로 순서대로 정렬합니다.
 */

/*
    Grouping
    - 그룹핑은 RealGrid2의 강력한 기능중 하나로 사용자의 필요에 맞게 데이터를 묶어주는 시각화 기능입니다.
    - 사용자가 직접 그룹핑할 컬럼을 지정하도록 하려면 Group Panel을 보이도록 옵션을 수정해야 합니다.
    gridView.setGroupPanel({visible: true});

    - 프로그램 조작
    - 첫 번째 인자: 그룹잡을 컬럼 이름 배열
    - 두 번째 인자: 정렬 여부
    - 세 번째 인자: 정렬시 정렬 방법
    gridView.groupBy(['Gender'], true, 'ascending');
 */

/*
    Filtering
    - 필터링은 DataProvider의 데이터 중 조건에 맞는 데이터만 표시하는 기능입니다.

    사용자 수준
    - GridView가 필터링 가능하도록 FilteringOptions 옵션을 설정해야 합니다.
    - FilteringOptions의 enabled는 기본값이 true이며 setFilterOptions() 함수로 설정을 변경할 수 있습니다.
    gridView.setFilteringOptions({enabled: true});
    - 자동 필터링
    gridView.setColumnProperty("Column", "autoFilter", true);

    데이터 수준
    - 데이터 수준에서 필터를 조작하기 위해서는 DataProvider의 setFilters() 함수로 데이터를 채우기 전 필터를 지정할 수 있습니다.
    - 즉, 데이터 수준의 필터는 DataProvider에 데이터를 채우기 전에 조건을 설정해 두고 데이터를 채우는 과정에서 필터의 조건에 적합한 데이터만 채우게 되는 원리입니다.
    provider.setFilters({criteria: "value['Column']='data'"});
 */

/* ProductList Grid */
export const setProductsGrid = async (provider, gridView) => {
    // Setting
    provider.setFields(productsField);
    gridView.setColumns(productsColumns);
    let productsData = await getProductsAll();
    if (productsData.length <= 0) {
        provider.setRows(productsRows);
    } else {
        provider.setRows(productsData);
    }

    // Sorting
    gridView.orderBy(
        ['productUnum'],
        ['ascending'],
        ['insensitive']
    );

    // Grouping
    gridView.setGroupPanel({visible: true});

    // insert setting
    gridView.setEditOptions({
        insertable: true,
        appendable: true
    });
};

/* UserList Grid */
export const setUsersGrid = async (provider, gridView, token) => {
    // Setting
    provider.setFields(usersField);
    gridView.setColumns(usersColumns);
    let usersData = await getUsersAll(token);
    if (usersData.length <= 0) {
        provider.setRows(usersRows);
    } else {
        provider.setRows(usersData);
    }

    setPaging(provider, gridView);

    // Sorting
    gridView.orderBy(
        ['userUnum'],
        ['ascending'],
        ['insensitive']
    );

    // Grouping
    gridView.setGroupPanel({visible: true});

    // 푸터 설정
    gridView.setFooters({
        visible: false
    });

    // 컬럼 편집 설정
    gridView.columnByName('userUnum').editable = false;
    gridView.columnByName('userId').editable = false;
    gridView.setEditOptions({
        deletable: false
    });

    // 상태바 설정
    gridView.setStateBar({
        visible: false
    });

    // 체크바 설정
    gridView.setCheckBar({
        visible: false
    });

    // 컨텍스트 설정
    gridView.setContextMenu([
        {
            label: "delete"
        },
        {
            label: "ExcelExport"
        }
    ]);
    // grid: GridBase 컨트롤
    // item: 클릭된 메뉴 항목의 정보
    // clickData: 클릭된 아이템의 정보
    gridView.onContextMenuItemClicked = await function (grid, item, clickData) {
        switch (item.label) {
            case "delete":
                console.log(gridView.getCurrent().dataRow);
                deleteUsers(token, provider.getValue(clickData.dataRow, 'userUnum'));
                provider.removeRow(gridView.getCurrent().dataRow);
                break;
            case "ExcelExport":
                grid.exportGrid({
                    type: "excel",
                    target: "local"
                });
                break;
            default:
                break;
        }
    };

    // 선택 스타일 설정
    gridView.displayOptions.selectionStyle = "rows";

    // 수정 이벤트
    // grid: GridBase 컨트롤
    // itemIndex: 편집 중인 행의 순서
    // row: 편집 중인 행의 고유 번호
    // field: 방금 편집된 필드의 인덱스
    gridView.onCellEdited = await function (grid, itemIndex, row, field) {
        var result = true;
        var reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const updateData = gridView.getValues(itemIndex);

        if (!reg.test(updateData.email)) {
            alert('이메일 형식에 맞지 않습니다.');
            result = false;
        }
        if (!updateData.tel.includes('-')) {
            var number = updateData.tel.replace(/[^0-9]/g, "");
            var phone = "";
            if (number.length < 4) {
                phone = number;
            } else if (number.length < 7) {
                phone += number.substr(0, 3);
                phone += "-";
                phone += number.substr(3);
            } else if (number.length < 11) {
                phone += number.substr(0, 3);
                phone += "-";
                phone += number.substr(3, 3);
                phone += "-";
                phone += number.substr(6);
            } else {
                phone += number.substr(0, 3);
                phone += "-";
                phone += number.substr(3, 4);
                phone += "-";
                phone += number.substr(7);
            }
            updateData.tel = phone;
        }
        if (result) {
            updateUsers(token, updateData);
        }
    }

    // 유효성 검사
    gridView.onValidateColumn = function (grid, column, inserting, value) {
        switch (column.fieldName) {
            case "email":
                var reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
                if (!reg.test(value)) {
                    return {
                        level: 'error',
                        message: '이메일 형식에 맞지 않습니다.'
                    }
                }
                break;
            default:
                break;
        }
    }
};