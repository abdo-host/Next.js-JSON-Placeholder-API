"use client";

import {useState} from "react";
import axios from "axios";
import {CheckCircleIcon, InformationCircleIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {Alert, Button, Card, CardBody, Input, Spinner, Textarea, Typography} from "@material-tailwind/react";


export function ContactUs() {

    const [open, setOpen] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const clearFields = (event) => {
        Array.from(event.target).forEach((e) => (e.value = ""));
    }

    const sendMessage = (event) => {
        event.preventDefault();
        setFormLoading(true);
        setFormSuccess(false);
        setFormErrors({});
        console.log('formData', formData)
        axios.post('/api/send-email', formData).then(response => {
            setFormLoading(false);
            setFormSuccess(true);
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
            event.target.reset();
        }).catch(({response}) => {
            setOpen(true)
            setFormLoading(false);
            setFormSuccess(false);
            setFormErrors(response.data.message);
        });
    }

    return (
        <>
            <Card className="h-full w-full" shadow={false}>
                <CardBody className="overflow-x-auto">
                    {formErrors.error && <Alert className="mb-4 p-3" color="red" open={open} onClose={() => setOpen(false)}><XCircleIcon className="w-6 h-6 inline-block mr-1"/> {formErrors.error}</Alert>}
                    <Alert className="mb-4 p-3" color="green" open={formSuccess} onClose={() => setFormSuccess(false)}><CheckCircleIcon className="w-6 h-6 inline-block mr-1"/> Your message has been sent </Alert>
                    <form className="mt-0 mb-0" onSubmit={sendMessage}>
                        <div className="mb-4">
                            <div className="row">
                                <div className="col flex flex-col gap-6">
                                    <Typography variant="h6" color="blue-gray" className="-mb-2">
                                        Your Name
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder=""
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={formErrors.name ? '!border-red-200 focus:!border-red-900' : '!border-blue-gray-200 focus:!border-gray-900'}
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                    />
                                    {formErrors.name && <div className="text-red-600 flex align-middle" style={{marginTop: '-16px', fontSize: '14px'}}>
                                        <InformationCircleIcon className="w-5 h-5 mr-1"/>
                                        {formErrors.name}
                                    </div>}
                                </div>
                                <div className="col flex flex-col gap-6">
                                    <Typography variant="h6" color="blue-gray" className="-mb-2">
                                        Your Email
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="name@mail.com"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={formErrors.email ? '!border-red-200 focus:!border-red-900' : '!border-blue-gray-200 focus:!border-gray-900'}
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                    />
                                    {formErrors.email && <div className="text-red-600 flex align-middle" style={{marginTop: '-16px', fontSize: '14px'}}>
                                        <InformationCircleIcon className="w-5 h-5 mr-1"/>
                                        {formErrors.email}
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-2">
                                Subject
                            </Typography>
                            <Input
                                size="lg"
                                placeholder=""
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className={formErrors.subject ? '!border-red-200 focus:!border-red-900' : '!border-blue-gray-200 focus:!border-gray-900'}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            {formErrors.subject && <div className="text-red-600 flex align-middle" style={{marginTop: '-16px', fontSize: '14px'}}>
                                <InformationCircleIcon className="w-5 h-5 mr-1"/>
                                {formErrors.subject}
                            </div>}
                            <Typography variant="h6" color="blue-gray" className="-mb-2">
                                Message
                            </Typography>
                            <Textarea
                                size="lg"
                                placeholder=""
                                rows={6}
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className={formErrors.message ? '!border-red-200 focus:!border-red-900' : '!border-blue-gray-200 focus:!border-gray-900'}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            {formErrors.message && <div className="text-red-600 flex align-middle" style={{marginTop: '-16px', fontSize: '14px'}}>
                                <InformationCircleIcon className="w-5 h-5 mr-1"/>
                                {formErrors.message}
                            </div>}
                        </div>
                        <Button className="mt-6 text-center" type="submit" disabled={formLoading} fullWidth>
                            {formLoading ? <Spinner className="h-4 w-4 m-auto"/> : <span>Send Message</span>}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </>
    )
}
