export function PageTitle(props) {
    return (
        props.pathname != '/' && <header className="bg-gray-900 shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">{props.title}</h1>
            </div>
        </header>
    )
}
