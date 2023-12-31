import React, { useEffect } from 'react';
import classes from './Login.module.css';
import { signInWithGoogle } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('googleUserEmail')) {
            navigate('/');
        }
    }, [navigate]);

    const handleSignin = () => {
        signInWithGoogle().then((result) => {
            localStorage.setItem('googleUserName', result.user.displayName)
            localStorage.setItem('googleUserEmail', result.user.email)
            localStorage.setItem('googleUserPhotoUrl', result.user.photoURL)
            navigate('/');
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            });
        }).catch((error) => {
            console.log(error);
        });;
    };
    return (
        <div className={classes.loginBackground}>
            <div className={classes.loginContainer}>
                <div className={classes.appLogo}>
                    <svg fill="currentColor" height="72" width="72" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 336.945 336.945">
                        <g>
                            <g>
                                <g>
                                    <path d="M51.478,80.57h170.667c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H51.478c-4.142,0-7.5,3.357-7.5,7.5S47.336,80.57,51.478,80.57z" />
                                    <path d="M51.478,112.914h189.334c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H51.478c-4.142,0-7.5,3.357-7.5,7.5S47.336,112.914,51.478,112.914z" />
                                    <path d="M324.624,121.053c-9.939-9.938-25.9-10.268-36.242-0.994V7.5c0-4.143-3.357-7.5-7.5-7.5H12.109c-4.142,0-7.5,3.357-7.5,7.5v321.945c0,4.143,3.358,7.5,7.5,7.5h268.772c4.143,0,7.5-3.357,7.5-7.5V194.59l36.119-36.119c0.02-0.02,0.035-0.041,0.054-0.06c0.023-0.022,0.048-0.041,0.07-0.063C334.906,148.065,334.906,131.335,324.624,121.053zM19.609,321.945V15h253.772v120l-28.69,28.691c-1.133-0.688-2.457-1.09-3.879-1.09H51.478c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5H230.78l-17.344,17.344H51.478c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5h146.958l-17.344,17.344H51.478c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5h114.615l-13.797,13.797c-0.203,0.203-0.388,0.416-0.563,0.635c-0.045,0.058-0.086,0.119-0.13,0.178c-0.129,0.172-0.252,0.347-0.364,0.527c-0.042,0.067-0.082,0.137-0.122,0.206c-0.109,0.187-0.208,0.378-0.3,0.571c-0.019,0.041-0.043,0.077-0.062,0.118l-1.226,2.735c-1.234-0.893-2.746-1.424-4.384-1.424H51.478c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5h91.965l-9.657,21.539c-0.173,0.387-0.305,0.783-0.409,1.184c-1.959,4.168-1.232,9.297,2.206,12.734c2.123,2.124,4.945,3.293,7.949,3.293c1.705,0,3.346-0.389,4.84-1.104c0.382-0.103,0.761-0.226,1.129-0.391l37.853-16.968c0.039-0.018,0.074-0.041,0.112-0.06c0.198-0.092,0.393-0.193,0.583-0.305c0.066-0.038,0.132-0.076,0.196-0.116c0.187-0.116,0.368-0.242,0.546-0.376c0.052-0.04,0.107-0.076,0.159-0.117c0.221-0.176,0.436-0.362,0.64-0.566l83.791-83.791v112.357H19.609z M171.287,285.685l-19.569,8.772c-0.082-0.087-0.154-0.179-0.238-0.264c-0.084-0.084-0.175-0.156-0.261-0.237l8.773-19.567L171.287,285.685z M184.287,277.471l-16.081-16.081L292.51,137.086l16.081,16.081L184.287,277.471z M317.297,140.659l-12.278-12.278c3.223-0.271,6.538,0.818,8.999,3.279C316.479,134.12,317.567,137.437,317.297,140.659z" />
                                    <path d="M51.478,145.258h160c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5h-160c-4.142,0-7.5,3.357-7.5,7.5S47.336,145.258,51.478,145.258z" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <span className={classes.header}>Signin with Google</span>
                <div className={classes.googleCard} onClick={handleSignin}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                    <span>Click here to sign in!</span>
                </div>
            </div>
        </div>
    );
};

export default Login;