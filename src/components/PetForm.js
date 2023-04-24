import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const PetForm = ({dog, handleSave, purpose}) => {
    const navigate = useNavigate();
    const indianStates = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ];

    const handleCancel = () => {
        return (purpose === 'Upload' ? navigate('/') : navigate('/search'));
    }

    const [isHovering, setIsHovering] = useState(false);

  return (
        <div className='contactPage' >
            <h2>{purpose} your dog's details</h2>
            <form className='contactForm'>
                <div className="form-row">
                    <label>Name</label>
                    <input placeholder='Dog name...' className='cardInput' type="text" name='name' value={dog.name} onChange={(e)=> dog.setName(e.target.value)} autoComplete='off'  required />
                </div>
                <div className="form-row">
                    <label>Breed</label>
                    <input className='cardInput' type="text" name='breed' value={dog.breed} onChange={(e)=> dog.setBreed(e.target.value)} autoComplete='off'  required />
                </div>  
                <div className="form-row">
                    <label>Age</label>
                    <input className='cardInput' type="number" name='age' value={dog.age} onChange={(e)=> dog.setAge(e.target.value)} autoComplete='off'  required />
                </div> 
                <div className="form-row">
                    <label>Gender</label>
                    <select className='cardInput' style={{boxShadow: 'none'}} value={dog.gender} onChange={(e) => dog.setGender(e.target.value)}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div> 
                <div className="form-row">
                    <label>Weight(kg)</label>
                    <input className='cardInput' type="number" name='weight' value={dog.weight} onChange={(e)=> dog.setWeight(e.target.value)} autoComplete='off'  required />
                </div>
                <div className="form-row">
                    <label>Location(State)</label>
                    <select className='cardInput' style={{boxShadow: 'none'}} value={dog.location} onChange={(e) => dog.setLocation(e.target.value)}>
                    {
                        indianStates.map(state => <option key={state} value={state}>{state}</option>)
                    }
                    </select>
                </div>
                <div className="form-row">
                    <label>Picture</label>
                    <Dropzone 
                        onDrop={(acceptedFiles) => dog.setPicture(acceptedFiles[0])}
                        onDragOver={() => setIsHovering(true)}
                        onDropAccepted={() => setIsHovering(false)}
                        onDragLeave={() => setIsHovering(false)}
                    >
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()} className={`dropzone ${isHovering ? 'hovering' : ''}`}>
                                <input {...getInputProps()} />
                                {dog.picture ? (
                                    <div className='image-wrapper'>
                                        <img 
                                            src={typeof dog.picture === "string" ? dog.picture : URL.createObjectURL(dog.picture)} 
                                            alt="Uploaded"
                                            className='image-preview'
                                        />
                                        <div className="edit-icon">
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </div>
                                    </div>
                                ) : (
                                    <p>Drag and drop an image or click to select a file</p>
                                )}
                            </div>
                        )}
                    </Dropzone>
                </div>
                <div className="form-row">
                    <label>Story</label>
                    <textarea placeholder='Write something about your dog...' className='cardInput' name="message" cols="30" rows="10" value={dog.story} onChange={(e)=> dog.setStory(e.target.value)} autoComplete='off'  required />
                </div>

                <div className='btns'>
                    <button type="submit" onClick={handleSave} className='blueBtn' >
                        {purpose === 'Upload' ? 'Post' : 'Save'}
                    </button>
                    <button type="submit" onClick={handleCancel} className='redBtn' >Cancel</button>
                </div>
            </form>
        </div>
  )
}

export default PetForm