import React, { useState } from "react";
import TalentDetails from "./talentDetails";
import { jobID, talentDatabase } from "../formData/data";

const PurchaseOrder = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    poType: "",
    poNumber: "",
    receivedOn: "",
    receivedFrom: { name: "", email: "" },
    startDate: "",
    endDate: "",
    budget: "",
    currency: "USD",
    reqs: [{ jobTitle: "", reqId: "", talents: {} }],
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("receivedFrom.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        receivedFrom: { ...prev.receivedFrom, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      clientName: "",
      poType: "",
      poNumber: "",
      receivedOn: "",
      receivedFrom: { name: "", email: "" },
      startDate: "",
      endDate: "",
      budget: "",
      currency: "USD",
      reqs: [{ jobTitle: "", reqId: "", talents: {} }],
    });
    setErrors({});
    setSubmitted(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.clientName) newErrors.clientName = "Client Name is required";
    if (!formData.poType) newErrors.poType = "PO Type is required";
    if (!formData.poNumber) newErrors.poNumber = "PO Number is required";
    if (!formData.receivedOn) newErrors.receivedOn = "Received On is required";
    if (!formData.receivedFrom.name)
      newErrors.receivedFromName = "Name required";
    if (!formData.receivedFrom.email)
      newErrors.receivedFromEmail = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.receivedFrom.email))
      newErrors.receivedFromEmail = "Invalid email address";
    if (!formData.startDate) newErrors.startDate = "Start Date is required";
    if (!formData.endDate) newErrors.endDate = "End Date is required";
    else if (formData.endDate < formData.startDate)
      newErrors.endDate = "End Date cannot be before Start Date";
    if (!formData.budget) newErrors.budget = "Budget is required";
    else if (!/^\d{1,5}$/.test(formData.budget))
      newErrors.budget = "Max 5 digits allowed";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (submitted) {
    alert("your form is submitted to view data press f12");
    console.log(formData);
    handleReset();
    return;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card p-4 mb-4">
        <h5>Purchase Order Details</h5>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label>
              Client Name <span className="text-danger">*</span>
            </label>
            <select
              name="clientName"
              className="form-select"
              value={formData.clientName}
              onChange={handleChange}
            >
              <option value="">Select Client</option>
              <option value="Client A">Client A</option>
              <option value="Client B">Client B</option>
            </select>
            <small className="text-danger">{errors.clientName}</small>
          </div>

          <div className="col-md-3 mb-3">
            <label>
              Purchase Order Type <span className="text-danger">*</span>
            </label>
            <select
              name="poType"
              className="form-select"
              value={formData.poType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Individual">Individual</option>
              <option value="Group">Group</option>
            </select>
            <small className="text-danger">{errors.poType}</small>
          </div>

          <div className="col-md-3 mb-3">
            <label>
              Purchase Order No <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="poNumber"
              className="form-control"
              value={formData.poNumber}
              onChange={handleChange}
            />
            <small className="text-danger">{errors.poNumber}</small>
          </div>

          <div className="col-md-3 mb-3">
            <label>
              Received On <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              name="receivedOn"
              className="form-control"
              value={formData.receivedOn}
              onChange={handleChange}
            />
            <small className="text-danger">{errors.receivedOn}</small>
          </div>

          <div className="col-md-2 mb-3">
            <label>
              Received From <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="receivedFrom.name"
              className="form-control"
              placeholder="Name"
              value={formData.receivedFrom.name}
              onChange={handleChange}
            />
            <small className="text-danger">{errors.receivedFromName}</small>
          </div>
          <div className="col-md-2 mb-3">
            <label>
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="receivedFrom.email"
              className="form-control"
              placeholder="Email"
              value={formData.receivedFrom.email}
              onChange={handleChange}
            />
            <small className="text-danger">{errors.receivedFromEmail}</small>
          </div>

          <div className="col-md-2 mb-3">
            <label>
              PO Start Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={formData.startDate}
              onChange={handleChange}
            />
            <small className="text-danger">{errors.startDate}</small>
          </div>
          <div className="col-md-2 mb-3">
            <label>
              PO End Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              value={formData.endDate}
              onChange={handleChange}
            />
            <small className="text-danger">{errors.endDate}</small>
          </div>

          <div className="col-md-2 mb-3">
            <label>
              Budget <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              name="budget"
              className="form-control"
              value={formData.budget}
              onChange={handleChange}
            />
            <small className="text-danger">{errors.budget}</small>
          </div>
          <div className="col-md-2 mb-3">
            <label>Currency</label>
            <select
              name="currency"
              className="form-select"
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
      </div>

      <TalentDetails
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        jobID={jobID}
        talentDatabase={talentDatabase}
      />

      <div className="d-flex justify-content-between m-5">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default PurchaseOrder;
