import { Fragment, useContext, useEffect, useState } from "react";
import { diseaseContext } from "../../contexts/disease.context";
import TabData from "./Tabs.component";
import Loader from "./subTabs/Loader.component";
import  "./results.styles.css"

const Result = ({ data }) => {
  const [diseases, setDisease] = useState(data);
  useEffect(() => {
    if (diseases === "default" || diseases === "Loading") setDisease(data);
    else {
      const { disease, ...other } = data;
      console.log(other);
      setDisease(data);
    }
  }, [data]);
  return (
    <Fragment>
      <ul
        class="nav nav-tabs"
        id="myTab"
        role="tablist"
        style={{ height: "8%" }}
      >
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            Problem
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            Cures
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact-tab-pane"
            type="button"
            role="tab"
            aria-controls="contact-tab-pane"
            aria-selected="false"
          >
            Prevention
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent" style={{ height: "90%" }}>
        <div
          class="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabindex="0"
          style={{ height: "100%" }}
        >
          <TabData
            info={data.symptoms ? data.symptoms : data}
            pr={data.disease ? data.disease : data}
          />
        </div>
        <div
          class="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabindex="0"
          style={{ height: "100%" }}
        >
          <TabData
            info={data.cures ? data.cures : data}
            pr={data.disease ? data.disease : data}
          />
        </div>
        <div
          class="tab-pane fade"
          id="contact-tab-pane"
          role="tabpanel"
          aria-labelledby="contact-tab"
          tabindex="0"
          style={{ height: "100%" }}
        >
          <TabData
            info={data.prevention ? data.prevention : data}
            pr={data.disease ? data.disease : data}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Result;
