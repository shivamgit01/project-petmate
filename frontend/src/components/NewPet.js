import React, { Fragment, useState, useEffect } from "react";
import "./NewPet.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createPet } from "../actions/petAction";
import { NEW_PET_RESET } from "../constants/petConstants";
import Metadata from "./Metadata";
import { Button } from "@material-ui/core";

const NewPet = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newPet);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [locationState, setState] = useState("");
  const [loc, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Dog",
    "Cat",
    "Rabbit",
    "Rat/Hamster",
    "Bird",
    "Fish",
    "Others",
  ];

  const locationStates = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Orissa",
    "Pondicherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Tripura",
    "Uttaranchal",
    "Uttar Pradesh",
    "West Bengal",
  ];

  useEffect(() => {
    if (error) {
      alert(`Error Occured!`);
      console.log(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert("Pet Info Added Successfully");
      navigate("/");
      dispatch({ type: NEW_PET_RESET });
    }
  }, [dispatch, error, success]);

  const createPetSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("breed", breed);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("location", loc);
    myForm.set("loc", locationState);
    myForm.set("age", age);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createPet(myForm));
  };

  const createPetImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <Metadata title="Add Pet" />
      <div className="dashboard">
        <div className="newPetContainer">
          <form
            className="addPetForm"
            encType="multipart/form-data"
            onSubmit={createPetSubmitHandler}
          >
            <h1>Add Pet Info</h1>
            <div>
              <input
                type="text"
                placeholder="Name of Pet"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <textarea
                placeholder="Description of Pet"
                required
                value={description}
                cols="30"
                rows="3"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <input
                type="text"
                placeholder="Breed of Pet"
                required
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Age of Pet"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <select onChange={(e) => setState(e.target.value)}>
                <option value="">Select State</option>
                {locationStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter your city"
                required
                value={loc}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div id="createPetFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createPetImagesChange}
              />
            </div>
            <div id="createPetFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Image Preview" />
              ))}
            </div>
            <Button
              id="createPetBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Confirm Submission
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPet;
