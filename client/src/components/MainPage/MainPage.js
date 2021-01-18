import React from "react";
import Logo from "../Logo/Logo";
import TodoList from "../ToDo/TodoList/TodoList";
import TopNav from "../TopNav/TopNav";

const MainPage = () => {
    return (
        <>
            <TopNav />
            <Logo />
            <TodoList />
        </>
    );
};

export default MainPage;