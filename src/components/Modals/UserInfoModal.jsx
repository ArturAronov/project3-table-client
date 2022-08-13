const UserInfoModal = ({ input }) => {
  const {
    firstName,
    lastName,
    email,
    phone
  } = input;

  return (
    <>
      <input className="modal-toggle" type="checkbox" id="UserInfoModal" />
      <div className="modal">
        <div className="modal-box">
          <div className='text-center'>
            <span className="py-4 text-3xl text-center">
              Guest Information
            </span>
            <label
              htmlFor="UserInfoModal"
              className="btn btn-md btn-circle absolute right-4 top-4">
              ✕
            </label>
          </div>
          <div className=' flex justify-center'>
            <div className="stats stats-vertical shadow">
              <div className="stat">
                <div className="stat-title text-center">Name</div>
                <div className="text-2xl text-center">{firstName} {lastName}</div>
              </div>
              {email && <div className="stat">
                <div className="stat-title text-center">Email</div>
                <div className="text-2xl text-center">{email}</div>
              </div>}
              {phone && <div className="stat">
                <div className="stat-title text-center">Phone</div>
                <div className="text-2xl text-center">{phone}</div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfoModal;
