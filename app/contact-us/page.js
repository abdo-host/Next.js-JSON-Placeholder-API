
import {PageTitle} from "@/app/components/PageTitle";
import {ContactUs} from "@/app/components/pages/contact-us/ContactUs";

export const metadata = {
    title: 'Contact Us'
}

export default async function ContactUsPage() {

    const sendEmail = () => {
        console.log('Sending message')
        // await sendEmail({
        //     to: "kiran@example.com",
        //     subject: "Welcome to NextAPI",
        //     html: render(ContactTemplate()),
        // });
    }

    return (
        <>
            <main>
                <PageTitle title={metadata.title}></PageTitle>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <ContactUs/>
                </div>
            </main>
        </>
    )
}
