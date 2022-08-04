import { useContext, useState, useEffect } from 'react';
import TableContext from '../context/TableContext';
import axios from 'axios';

import TableEditModal from './Modals/TableEditModal';

const TableSettings = () => {
  const { tables, getTables } = useContext(TableContext);

  const initialInputValues = {
    tableNr: '',
    minCapacity: '',
    maxCapacity: '',
  };

  const [ tablesArr, setTablesArr] = useState([]);
  const [ newTable, setNewTable ] = useState({});
  const [ inputValues, setInputValues] = useState(initialInputValues);
  const [ errorMessage, setErrorMessage] = useState(null);
  const [ addButtonStyle, setAddButtonStyle ] = useState('btn btn-disabled');
  const [ editState, setEditState ] = useState({});

  const handleSubmit = () => {
    setTimeout(() => {
      axios
        .post('http://localhost:5000/api/business/table/', newTable)
        .then(() => getTables())
        .then(() => setTablesArr(tables))
        .then(() => setInputValues(initialInputValues))
        .then(() => setNewTable(initialInputValues))
        .then(() => setErrorMessage(null))
    }, 500);
  };

  useEffect(() => {
    setTablesArr(tables);

    // Verify that minCapacity is not bigger than maxCapacity
    if(parseInt(newTable.minCapacity) > parseInt(newTable.maxCapacity)){
      setErrorMessage('Min capacity can\'t be bigger than max capacity.');
    };

    // Verify that the table name doesn't already exist
    newTable.tableNr &&
    tables.map(element => element.tableNr).includes(newTable.tableNr) &&
    setErrorMessage('Table name already exists.');


    // Change button style if there's no error
    if(!errorMessage && newTable?.tableNr && newTable?.minCapacity && newTable?.maxCapacity) {
      setAddButtonStyle('btn btn-outline btn-secondary');
    } else {
      setAddButtonStyle('btn btn-disabled');
    };

  }, [tables, errorMessage, newTable, getTables]);

  return (
    <div className='flex justify-center m-5'>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Min Capacity</th>
              <th>Max Capacity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {tablesArr.sort((a,b) => a.tableNr - b.tableNr).map(element => {
            return(
              <tr key={element.id}>
                <td className='text-center'>{element.tableNr}</td>
                <td className='text-center'>{element.minCapacity}</td>
                <td className='text-center'>{element.maxCapacity}</td>
                <td className='text-center'>
                  <label
                    className='btn btn-outline btn-error'
                    htmlFor='TableEditModal'
                    onClick={() => setEditState({
                      id: element.id,
                      tableNr: element.tableNr,
                      minCapacity: element.minCapacity,
                      maxCapacity: element.maxCapacity,
                    })}
                  >
                    Edit
                  </label>
                </td>
              </tr>
            )

          })}

            <tr>
              <td className='text-center'>
                <input
                type="text"
                value={inputValues.tableNr}
                className="input input-bordered w-14"
                onChange={e => {
                  setErrorMessage(null);
                  setNewTable({...newTable, tableNr: e.target.value});
                  setInputValues({...inputValues, tableNr: e.target.value});
                }}
              />
              </td>
              <td className='text-center'>
                <input
                type="text"
                value={inputValues.minCapacity}
                className="input input-bordered w-14"
                onChange={e => {
                  setErrorMessage(null);
                  setNewTable({...newTable, minCapacity: e.target.value});
                  setInputValues({...inputValues, minCapacity: e.target.value});
                  }
                }
              />
              </td>
              <td className='text-center'>
                <input
                type="text"
                value={inputValues.maxCapacity}
                className="input input-bordered w-14"
                onChange={e => {
                  setErrorMessage(null);
                  setNewTable({...newTable, maxCapacity: e.target.value});
                  setInputValues({...inputValues, maxCapacity: e.target.value});
                  }
                }
              />
              </td>
              <td className='text-center'>
                <div className={addButtonStyle} onClick={() => handleSubmit()}>Add</div>
              </td>
            </tr>
            <tr>
              <td colSpan='4' className='text-sm text-red-400 text-center'>
                { errorMessage }
              </td>
            </tr>
          </tbody>
        </table>
        <div>
        <TableEditModal input={editState}/>
        </div>
      </div>
    </div>
  );
};


export default TableSettings;
