import {Post} from "@/app/components/pages/posts/Post";
import {PageTitle} from "@/app/components/PageTitle";

export const metadata = {
    title: 'Posts List'
}

export default async function PostsPage() {
    return (
        <>
            <main>
                <PageTitle title={metadata.title}></PageTitle>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Post></Post>
                </div>
            </main>
        </>
    )
}
