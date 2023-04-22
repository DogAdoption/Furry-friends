import React, { useState } from 'react';
import './formStyles.css';
import uuid from 'uuid-random';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase-config';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase-config";
import { useNavigate } from 'react-router-dom';

const DonateForm = () => {
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

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState(0);
    const [location, setLocation] = useState('');
    const [story, setStory] = useState('');
    const [picture, setPicture] = useState(null);

    const {user} = useAuth();

    const navigate = useNavigate();

    const handlePost = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            breed: breed,
            age: age,
            gender: gender,
            weight: weight, 
            location: location,
            story: story,
            ownerId: user.uid
        };
        //upload picture
        const imageRef = ref(storage, `images/${picture.name + uuid()}`);
        await uploadBytes(imageRef, picture)
            .then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                // Add the download URL to the user data
                data.pictureUrl = downloadURL;

                // Add the dog data to Firestore
                const dogsCollectionRef = collection(db, "dogs");
                await addDoc(dogsCollectionRef, data)
                    .then(() => {
                        alert('Posted successfully!');
                    })
                    .catch((error) => {
                        alert('Error writing document: ', error);
                    });
                navigate('/');
            }).catch((err) => {
                console.log(err);
            })
    }

    if(!user) {
        return <p>You cannot access this page...</p>;
    }

    return (
        <div className='contactPage' >
            <h2>Post your dog's details</h2>
            <form className='contactForm'>
                <div className="form-row">
                    <label>Name</label>
                    <input placeholder='Dog name...' className='cardInput' type="text" name='name' value={name} onChange={(e)=> setName(e.target.value)}  required />
                </div>
                <div className="form-row">
                    <label>Breed</label>
                    <input className='cardInput' type="text" name='breed' value={breed} onChange={(e)=> setBreed(e.target.value)}  required />
                </div>  
                <div className="form-row">
                    <label>Age</label>
                    <input className='cardInput' type="number" name='age' value={age} onChange={(e)=> setAge(e.target.value)}  required />
                </div> 
                <div className="form-row">
                    <label>Gender</label>
                    <select className='cardInput' style={{boxShadow: 'none'}} value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div> 
                <div className="form-row">
                    <label>Weight(kg)</label>
                    <input className='cardInput' type="number" name='weight' value={weight} onChange={(e)=> setWeight(e.target.value)}  required />
                </div>
                <div className="form-row">
                    <label>Location(State)</label>
                    <select className='cardInput' style={{boxShadow: 'none'}} value={location} onChange={(e) => setLocation(e.target.value)}>
                    {
                        indianStates.map(state => <option key={state} value={state}>{state}</option>)
                    }
                    </select>
                </div> 
                <div className="form-row">
                    <label>Picture</label>
                    <input className='cardInput' type="file" name='picture' onChange={(e)=> setPicture(e.target.files[0])}  required />
                </div>
                <div className="form-row">
                    <label>Story</label>
                    <textarea placeholder='Write something about your dog...' className='cardInput' name="message" cols="30" rows="10" value={story} onChange={(e)=> setStory(e.target.value)}  required />
                </div>
                <button type='submit' className='submitBtn' onClick={handlePost} >Post</button>
            </form>
        </div>
    )
}

export default DonateForm