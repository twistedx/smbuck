import React, { Fragment, useContext, useEffect } from "react";
import Spinner from "../../Layout/Spinner";
import { Link } from 'react-router-dom';
import Placeholder from "./Placeholder";
import PropTypes from 'prop-types';
import ContestContext from "../../../context/contest/ContestContext";


const ContestItem = ({ contest }) => {
  const contestContext = useContext(ContestContext);
  const { deleteContest, setCurrent, clearCurrent } = contestContext;
  const { _id, title, description, entryFee, contestType, contestants } = contest;

  // console.log(`items returned ${JSON.stringify(contest)}`);

  const displayEnteries = () => {
    return (
      <Fragment>
        <span>{contestants.length}</span>
      </Fragment>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card">
          <div className="grid-2">
            <div className="card-content">
              <h5 className="text-left card-title ">
                {title}{" "}
                <span
                  style={{ float: "right", color: "#fff" }}
                  className={
                    "badge " +
                    (contestType === "buck" ? "badge-success" : "badge-primary")
                  }
                >
                  {contestType}
                </span>
              </h5>
              <p><strong>Contest Description:</strong></p>
              <span>{description}</span>
              <p><strong>Entry Fee:</strong></p>
              <span>{entryFee}</span>
              <ul className="ulTop">
                <strong>Contestants:</strong>
                <h6>{displayEnteries()}</h6>
              </ul>
            </div>
            <div className="valign-wrapper">
              <Placeholder image={contest.image} />
            </div>
          </div>
          <hr />
          <div className="center">
            <Link to={"/ContestDisplay/" + _id} contest={contest}>
              <button
                className="btn center"
                id="editJob"
                onClick={() => setCurrent(contest)}
              >
                SignUp
            </button>
            </Link>
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
