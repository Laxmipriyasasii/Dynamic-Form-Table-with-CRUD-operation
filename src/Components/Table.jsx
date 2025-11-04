import React, { useState, useEffect } from "react";
import '../Styles/Table.css';

function Table() {
  
  const [customerData, setCustomerData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const stored = localStorage.getItem("AllFormData");

    console.log(stored)
    const defaultData = [

      { id: 1, Name: "leo", Age: "45", Email: "leo@gmail.com", ContactNumber: "4567896755", Gender: "Male", Address: "NO:289,Thiru-vi-ka srt,cpt" },

      { id: 2, Name: "pri", Age: "23", Email: "l@gmail.com", ContactNumber: "8754311118", Gender: "Female", Address: "NO:289,Thiru-vi-ka srt,cpt" },

      { id: 3, Name: "priya", Age: "34", Email: "l@gmail.com", ContactNumber: "1234567890", Gender: "Female", Address: "NO:289,Thiru-vi-ka srt,cpt" },

      { id: 4, Name: "ini", Age: "2", Email: "i@gmail.com", ContactNumber: "1235678876", Gender: "Female", Address: "NO:289,Thiru-vi-ka srt,cpt" }
    ];
    //  localStorage.setItem('AllFormData', JSON.stringify(defaultData));
    setCustomerData(stored ? JSON.parse(stored) : defaultData);
  }, []);
  useEffect(() => {
    // console.log("without debouncedQuery", query);
    const timer = setTimeout(() => {

      setDebouncedQuery(query);
      // console.log("debouncedQuery updated after delay:", query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);


  const handleEdit = (id) => {
    const row = customerData.find((item) => item.id === id);
    setEditId(id);
    setEditData({ ...row });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };
  const handleSave = () => {
    const updatedData = customerData.map((item) =>
      item.id === editId ? editData : item
    );
    setCustomerData(updatedData);
    localStorage.setItem("AllFormData", JSON.stringify(updatedData));
    setEditId(null);
    setEditData({});
  };
  function Delete(id) {
    const AllFormData = JSON.parse(localStorage.getItem('AllFormData'))
    if (window.confirm(`Are you sure you want to delete customer with ID ${id}?`)) {

      const filtered_data = AllFormData.filter(items => items.id !== id);
      localStorage.setItem('AllFormData', JSON.stringify(filtered_data));
      setCustomerData(filtered_data)

    }

  }
  const filteredData = customerData.filter((user) => {
    const lowerQuery = debouncedQuery.toLowerCase();


    const name = user.Name?.toLowerCase() || "";
    const email = user.Email?.toLowerCase() || "";


    return name.includes(lowerQuery) || email.includes(lowerQuery);
  });

  return (
    <> <div className="container mt-5">

      <table class="table-data table" id="myTable">
        <thead>
          <tr>
            <th colspan="6" className="text-center fs-3 table-head">
              Customer Details
            </th>
            <th colspan="2">
              <input type="text" class="search form-control float-end" id="searchInput" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" style={{ width: "40%" }} />


            </th>
          </tr>

          <tr >
            <th className="table-head text-center">ID</th>
            <th className="table-head text-center">
              <div class="wrapper">
                <div class="fname">Name</div>

              </div>
            </th>



            <th className="table-head text-center"><div class="wrapper">
              <div class="agee">Age</div>

            </div></th>
            <th className="table-head text-center"><div class="wrapper">
              <div class="email">Email</div>

            </div></th>
            <th className="table-head text-center"><div class="wrapper">
              <div class="contact">Contact</div>

            </div></th>
            <th className="table-head text-center"><div class="wrapper">
              <div class="gender">Gender</div>

            </div></th>
            <th className="table-head text-center"><div class="wrapper">
              <div class="address">Address</div>

            </div></th>
            <th className="table-head text-center"><div class="wrapper">
              <div class="action">Action</div>

            </div></th>


          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) =>

            <tr key={index}>
              <td className="text-center">{data.id}</td>
              {editId === data.id ? (
                <>
                  <td className="table-data"><input name="Name" value={editData.Name} onChange={handleChange} style={{ width: "100%" }} /></td>
                  <td className="table-data"><input name="Age" value={editData.Age} onChange={handleChange} style={{ width: "100%" }} /></td>
                  <td><input name="Email" value={editData.Email} onChange={handleChange} style={{ width: "100%" }} /></td>
                  <td className="table-cn"><input name="ContactNumber" value={editData.ContactNumber} onChange={handleChange} style={{ width: "100%" }} /></td>
                  <td className="table-g"><input name="Gender" value={editData.Gender} onChange={handleChange} style={{ width: "100%" }} /></td>
                  <td><input name="Address" value={editData.Address} onChange={handleChange} style={{ width: "100%" }} /></td>
                </>
              ) : (
                <>
                  <td className="text-center text-capitalize">{data.Name}</td>
                  <td className="text-center">{data.Age}</td>
                  <td className="text-center">{data.Email}</td>
                  <td className="text-center">{data.ContactNumber}</td>
                  <td className="text-center text-capitalize">{data.Gender}</td>
                  <td className="text-center text-capitalize">{data.Address}</td>
                </>
              )}

              <td className="text-center " style={{ width: "10%" }}>
                {editId === data.id ? (
                  <>
                    <div className="d-flex">
                      <button className="material-symbols-outlined icons" onClick={handleSave}>check</button>
                      <button className="material-symbols-outlined delete" onClick={handleCancel}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <button className="material-symbols-outlined icons" onClick={() => handleEdit(data.id)}>Edit</button>
                    <button className="material-symbols-outlined delete" onClick={() => Delete(data.id)}>Delete</button>
                  </>
                )}

              </td>
            </tr>

          )}
        </tbody>
      </table>


    </div>

    </>
  )
}
export default Table;