export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
export function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    if(array.length <= 0 || !Array.isArray(array)) return array;

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

export function filterRowsByValue (rows, value) {
  if(!value) return rows;
  if(!rows) return {url: "Cant find anythin"}
  value = value.toString().toLowerCase().trim()
  if(rows.length > 0)
    return rows.filter(row => checkIfRowContainsSearchValue(row, value))
}



const checkIfRowContainsSearchValue = (row, value) => {
  try {
      if(!Object.prototype.toString.call(row) === "[object Object]")
      return false
    if(row.hasOwnProperty("url")){
      if(row.url.toString().toLowerCase().trim().match(value))
          return true;
    }
    if(row.hasOwnProperty("theme")){
      if(row.theme.toString().toLowerCase().trim().match(value))
        return true;
    }
    if(row.hasOwnProperty("product")){
      if(row.product.toString().toLowerCase().trim().match(value))
        return true;
    }
  } catch (error) {
    return false
  }
  
  return false
}