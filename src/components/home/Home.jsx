import React, { useEffect, useRef, useState } from 'react';
import classes from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import Loader from '../loader/Loader';

const Home = () => {
    const userName = localStorage.getItem('googleUserName');
    const userEmail = localStorage.getItem('googleUserEmail');
    const userPhotoUrl = localStorage.getItem('googleUserPhotoUrl');
    const navigate = useNavigate();
    const messageTextRef = useRef();
    const [words, setWords] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [editedText, setEditedText] = useState('');


    const sortedData = React.useMemo(() => { return [...words].sort((a, b) => new Date(b.date.seconds) - new Date(a.date.seconds)) }, [words]);

    useEffect(() => {
        if (!userEmail) {
            navigate('/login')
        }
    }, [navigate, userEmail]);

    useEffect(() => {
        const userCollectionReference = collection(db, userEmail);
        const delay = 1000;
        setShowLoader(true);
        const gettingWords = async () => {
            try {
                const data = await getDocs(userCollectionReference);
                setWords(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            } catch (error) {
                console.log(error.message);
            } finally {
                setShowLoader(false);
                setRefreshList(false);
            }
        };
        const debounce = setTimeout(() => {
            gettingWords();
        }, delay);

        return () => {
            clearTimeout(debounce);
        };
    }, [refreshList, userEmail]);

    const handleSignOut = () => {
        localStorage.removeItem('googleUserName');
        localStorage.removeItem('googleUserEmail');
        localStorage.removeItem('googleUserPhotoUrl');
        navigate('/login');
    };

    const handleEdit = async (id) => {
        const wordDoc = doc(db, userEmail, id);
        await updateDoc(wordDoc, { message: editedText });
        setEditItemId(null);
        setRefreshList(true);
    };

    const handleDelete = async (id) => {
        const wordDoc = doc(db, userEmail, id);
        await deleteDoc(wordDoc);
        setRefreshList(true);
    };

    const handleAddWord = async () => {
        const userCollectionReference = collection(db, userEmail);
        await addDoc(userCollectionReference, { message: messageTextRef.current.value, date: new Date() });
        if (messageTextRef.current) {
            messageTextRef.current.value = '';
        }
        setRefreshList(true);
    };

    const getFormattedDate = (rawDate) => {
        if (!rawDate || !rawDate.seconds) {
            return '';
        }
        const date = new Date(rawDate.seconds * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
        return formattedDate;
    };

    return (
        <div className={classes.homeBackground}>
            <div className={classes.profileContainer} onClick={handleSignOut}>
                <img src={userPhotoUrl} alt='ProfileImage' className={classes.profileImage} />
                <span className={classes.profileName}>{userName}</span>
                <div className={classes.logoutIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                        <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                    </svg>
                </div>
            </div>
            <div className={classes.homeActivityContainer}>
                <div className={classes.topContainer}>
                    <div className={classes.addWordContainer}>
                        <div className={classes.addWordLayout}>
                            <input type='text' className={classes.addWord} placeholder='Enter your point to remember' ref={messageTextRef} />
                            <button className={classes.addWordButton} onClick={handleAddWord}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                </svg>
                            </button>
                        </div>
                        <hr className={classes.topHr} />
                    </div>
                </div>
                <div className={classes.bottomContainer}>
                    <div className={classes.activityListContainer}>
                        {
                            showLoader ?
                                <Loader />
                                :
                                sortedData.map((word) => (
                                    <div className={classes.singleElement} key={word.id}>
                                        <span className={`${classes.activityName} ${editItemId === word.id ? classes.hideLayout : ''}`}>{word.message}</span>
                                        <div className={editItemId === word.id ? '' : classes.hideLayout}>
                                            <div className={classes.activityNameEdit}>
                                                <textarea defaultValue={word.message} className={classes.activityName} onChange={(e) => setEditedText(e.target.value)} />
                                                <div className={classes.editButtonsLayout}>
                                                    <button className={classes.editButton} onClick={() => handleEdit(word.id)}>Edit</button>
                                                    <button className={classes.editCancelButton} onClick={() => setEditItemId(null)}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={classes.rightElements}>
                                            <span className={classes.activityDateTime}>{getFormattedDate(word.date)}</span>
                                            <div className={classes.modifyIcons}>
                                                <div className={classes.editMessage} onClick={() => setEditItemId(word.id)}>
                                                    <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                </div>
                                                <div className={classes.deleteMessage} onClick={() => handleDelete(word.id)}>
                                                    <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;