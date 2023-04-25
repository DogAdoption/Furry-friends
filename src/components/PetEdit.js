import React, { useState } from 'react'
import PetForm from './PetForm'
import uuid from 'uuid-random';
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { storage, db } from '../firebase-config';

const PetEdit = () => {
    const loc = useLocation();
    const dog = loc.state ? loc.state.dog : null;
    const [name, setName] = useState(dog.name);
    const [breed, setBreed] = useState(dog.breed);
    const [age, setAge] = useState(dog.age);
    const [gender, setGender] = useState(dog.gender);
    const [weight, setWeight] = useState(dog.weight);
    const [location, setLocation] = useState(dog.location);
    const [story, setStory] = useState(dog.story);
    const [picture, setPicture] = useState(dog.pictureUrl);
    const prevPic = dog.pictureUrl;

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

    const addDog = async (data) => {
        const dogDocumentRef = doc(db, "dogs", dog.id);

        await setDoc(dogDocumentRef, data)
            .then(() => {
                alert('Updated successfully!');
                navigate('/search');
            })
            .catch((error) => {
                alert('Error writing document: ', error);
            });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            breed: breed,
            age: age,
            gender: gender,
            weight: weight, 
            location: location,
            pictureUrl: picture,
            story: story,
            ownerId: user.uid
        };
        
        if(picture !== prevPic) {
            //upload picture
            const imageRef = ref(storage, `images/${picture.name + uuid()}`);
            await uploadBytes(imageRef, picture)
            .then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                // Add the download URL to the user data
                data.pictureUrl = downloadURL;

                // Add the dog data to Firestore
                addDog(data)
            }).catch((err) => {
                console.log(err);
            })
        } else {
            // Add the dog data to Firestore
            addDog(data);
        }
    }

    if(!dog) {
        return <p>You cannot access this page...</p>;
    }
    return <PetForm dog={dogValues} handleSave={handleUpdate} purpose={'Edit'} />
}

export default PetEdit