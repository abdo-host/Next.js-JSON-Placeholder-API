"use client";

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardHeader, CardBody, Typography, Avatar} from "@material-tailwind/react";
import {getUsers} from "@/redux/actions/users";
import {getAlbums} from "@/redux/actions/albums";
import {getPhotos} from "@/redux/actions/photos";
import {UserDataModal} from "@/app/components/partials/UserDataModal";
import Link from "next/link";
import ReactPaginate from "react-paginate";

export function Album() {

    const [showUserData, setShowUserData] = useState(false);
    const [userDataModal, setUserDataModal] = useState({});
    const dispatch = useDispatch();
    const [itemOffset, setItemOffset] = useState(0);

    const [users, albums, photos] = useSelector((state) => [
        state.users.data,
        state.albums.data,
        state.photos.data
    ]);

    const find_user = (id) => {
        if (users && users.length) {
            return users.filter(user => user.id == id)[0] || {};
        }
    }

    const find_album_photos = (id) => {
        if (photos && photos.length) {
            return photos.filter(photo => photo.albumId == id) || [];
        }
    }

    const album_first_photo = (id) => {
        if (photos && photos.length) {
            return photos.filter(photo => photo.albumId == id)[0] || {};
        }
    }

    const openUserDataModal = (event, id) => {
        event.preventDefault();
        setShowUserData(true);
        setUserDataModal(find_user(id));
    }

    const postsPerPage = 6;
    const endOffset = itemOffset + postsPerPage;
    const currentAlbums = albums && albums.slice(itemOffset, endOffset);
    const pageCount = albums && Math.ceil(albums.length / postsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * postsPerPage) % albums.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getAlbums());
        dispatch(getPhotos());
    }, [dispatch]);

    return (
        <>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {!currentAlbums && <>
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
                {currentAlbums && currentAlbums.map(album => <Card shadow={false} className="relative grid h-[20rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        style={{backgroundImage: `url('${album_first_photo(album.id)?.url}')`}}
                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                    >
                        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"/>
                    </CardHeader>
                    <CardBody className="pb-14 px-4  w-100 h-100">
                        <Typography
                            variant="h5"
                            color="white"
                            className="mb-0 font-medium absolute left-6 right-6 bottom-6 leading-[1.2]"
                        >
                            <Link href={''}>
                                {album.title}
                            </Link>
                        </Typography>
                        <a className="cursor-pointer text-decoration-none flex align-items-center position-absolute left-6 top-6" onClick={(event) => openUserDataModal(event, album.userId)}>
                            <Avatar
                                size="md"
                                variant="circular"
                                alt="tania andrew"
                                className="border-2 border-white mt-0 mb-0 mr-2"
                                src={`/images/users/${album.userId}.jpg`}
                            />
                            <div className="text-left">
                                <Typography variant="b" className="mt-1 mb-0 text-md font-bold text-gray-100">
                                    {find_user(album.userId)?.name}
                                </Typography>
                                <Typography variant="p" className="mb-0 text-gray-200">
                                    {find_user(album.userId)?.email}
                                </Typography>
                            </div>
                        </a>
                    </CardBody>
                </Card>)}
            </div>
            <div className="text-center mt-20 mb-20">
                {currentAlbums && <ReactPaginate
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
