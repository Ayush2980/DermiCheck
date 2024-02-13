import { Fragment, useEffect, useState } from "react";
import Default from "./subTabs/Default.component";
import Loader from "./subTabs/Loader.component";
import ShowData from "./subTabs/Data.component";


const TabData = ({info , pr}) => {
    return (
        <Fragment>
            {
                (pr === "Loading" || pr === "default") ? (
                    (pr==="Loading") ? (<Loader/>) : (<Default/>)
                ) : (<ShowData data={{info, pr}}/>)
            }


        </Fragment>
    )
}

export default TabData;