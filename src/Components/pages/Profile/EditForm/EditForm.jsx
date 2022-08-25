import { useDispatch } from "react-redux";
import { updateUser } from "../../../../features/userBis";
import { useState, useEffect } from "react";

function EditForm({ user, authToken }) {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [newName, setNewName] = useState({
    firstName: "",
    lastName: "",
  });

  const dispatch = useDispatch();

  function handleEdit() {
    setEditIsOpen(true);
  }

  function handleCancel() {
    setEditIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(newName, authToken));
    setEditIsOpen(false);
  }

  useEffect(() => {
    if (user) {
      setNewName({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [user]);

  if (!editIsOpen) {
    return (
      <div className="header-data">
        <h1>
          Welcome back
          <br />
          {user.firstName} {user.lastName}!
        </h1>
        <button className="edit-button" onClick={handleEdit}>
          Edit Name
        </button>
      </div>
    );
  }
  if (editIsOpen) {
    return (
      <div className="form-wrapper">
        <h1>Welcome back</h1>
        <form className="name-form" onSubmit={handleSubmit}>
          <input
            className="name-input name-input--first"
            type="text"
            id="firstname"
            placeholder={user.firstName}
            onChange={(e) =>
              setNewName({ ...newName, firstName: e.target.value })
            }
          />
          <input
            className="name-input name-input--last"
            type="text"
            id="firstname"
            placeholder={user.lastName}
            onChange={(e) =>
              setNewName({ ...newName, lastName: e.target.value })
            }
          />
          <button className="edit-button name-form-submit-btn" type="submit">
            Save
          </button>
          <button className="edit-button cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default EditForm;
