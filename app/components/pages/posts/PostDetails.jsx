"use client";

import "./posts.scss"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google';
import {UserDataModal} from "@/app/components/partials/UserDataModal";
import {AtSymbolIcon, EnvelopeIcon} from "@heroicons/react/24/outline";
import {Button, IconButton, Input, Spinner, Textarea} from "@material-tailwind/react";
import {FormErrorMessage} from "@/app/components/partials/FormErrorMessage";
import {GoogleAuthButton} from "@/app/components/partials/GoogleAuthButton";
import {googleGetUserInfo} from "@/redux/actions/google-auth";

export function PostDetails({postDetails, postUser, postComments}) {

    const [showUserData, setShowUserData] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [userDataModal, setUserDataModal] = useState({});
    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm({mode: 'onBlur'});
    const [googleAuthAccessToken, setGoogleAuthAccessToken] = useState();
    const dispatch = useDispatch();

    const [googleUserInfo] = useSelector((state) => [
        state.googleUserInfo.data,
    ]);

    const openUserDataModal = (event, id) => {
        event.preventDefault();
        setShowUserData(true);
        setUserDataModal(postUser);
    }

    const googleAuthCallback = (response) => {
        setGoogleAuthAccessToken(response.access_token);
    }

    const addComment = (data) => {
        setFormLoading(true);
        setTimeout(() => {
            postComments.push({
                id: new Date().getTime(),
                postId: postDetails.id,
                email: data.email,
                body: data.comment
            });
            setValue('email', '');
            setValue('comment', '');
            setFormLoading(false);
        }, 500);
    }

    useEffect(() => {
        dispatch(googleGetUserInfo(googleAuthAccessToken));
    }, [dispatch, googleAuthAccessToken]);

    useEffect(() => {
        if (googleUserInfo)
            setValue('email', googleUserInfo.email);
    }, [googleUserInfo]);

    return (
        <>
            <article key={postDetails.id} className="card shadow-sm">
                <div className="card-body">
                    <div className="group">
                        <h2 className="mt-0 text-2xl font-semibold text-capitalize">
                            {postDetails.title}
                        </h2>
                        <hr className="mt-3 mb-3"/>
                        <p className="mt-2 line-clamp-3 text-lg leading-6 text-gray-600">{postDetails.body}</p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                        <img src={`/images/users/${postUser.id}.jpg`} alt="" className="h-10 w-10 rounded-full bg-gray-50"/>
                        <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                                <a className="pointer-event hover:text-blue-600" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Show User Profile" onClick={(event) => openUserDataModal(event, postUser.id)}>
                                    <span className="absolute inset-0"/>
                                    {postUser?.name}
                                </a>
                            </p>
                            <p className="text-gray-600">{postUser?.address?.street}, {postUser?.address?.city}</p>
                        </div>
                    </div>
                </div>
            </article>
            <div className="card shadow-sm mt-3">
                <div className="card-body">
                    <div className="group">
                        <h2 className="mt-0 text-2xl font-semibold text-capitalize flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
                            </svg>
                            Comments ({postComments.length})
                        </h2>
                    </div>
                    <div className="group mt-4">
                        {postComments && postComments.map(comment => <div className="post-comment shadow-sm" key={comment.id}>
                            <h4>
                                <div>
                                    <AtSymbolIcon className="w-5 he-5 mr-1"/>
                                    <span>{comment.email}</span>
                                </div>
                            </h4>
                            <p>{comment.body}</p>
                        </div>)}
                    </div>
                </div>
            </div>
            <div className="card shadow-sm mt-3">
                <div className={`card-body ${(formLoading && 'from-loading')}`}>
                    {formLoading && <Spinner className="from-loading-spinner h-12 w-12"/>}
                    <form method="post" onSubmit={handleSubmit(addComment)}>
                        <div className="w-50 mt-0">
                            <div className="input-group has-validation">
                                <span class="input-group-text"><EnvelopeIcon className="w-6 h-6"/></span>
                                <div className={`form-floating ${(errors.email && 'is-invalid')}`}>
                                    <input type="email" className={`form-control ${(errors.email && 'is-invalid')}`}  {...register('email', {
                                        required: {value: true, message: 'Email Required'},
                                        pattern: {value: /.+@.+/, message: 'Invalid Email'},
                                    })} id="email" placeholder="name@example.com"/>
                                    <label htmlFor="email">Email</label>
                                </div>
                                {errors.email && <FormErrorMessage message={errors.email.message}/>}
                            </div>
                        </div>
                        <div className="relative mt-4">
                            <div className="form-floating mb-3">
                                <textarea rows="4" className={`form-control h-auto ${(errors.comment && 'is-invalid')}`}  {...register('comment', {
                                    required: {value: true, message: 'Invalid Comment Body'},
                                    minLength: {value: 10, message: 'Min Length Is (10)'},
                                })} id="comment" placeholder="name@example.com"/>
                                {errors.comment && <FormErrorMessage message={errors.comment.message}/>}
                                <label htmlFor="comment">Your Email</label>
                            </div>
                            <div className="flex w-full justify-between py-1.5">
                                <GoogleOAuthProvider clientId="136598943169-ulel207t3dd1jnt7b9etjov6p70qd6n6">
                                    <GoogleAuthButton loginCallback={googleAuthCallback}/>
                                </GoogleOAuthProvider>
                                <div className="flex gap-2">
                                    <Button type="reset" size="sm" color="red" variant="text" className="rounded-md">
                                        Cancel
                                    </Button>
                                    <Button type="submit" size="sm" className="rounded-md">
                                        Post Comment
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <UserDataModal userData={userDataModal} show={showUserData} setShowUserData={setShowUserData}></UserDataModal>
        </>
    )
}
