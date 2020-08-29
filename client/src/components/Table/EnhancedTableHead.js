import React from 'react'
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles } from '@material-ui/core/styles';

function EnhancedTableHead(props) {
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: "#E1E1E1",
            color: "#737373"
        },
        body: {
            fontSize: 14
        },
      }))(TableCell);
    const { headCells, onSelectAllClick, order, orderBy,
            numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    const PurpuleCheckBox = withStyles({
      root: {
        color: "#7e57c2",
        '&$checked': {
          color: "#512da8",
        },
      },
      checked: {},
    })((props) => <Checkbox color="default" {...props} />);
    return (
      <TableHead>
        <TableRow>
          <StyledTableCell padding="checkbox">
             <PurpuleCheckBox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            /> 
          </StyledTableCell>
          <StyledTableCell />
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </TableRow> 
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  

export default EnhancedTableHead