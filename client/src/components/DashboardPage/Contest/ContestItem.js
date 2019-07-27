import React, { Fragment, useContext, useEffect } from "react";
import Spinner from "../../Layout/Spinner";
import Placeholder from "./Placeholder";
import PropTypes from 'prop-types';
import ContestContext from "../../../context/contest/ContestContext";


const ContestItem = ({ contest }) => {
  const contestContext = useContext(ContestContext);
  const { deleteContest, setCurrent, clearCurrent } = contestContext;
  const { _id, title, description, type, contestants } = contest;

  console.log(`items returned ${JSON.stringify(contest)}`);

  // const displayEnteries = () => {
  //   return (
  //     <Fragment>
  //       <span>{contestants}</span>
  //     </Fragment>
  //   );
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="card">
          <div className="grid-2">
            <div className="card-content">
              <h5 className="text-left card-title ">
                {contest.title}{" "}{contest._id}
                <span
                  style={{ float: "right", color: "#fff" }}
                  className={
                    "badge " +
                    (type === "buck" ? "badge-success" : "badge-primary")
                  }
                >
                  {type}
                </span>
              </h5>
              <span>{description}</span>

              <ul>
                <strong>Contestants:</strong>
                {/* <h6>{displayEnteries()}</h6> */}
              </ul>
            </div>
            <div className="valign-wrapper">
              <Placeholder image={contest.image} />
            </div>
          </div>
          <hr />
          <div className="center">
            <button
              className="btn center"
              id="editJob"
              onClick={() => setCurrent(contest)}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
ContestItem.propTypes = {
  contest: PropTypes.object.isRequired
};
export default ContestItem;
