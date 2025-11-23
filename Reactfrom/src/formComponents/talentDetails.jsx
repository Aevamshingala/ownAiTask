import React from "react";
import { talentDatabase } from "../formData/data";

const TalentDetails = ({ formData, setFormData, errors, jobID }) => {
  const handleReqChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedReqs = [...prev.reqs];
      updatedReqs[index][field] = value;
      if (field === "jobTitle") updatedReqs[index].reqId = jobID[value] || "";
      return { ...prev, reqs: updatedReqs };
    });
  };

  const handleTalentDetailChange = (reqIndex, talent, field, value) => {
    setFormData((prev) => {
      const updatedReqs = [...prev.reqs];
      if (!updatedReqs[reqIndex].talents[talent]) {
        updatedReqs[reqIndex].talents[talent] = {
          contractDuration: "",
          billRate: "",
          currency: "USD",
          standardTimeBR: "",
          standardTimeCurrency: "USD",
          overTimeBR: "",
          overTimeCurrency: "USD",
          selected: true,
        };
      }
      updatedReqs[reqIndex].talents[talent][field] = value;
      return { ...prev, reqs: updatedReqs };
    });
  };

  const handleAddReq = () => {
    setFormData((prev) => ({
      ...prev,
      reqs: [...prev.reqs, { jobTitle: "", reqId: "", talents: {} }],
    }));
  };

  const handleRemoveReq = (index) => {
    setFormData((prev) => {
      const updatedReqs = prev.reqs.filter((_, i) => i !== index);
      return {
        ...prev,
        reqs: updatedReqs.length
          ? updatedReqs
          : [{ jobTitle: "", reqId: "", talents: {} }],
      };
    });
  };

  return (
    <div className="card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Talent Detail</h5>
        {formData.poType === "Group" && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleAddReq}
          >
            + Add Another
          </button>
        )}
      </div>

      {formData.reqs.map((req, index) => (
        <div key={index} className="border rounded p-3 mb-4 bg-light">
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label>
                Job Title/REQ Name <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                value={req.jobTitle}
                onChange={(e) =>
                  handleReqChange(index, "jobTitle", e.target.value)
                }
              >
                <option value="">Select Job</option>
                {Object.keys(jobID).map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label>
                Job ID/REQ ID <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={req.reqId}
                readOnly
              />
            </div>
          </div>

          {req.jobTitle &&
            talentDatabase[req.jobTitle]?.map((talent) => {
              const talentValues = req.talents[talent] || {};
              return (
                <div key={talent} className="border rounded p-3 mb-3 bg-white">
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={!!req.talents[talent]}
                      onChange={() =>
                        handleTalentDetailChange(
                          index,
                          talent,
                          "selected",
                          !talentValues.selected
                        )
                      }
                    />
                    <label className="form-check-label fw-bold">{talent}</label>
                  </div>

                  {req.talents[talent]?.selected && (
                    <div className="row g-2 mt-2 align-items-end">
                      {/* Contract Duration */}
                      <div className="col-md-2">
                        <label className="form-label">Contract Duration</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Months"
                          value={talentValues.contractDuration || ""}
                          onChange={(e) =>
                            handleTalentDetailChange(
                              index,
                              talent,
                              "contractDuration",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      {/* Bill Rate */}
                      <div className="col-md-2">
                        <label className="form-label">Bill Rate</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Bill Rate /hr"
                          value={talentValues.billRate || ""}
                          onChange={(e) =>
                            handleTalentDetailChange(
                              index,
                              talent,
                              "billRate",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      {/* Currency for Bill Rate */}
                      <div className="col-md-2">
                        <label className="form-label">Currency</label>
                        <select
                          className="form-select"
                          value={talentValues.currency || "USD"}
                          onChange={(e) =>
                            handleTalentDetailChange(
                              index,
                              talent,
                              "currency",
                              e.target.value
                            )
                          }
                        >
                          <option value="USD">USD </option>
                          <option value="EUR">EUR</option>
                          <option value="INR">INR</option>
                        </select>
                      </div>

                      {/* Standard Time BR */}
                      <div className="col-md-2">
                        <label className="form-label">Standard Time BR</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Std. Time /hr"
                          value={talentValues.standardTimeBR || ""}
                          onChange={(e) =>
                            handleTalentDetailChange(
                              index,
                              talent,
                              "standardTimeBR",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      {/* Currency for Standard Time BR */}
                      <div className="col-md-2">
                        <label className="form-label">Currency</label>
                        <select
                          className="form-select"
                          value={talentValues.standardTimeCurrency || "USD"}
                          onChange={(e) =>
                            handleTalentDetailChange(
                              index,
                              talent,
                              "standardTimeCurrency",
                              e.target.value
                            )
                          }
                        >
                          <option value="USD">USD </option>
                          <option value="EUR">EUR</option>
                          <option value="INR">INR</option>
                        </select>
                      </div>

                      {/* Over Time BR */}
                      <div className="col-md-2">
                        <label className="form-label">Over Time BR</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Over Time /hr"
                          value={talentValues.overTimeBR || ""}
                          onChange={(e) =>
                            handleTalentDetailChange(
                              index,
                              talent,
                              "overTimeBR",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      {/* Currency for Over Time BR */}
                      <div className="col-md-2 mt-2">
                        <label className="form-label">Currency</label>
                        <select
                          className="form-select"
                          value={talentValues.overTimeCurrency || "USD"}
                          onChange={(e) =>
                            handleTalentDetailChange(
                              index,
                              talent,
                              "overTimeCurrency",
                              e.target.value
                            )
                          }
                        >
                          <option value="USD">USD </option>
                          <option value="EUR">EUR</option>
                          <option value="INR">INR</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          {formData.poType === "Group" && formData.reqs.length > 1 && (
            <div className="text-end">
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleRemoveReq(index)}
              >
                Remove REQ
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TalentDetails;
