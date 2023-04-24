import React, { useState } from 'react';
import './formStyles.css';
import uuid from 'uuid-random';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase-config';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom';
import PetForm from './PetForm';

const DonateForm = () => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState(0);
    const [location, setLocation] = useState("West Bengal");
    const [story, setStory] = useState('');
    const [picture, setPicture] = useState(null);

    let dogValues = {
        name, setName,
        breed, setBreed,
        age, setAge,
        gender, setGender,
        weight, setWeight,
        location, setLocation,
        story, setStory,
        picture, setPicture
    };

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

    return <PetForm  dog={dogValues} handleSave={handlePost} purpose={'Upload'}/>
}

export default DonateForm