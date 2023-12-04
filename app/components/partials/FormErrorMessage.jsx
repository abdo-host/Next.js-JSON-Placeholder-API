import {InformationCircleIcon} from "@heroicons/react/24/outline";

export function FormErrorMessage({message}) {
    return (
        <div className="invalid-feedback mt-2">
            <InformationCircleIcon className="w-5 h-5 float-start mr-1"/> {message}
        </div>
    )
}
