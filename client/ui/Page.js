import React from "react";

const Page = (props) => {
    return (
        <div className="page">
            <h2>{props.title}</h2>
            {props.children}
        </div>
    );
};

export default Page;