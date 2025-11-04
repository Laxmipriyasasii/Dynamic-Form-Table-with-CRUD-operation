import React, { useState } from "react";
import data from '../db.json';
import '../Styles/Form.css'
import Table from "./Table";

function Form() {
    const [formData, setFormData] = useState({});
   const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    function getNextId(data) {
        const usedIds = data.map(item => item.id);
        let id = 1;
        while (usedIds.includes(id)) {
            id++;
        }
        return id;
    }
     const validateForm = () => {

    const errors = {};
    data.forEach(field => {
      console.log("f ", field)
      const val = formData[field.name];
      console.log("v ", val)
      if (field.required === "true") {
        if (field.textType === "checkbox") {
          if (!val) {
            errors[field.name] = `${field.name} must be checked`;
          }
        }
        if (field.type === "Email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            errors[field.name] = "Invalid email address";
          }
        }
       if (field.type === "Number") {
           const numVal = Number(val);
          if (field.id === "c-No") {
            
            if (numVal.toString().length < 10) {
              errors[field.name] = `Contact NO must not be a less than 10 Number`;
            }else if(numVal.toString().length > 10) errors[field.name]=`Contact NO must not be a more than 10 Number`;
          }
        if(field.id==="age"){
          if(val<10){
            errors[field.name]=`Age must be above 16`;
          }
        }


        }
        if (!val || val === "") {
          errors[field.name] = `${field.name} is required`;
        }
      }
    });
    console.log("Validation errors:", errors);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validateForm()){
            return
        }
        const formentry = JSON.parse(localStorage.getItem('AllFormData')) || [];
        formData.id = getNextId(formentry);

        const updatedform = [...formentry, formData]
        localStorage.setItem('AllFormData', JSON.stringify(updatedform))

        setFormData({});




    };

    return (
        <>
            
            <div className="container form-container">
                <form onSubmit={handleSubmit} className="mt-4" noValidate>
                    <div className="row">
                        {data.map((data, index) => (
                         
                            <>
                                <div className={`col-12 col-sm-12 col-md-${data.textType === "textarea" || data.textType === "button" ? 12 : 6
                                }`} key={index}>
                                    <div class="mb-3">
                                        <label htmlFor={data.name} className="form-label cs-label">
                                            {data.name}
                                            {data.required === "true" && <span style={{ color: "red" }}>*</span>}
                                        </label>
                                        {data.textType === "textarea" ? (
                                           <>
                                                    <textarea
                                                        required={data.required === "true"}
                                                        className="form-control borderr"
                                                        value={formData[data.name] || ""}
                                                        placeholder="Leave a comment here"
                                                        id={data.id}
                                                        name={data.name}
                                                        onChange={handleChange}
                                                    />
                                                    {formErrors[data.name] && (
                                                        <div style={{ color: "red", fontSize: "0.8em" }}>
                                                            {formErrors[data.name]}
                                                        </div>
                                                    )}
                                                    
                                                   
                                                </>
                                                
                                        ) : data.textType === "select" ? (
                                            <>
                                            <select id={data.id} name={data.name} class="form-select borderr"
                                                value={formData[data.name] || ""}
                                                onChange={handleChange} required={data.required}>
                                                <option value="">--Select--</option>
                                                {data.options.map((opt, index) => (
                                                    <><option key={index} value={opt}>{opt}</option></>
                                                ))
                                                }
                                            </select>
                                             {formErrors[data.name] && (
                                                        <div style={{ color: "red", fontSize: "0.8em" }}>
                                                            {formErrors[data.name]}
                                                        </div>
                                                    )}
                                            </>
                                            
                                        ) : data.textType === "checkbox" ? (
                                            <div class="form-check">
                                                <input class="form-check-input borderr" type={data.textType}
                                                    onChange={handleChange} required={data.required} />
                                                <label class="form-check-label" for="data.name">
                                                    {data.desc}
                                                </label>
                                            </div>

                                        )
                                            :
                                            (<>
                                                <input type={data.type} class="form-control borderr"
                                                    name={data.name} id={data.id} placeholder={data.placeholder}
                                                    required={data.required} onChange={handleChange} value={formData[data.name] || ""} />
                                                 {formErrors[data.name] && (
                                                        <div style={{ color: "red", fontSize: "0.8em" }}>
                                                            {formErrors[data.name]}
                                                        </div>
                                                    )}
                                                </>)}



                                    </div>
                                </div>
                            </>
                        ))


                        }
                    </div>
                   
                    <button className="btn btn-primary button-cl " >Submit</button>
                </form>
            </div>

            <Table />
        </>
    );
}

export default Form;
