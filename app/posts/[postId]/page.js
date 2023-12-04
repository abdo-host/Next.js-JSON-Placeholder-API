import {PageTitle} from "@/app/components/PageTitle";
import {fetchPosts, fetchUsers} from "@/redux/api";
import {PostDetails} from "@/app/components/pages/posts/PostDetails";
import {Suspense} from "react";
import Loading from "@/app/posts/[postId]/loading";

export const metadata = {
    title: 'View Post'
}

export default async function ViewPostPage({params}) {

    const postDetails = await fetchPosts(`/${params.postId}`).then(({data}) => data);
    const postUser = await fetchUsers(`/${postDetails.userId}`).then(({data}) => data);
    const postComments = await fetchPosts(`/${params.postId}/comments`).then(({data}) => data);

    return (
        <main>
            <PageTitle title={metadata.title}></PageTitle>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <PostDetails postDetails={postDetails} postUser={postUser} postComments={postComments}></PostDetails>
            </div>
        </main>
    )
}
