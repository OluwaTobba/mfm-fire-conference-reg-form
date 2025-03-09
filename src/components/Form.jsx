import React, { useState } from "react";
import db from "../firebase";
import { addDoc, collection } from "firebase/firestore";
// import "./Form.css";
import BannerImg from "../assets/fc-mfm.jpg";

function Form() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    location: "",
    prayer: "",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleReset = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      gender: "",
      location: "",
      prayer: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const collectionRef = collection(db, "FcRegForm");
      await addDoc(collectionRef, formData);

      setModal({
        isOpen: true,
        type: "success",
        message: "Thanks for registering, your details have been successfully submitted; come thirsty and hungry to experience, enjoy and encounter the Holy Ghost!",
      });

      handleReset();
    } catch (error) {
      setModal({
        isOpen: true,
        type: "error",
        message: "There was an error registering you. Please try again or refresh your browser.",
      });
      console.error("Error submitting application: ", error);
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: "", message: "" });
  };

  return (
    <div className="container">
      <img src={BannerImg} alt="Banner" className="bannerImg" />
      <h1>Register for the Programme</h1>
      <h4>( * means required)</h4> <br />

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name*</label>
        <input
          type="text"
          placeholder="Enter First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastname">Last Name*</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone Number*</label>
        <input
          type="number"
          placeholder="Enter Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* <label htmlFor="whatsapp">WhatsApp Number</label>
        <input
          type="number"
          placeholder="Enter WhatsApp Number"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
        /> */}

        {/* <label htmlFor="social">Social Media*</label>
        <input
          type="text"
          placeholder="Enter Instagram username"
          name="social"
          value={formData.social}
          onChange={handleChange}
          required
        /> */}

        <label htmlFor="gender">Gender*</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            required
          /> Male <br />
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            required
          /> Female
        </div>

        <label htmlFor="location">Location</label>
        <input
          type="text"
          placeholder="Enter Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <label htmlFor="prayer">Prayer Request(s)?</label>
        <textarea
          name="prayer"
          id="prayer"
          cols={30}
          rows={5}
          placeholder="Enter here"
          value={formData.prayer}
          onChange={handleChange}
        ></textarea>

        <div className="buttons">
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="submit">
            Submit
          </button>
        </div>
      </form>

      {modal.isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modal.type === "success" ? "Success" : "Error"}</h2>
            <p>{modal.message}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;