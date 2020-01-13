import React from 'react';

const Loader = (props: any) => (
    <div className="d-flex justify-content-center flex-wrap "
         style={{width: "100%", marginTop: '5rem'}}>
        <strong>{props.children}</strong>
        <div className="spinner-border" role="status">
            <span className="sr-only">{props.children}</span>
        </div>
    </div>);


const LodingButton = (props: any) => (
    <button className="btn btn-primary" type="button" disabled>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"> </span>
        Loading...
    </button>
);

export {Loader,LodingButton};


