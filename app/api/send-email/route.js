import {NextResponse} from "next/server";
import {z} from 'zod'
import {render} from "@react-email/render";
import {ContactTemplate} from "@/emails/ContactTemplate";
import {sendEmail} from "@/helper/email";


export async function POST(request) {
    const {name, email, subject, message} = await request.json();
    let errors = {};
    if (!name || !name.length) {
        errors['name'] = 'Your name must be not empty';
    }
    if (!email || !email.length) {
        errors['email'] = 'Your email must be not empty';
    }
    if (!subject || !subject.length) {
        errors['subject'] = 'Your subject must be not empty';
    }
    if (!message || !message.length) {
        errors['message'] = 'Your message must be not empty';
    }
    if (errors.name || errors.email || errors.subject || errors.message)
        return NextResponse.json({
            message: errors
        }, {
            status: 422,
        });
    try {
        await sendEmail({
            to: email,
            subject: `Welcome (${name}) to Next.js API`,
            html: render(ContactTemplate(name, email, subject, message)),
        });
    } catch (err) {
        return NextResponse.json({
            message: {
                error: `Can not send email ${err}`
            }
        }, {
            status: 422,
        });
    }

    return NextResponse.json({
        message: 'Email sent successfully'
    }, {
        status: 200,
    });
}
