import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TableContext from '../../context/TableContext';


const TableEditModal = ({ input }) => {
  const { getTables, tables } = useContext(TableContext)

  const [ editInput, setEditInput ] = useState({});
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ editBtnStyle, setEditBtnStyle ] = useState('btn btn-outline btn-primary')

  const handleInputErrors = () => {
    if(parseInt(editInput.minCapacity) > parseInt(editInput.maxCapacity)) {
      setErrorMessage('Min capacity can\'t be bigger than max')
    };

    if(tables.map(element => element.tableNr).includes(editInput.tableNr) && editInput.tableNr !== input.tableNr) {
      setErrorMessage('This table name already exists.')
    };
  };


  useEffect(() => {
    handleInputErrors();

    errorMessage ? setEditBtnStyle("btn btn-disabled") : setEditBtnStyle('btn btn-outline btn-primary');
  }, [editInput, errorMessage]);

  return (
    <>
      <input className="modal-toggle" type="checkbox" id="TableEditModal"/>
      <div className="modal">
        <div className="modal-box">
          <p className="py-4 text-3xl text-center">Edit Table {input.tableNr}</p>
          <div>
            <label className="input-group m-2 flex justify-center">
              <span className='w-36'>Table Name</span>
              <input
                type="text"
                className="input input-bordered w-20"
                onChange={e => {
                  setErrorMessage(null);
                  setEditInput({
                    ...editInput,
                    tableNr: e.target.value
                  });
                }}
              />
            </label>
            <label className="input-group m-2 flex justify-center">
              <span className='w-36'>Min Capacity</span>
              <input
                type="number"
                className="input input-bordered w-20"
                onChange={e => {
                  setErrorMessage(null);
                  setEditInput({
                    ...editInput,
                    minCapacity: e.target.value
                  });
                }}
              />
            </label>
            <label className="input-group m-2 flex justify-center">
              <span className='w-36'>Max Capacity</span>
              <input
                type="text"
                className="input input-bordered w-20"
                onChange={e => {
                  setErrorMessage(null);
                  setEditInput({
                    ...editInput,
                    maxCapacity: e.target.value
                  });
                }}
              />
            </label>
            <div className='text-center text-sm text-red-400'>
              { errorMessage }
            </div>
          </div>

          <div className="modal-action flex justify-center">
            <label className="btn btn-outline btn-accent" htmlFor="TableEditModal">Cancel</label>
            <label
              className="btn btn-outline btn-error"
              htmlFor="TableEditModal"
              onClick={() => axios.delete(`${process.env.REACT_APP_API_URL}/api/business/table/${input.id}`).then(() => getTables())}
            >
              Delete Table
            </label>
            <label
              className={editBtnStyle}
              htmlFor="TableEditModal"
              onClick={() => axios.put(`${process.env.REACT_APP_API_URL}/api/business/table/${input.id}`, editInput).then(() => getTables())}
            >
              Edit
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableEditModal;
