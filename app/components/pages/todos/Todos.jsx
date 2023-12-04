"use client";

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, InformationCircleIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {PencilIcon, TrashIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import {Alert, Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Switch, Tab, Tabs, TabsHeader, Tooltip, Typography} from "@material-tailwind/react";
import {getUsers} from "@/redux/actions/users";
import {getTodos} from "@/redux/actions/todos";
import {UserDataModal} from "@/app/components/partials/UserDataModal";
import {CheckIcon, PlusIcon} from "@heroicons/react/20/solid";
import {hideLoading} from "react-redux-loading-bar";

export function Todos() {

    const [showNewTodo, setShowNewTodo] = useState(false);
    const [showUserData, setShowUserData] = useState(false);
    const [userDataModal, setUserDataModal] = useState({});
    const [filterTodosSearch, setFilterTodosSearch] = useState('');
    const [filterTodosStatus, setFilterTodosStatus] = useState('all');
    let [todosCurrentPage, setTodosCurrentPage] = useState(0);
    const [todosPageSize, setTodosPageSize] = useState(5);
    const [todosPagesCount, setTodosPagesCount] = useState(0);
    const [todosTableLoading, setTodosTableLoading] = useState(true);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const dispatch = useDispatch();

    const [users = [], todos = []] = useSelector((state) => [
        state.users.data,
        state.todos.data
    ]);

    const TABS = [
        {
            label: "All",
            value: "all",
        },
        {
            label: "Active",
            value: "active",
        },
        {
            label: "Completed",
            value: "completed",
        },
    ];
    const TABLE_HEAD = ["Task", "User", "Status", ""];

    const find_user = (id) => {
        if (users && users.length) {
            return users.filter(user => user.id == id)[0] || {};
        }
    }

    const get_todo_status = (status) => {
        if (filterTodosStatus == 'all') {
            return ''
        } else if (filterTodosStatus == 'active') {
            return false

        } else if (filterTodosStatus == 'completed') {
            return true
        }
    }

    const todosPageNext = () => {
        setTodosCurrentPage((todosCurrentPage) => todosCurrentPage + 1);
    }

    const todosPagePrev = () => {
        setTodosCurrentPage((todosCurrentPage) => todosCurrentPage - 1);
    }

    const disabledNextPageButton = (todos) => {
        if (todosCurrentPage >= ((todos.length / todosPageSize) - 1)) {
            return true;
        }
        return false;
    }

    const openNewTodo = () => setShowNewTodo(!showNewTodo);

    const openUserDataModal = (event, id) => {
        event.preventDefault();
        setShowUserData(true);
        setUserDataModal(find_user(id));
    }

    const changeStatusFilter = (value) => {
        setFilterTodosStatus(value);
    }

    const filterData = (data, predicate) => {
        // if no data is sent in, return null, otherwise transform the data
        return !!!data ? null : data.reduce((list, entry) => {
            let clone = null;
            if (predicate(entry)) {
                // if the object matches the filter, clone it as it is
                clone = Object.assign({}, entry)
            } else if (entry.children != null) {
                // if the object has childrens, filter the list of children
                let children = filterData(entry.children, predicate)
                if (children.length > 0) {
                    // if any of the children matches, clone the parent object, overwrite
                    // the children list with the filtered list
                    clone = Object.assign({}, entry, {children: children})
                }
            }
            // if there's a cloned object, push it to the output list
            clone && list.push(clone)
            return list
        }, [])
    }

    const filterByStatus = (filterData) => {
        // Avoid filter for null value
        setTodosCurrentPage(0);
        if (filterTodosStatus == 'all') {
            return filterData;
        } else {
            return filterData.filter(todo => todo.completed === get_todo_status(filterTodosStatus));
        }
    };

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getTodos());
        setTimeout(() => setTodosTableLoading(false), 300);
    }, [dispatch]);

    useEffect(() => {
        let todos_list = filterData(filterByStatus(todos), function (todo) {
            return todo.title.match(filterTodosSearch) ? todo : null;
        });
        if (todos_list.length) {
            setTodosPagesCount(Math.ceil(todos_list.length / todosPageSize));
        }
        setFilteredTodos(todos_list);
    }, [filterTodosSearch, filterTodosStatus, todos]);

    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Todos list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all tasks
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button className="flex items-center " color="blue" size="sm" onClick={openNewTodo}>
                                <PlusIcon className="h-5 w-5"/> New Task
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({label, value}) => (
                                    <Tab key={value} value={value} onClick={() => changeStatusFilter(value)}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input label="Search" onInput={(event) => setFilterTodosSearch(event.target.value)} icon={<MagnifyingGlassIcon className="h-5 w-5"/>}/>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-x-auto px-0 pb-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="font-bold leading-none"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {todosTableLoading && <tr>
                            <td className="p-4s">
                                <p className="placeholder-glow mt-0 ml-4">
                                    <span className="placeholder col-10 bg-gray-400 rounded-md" style={{height: '15px', minHeight: '15px'}}></span>
                                    <span className="placeholder col-5 bg-gray-400 rounded-md" style={{height: '15px', minHeight: '15px'}}></span>
                                </p>
                            </td>
                            <td className="p-4">
                                <div className="flex align-items-center">
                                    <p className="placeholder-glow">
                                        <span className="placeholder bg-gray-400 rounded-circle" style={{width: '36px', height: '36px'}}></span>
                                    </p>
                                    <p className="placeholder-glow mt-0 ml-2">
                                        <span className="placeholder d-block bg-gray-400 rounded-md mb-2" style={{width: '90px', height: '10px', minHeight: '10px'}}></span>
                                        <span className="placeholder d-block bg-gray-400 rounded-md" style={{width: '120px', height: '10px', minHeight: '10px'}}></span>
                                    </p>
                                </div>
                            </td>
                            <td className="p-4">
                                <p className="placeholder-glow mt-0">
                                    <span className="placeholder bg-gray-400 rounded-md" style={{width: '92px', height: '24px', minHeight: '24px'}}></span>
                                </p>
                            </td>
                            <td className="p-4"></td>
                        </tr>}
                        {(!filteredTodos.length && !todosTableLoading) && <tr>
                            <td className="p-4 border-b border-blue-gray-50 text-center" colSpan={4}><Alert color="blue-gray" className="p-2"><InformationCircleIcon className="d-inline-block w-6 h-6"></InformationCircleIcon> No todos found.</Alert></td>
                        </tr>}
                        {filteredTodos && filteredTodos.slice((todosCurrentPage * todosPageSize), ((todosCurrentPage + 1) * todosPageSize)).map((todo, index) => {
                            const isLast = index === todos.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="h6" color="blue-gray" className="font-normal max-w-xs flex align-items-center" style={{textDecoration: (todo.completed) ? 'line-through' : 'none'}}>
                                                {todo.completed && <CheckCircleIcon className="h-6 w-6 mr-2"></CheckCircleIcon>}
                                                {todo.title}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={`/images/users/${todo.userId}.jpg`} alt={find_user(todo.userId)?.name} size="sm"/>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {find_user(todo.userId)?.name}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {find_user(todo.userId)?.email}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                variant="ghost"
                                                size="sm"
                                                value={todo.completed ? "Completed" : "Active"}
                                                color={todo.completed ? "green" : "light-blue"}
                                            />
                                        </div>
                                    </td>
                                    <td className={classes} style={{width: '170px'}}>
                                        <div className="float-end">
                                            {!todo.completed && <Tooltip content="Compelete">
                                                <IconButton variant="text" color="green">
                                                    <CheckIcon className="h-6 w-6"/>
                                                </IconButton>
                                            </Tooltip>}
                                            {!todo.completed && <Tooltip content="Edit">
                                                <IconButton variant="text" color="light-blue">
                                                    <PencilIcon className="h-4 w-4"/>
                                                </IconButton>
                                            </Tooltip>}
                                            <Tooltip content="Delete">
                                                <IconButton variant="text" color="red">
                                                    <TrashIcon className="h-4 w-4"/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {todosCurrentPage + 1} of {todosPagesCount}
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" color="blue" size="sm" onClick={todosPagePrev} disabled={todosCurrentPage == 0}>
                            <ChevronLeftIcon className="d-inline-block w-3 h-3 m-0"/> Prev
                        </Button>
                        <Button variant="outlined" color="blue" size="sm" onClick={todosPageNext} disabled={disabledNextPageButton(filteredTodos)}>
                            Next <ChevronRightIcon className="d-inline-block w-3 h-3 m-0"/>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <UserDataModal userData={userDataModal} show={showUserData} setShowUserData={setShowUserData}></UserDataModal>
            <Dialog open={showNewTodo} handler={openNewTodo}>
                <div className="flex items-center justify-between">
                    <DialogHeader>New Todo</DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 pointer-event"
                        onClick={openNewTodo}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody divider>
                    <div className="grid gap-6">
                        <Input label="Todo Title"/>
                        <Switch color="green" label="Is Completed" defaultChecked />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={openNewTodo}>
                        close
                    </Button>
                    <Button variant="gradient" color="green" onClick={openNewTodo}>
                        send message
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
