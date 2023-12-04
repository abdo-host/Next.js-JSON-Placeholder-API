"use client";

import {Fragment, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {EnvelopeIcon, GlobeAltIcon, PhoneIcon, UserIcon} from '@heroicons/react/24/outline'

export function UserDataModal({userData, show, setShowUserData}) {

    const handleClose = () => setShowUserData(false);
    const cancelButtonRef = useRef(null)

    return (
        <>
            <Transition.Root show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShowUserData}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white">
                                        <div className="sm:flex sm:items-start pt-3 pb-3 pe-4 ps-4 border-b border-gray-200">
                                            <div className="text-left">
                                                <Dialog.Title as="h3" className="text-2xl font-semibold text-gray-900">
                                                    User Profile
                                                </Dialog.Title>
                                            </div>
                                            <button className="bg-white mt-1 text-gray-400 ml-auto" onClick={() => setShowUserData(false)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="mt-0 p-4">
                                            <div className="flex align-items-center">
                                                <img src={`/images/users/${userData.id}.jpg`} alt="" className="h-1/4 w-1/4 rounded-3 mb-4 bg-gray-50"/>
                                                <div className="w-3/4 ml-4">
                                                    <ul className="p-0" style={{marginTop: '-20px'}}>
                                                        <li className="flex align-items-center mt-0"><UserIcon className="h-5 w-5 mr-1"/> {userData?.name}</li>
                                                        <li className="flex align-items-center mt-1"><EnvelopeIcon className="h-5 w-5 mr-1"/> {userData?.email}</li>
                                                        <li className="flex align-items-center mt-1"><PhoneIcon className="h-5 w-5 mr-1"/> {userData?.phone}</li>
                                                        <li className="flex align-items-center mt-1"><GlobeAltIcon className="h-5 w-5 mr-1"/> {userData?.website}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <table className="table table-bordered table-sm">
                                                <thead>
                                                <tr>
                                                    <th colSpan="2">Address</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th>Suite</th>
                                                    <td>{userData?.address?.suite}</td>
                                                </tr>
                                                <tr>
                                                    <th>Street</th>
                                                    <td>{userData?.address?.street}</td>
                                                </tr>
                                                <tr>
                                                    <th>City</th>
                                                    <td>{userData?.address?.city}</td>
                                                </tr>
                                                <tr>
                                                    <th>Zipcode</th>
                                                    <td>{userData?.address?.zipcode}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setShowUserData(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
