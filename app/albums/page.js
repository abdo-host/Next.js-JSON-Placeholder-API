import {PageTitle} from "@/app/components/PageTitle";
import {Album} from "@/app/components/pages/albums/Album";

export const metadata = {
    title: 'Albums'
}

export default async function AlbumsPage() {
    return (
        <>
            <main>
                <PageTitle title={metadata.title}></PageTitle>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Album></Album>
                </div>
            </main>
        </>
    )
}
