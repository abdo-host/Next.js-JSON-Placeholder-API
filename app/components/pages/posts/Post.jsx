"use client";

import Link from "next/link";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from 'react-paginate';
import {getPosts} from "@/redux/actions/posts";
import {getUsers} from "@/redux/actions/users";
import {UserDataModal} from "@/app/components/partials/UserDataModal";

export function Post() {

    const [progress, setProgress] = useState(true);
    const [showUserData, setShowUserData] = useState(false);
    const [userDataModal, setUserDataModal] = useState({});
    const [itemOffset, setItemOffset] = useState(0);


    const dispatch = useDispatch();

    const [posts, users] = useSelector((state) => [
        state.posts.list,
        state.users.data,
    ]);

    const find_user = (id) => {
        if (users && users.length) {
            return users.filter(user => user.id == id)[0] || undefined;
        }
    }

    const postsPerPage = 12;
    const endOffset = itemOffset + postsPerPage;
    const currentPosts = posts && posts.slice(itemOffset, endOffset);
    const pageCount = posts && Math.ceil(posts.length / postsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * postsPerPage) % posts.length;
        setItemOffset(newOffset);
    };

    const openUserDataModal = (event, id) => {
        event.preventDefault();
        setShowUserData(true);
        setUserDataModal(find_user(id));
    }

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {!currentPosts && <>
                    <p className="placeholder-glow">
                        <span className="placeholder col-12 bg-gray-400 rounded-md" style={{height: '280px'}}></span>
                    </p>
                    <p className="placeholder-glow">
                        <span className="placeholder col-12 bg-gray-400 rounded-md" style={{height: '280px'}}></span>
                    </p>
                    <p className="placeholder-glow">
                        <span className="placeholder col-12 bg-gray-400 rounded-md" style={{height: '280px'}}></span>
                    </p>
                </>}
                {currentPosts && currentPosts.map((post) => (
                    <article key={post.id} className="flex max-w-xl bg-white p-6 rounded-md shadow-md shadow-gray-300 flex-col items-start justify-between">
                        <div className="group relative">
                            <h3 className="mt-3 text-xl font-semibold">
                                <Link href={`/posts/${post.id}`} className="text-gray-900 hover:text-blue-700 cursor-pointer">
                                    {post.title}
                                </Link>
                            </h3>
                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{post.body}</p>
                        </div>
                        <div className="relative mt-8 flex items-center gap-x-4">
                            <img src={`/images/users/${post.userId}.jpg`} alt="" className="h-10 w-10 rounded-full bg-gray-50"/>
                            <div className="text-sm leading-6">
                                <p className="font-semibold text-gray-900">
                                    <a className="pointer-event hover:text-blue-600" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Show User Profile" onClick={(event) => openUserDataModal(event, post.userId)}>
                                        <span className="absolute inset-0"/>
                                        {find_user(post.userId)?.name}
                                    </a>
                                </p>
                                <p className="text-gray-600">{find_user(post.userId)?.address?.street}, {find_user(post.userId)?.address?.city}</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            <div className="text-center mt-20 mb-20">
                {currentPosts && <ReactPaginate
                    nextLabel={<span>Next</span>}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={<span>Previous</span>}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination justify-content-center"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />}
            </div>
            <UserDataModal userData={userDataModal} show={showUserData} setShowUserData={setShowUserData}></UserDataModal>
        </>
    )
}
