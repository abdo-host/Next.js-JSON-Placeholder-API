import {PageTitle} from "@/app/components/PageTitle";
import {Todos} from "@/app/components/pages/todos/Todos";
import {fetchUsers, fetchTodos} from "@/redux/api";

export const metadata = {
    title: 'Todos'
}

export default async function TodoPage() {

    const getUser = await fetchUsers().then(({data}) => data);
    const getTodos = await fetchTodos().then(({data}) => data);

    return (
        <>
            <main>
                <PageTitle title={metadata.title}></PageTitle>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Todos usersList={getUser} todosList={getTodos}></Todos>
                </div>
            </main>
        </>
    )
}
